import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DropshipProduct, ViewMode, Currency } from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AddEditProductModal } from './components/AddEditProductModal';
import { ReelsFeed } from './components/ReelsFeed';
import { LinkInBioView } from './components/LinkInBioView';
import { ProfitCalculator } from './components/ProfitCalculator';
import { Plus, Video, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'dropwave_products_v1';
const CURRENCY_KEY = 'dropwave_currency_v1';
const LANG_KEY = 'dropwave_lang_v1';

export default function App() {
  // Load products from localStorage or use initial set
  const [products, setProducts] = useState<DropshipProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore parse errors
    }
    return INITIAL_PRODUCTS;
  });

  const [currentView, setCurrentView] = useState<ViewMode>('catalog');
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem(CURRENCY_KEY) as Currency) || 'USD';
  });
  const [isRtl, setIsRtl] = useState<boolean>(() => {
    const saved = localStorage.getItem(LANG_KEY);
    return saved !== null ? saved === 'ar' : true;
  });

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'margin' | 'price-asc' | 'price-desc' | 'orders'>('margin');
  const [onlyWithVideo, setOnlyWithVideo] = useState<boolean>(false);

  // Modals
  const [activeVideoProduct, setActiveVideoProduct] = useState<DropshipProduct | null>(null);
  const [activeDetailProduct, setActiveDetailProduct] = useState<DropshipProduct | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<DropshipProduct | null>(null);

  const catalogSectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, isRtl ? 'ar' : 'en');
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'ar' : 'en';
  }, [isRtl]);

  const handleToggleLanguage = () => {
    setIsRtl(!isRtl);
  };

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (onlyWithVideo && !p.videoUrl) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchTitleEn = p.titleEn?.toLowerCase().includes(q) || false;
          const matchHook = p.adHook?.toLowerCase().includes(q) || false;
          const matchCat = p.category.toLowerCase().includes(q);
          return matchTitle || matchTitleEn || matchHook || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'margin') {
          const marginA = ((a.price - a.costPrice) / a.price) * 100;
          const marginB = ((b.price - b.costPrice) / b.price) * 100;
          return marginB - marginA;
        }
        if (sortBy === 'orders') {
          return b.ordersCount - a.ordersCount;
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [products, selectedCategory, onlyWithVideo, searchQuery, sortBy]);

  // Product Actions
  const handleSaveProduct = (savedProduct: DropshipProduct) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === savedProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      }
      return [savedProduct, ...prev];
    });
    setProductToEdit(null);
  };

  const handleOpenEdit = (product: DropshipProduct) => {
    setProductToEdit(product);
    setIsAddModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    const confirmText = isRtl
      ? 'هل أنت متأكد من حذف هذا المنتج وروابطه؟'
      : 'Are you sure you want to delete this product?';
    if (window.confirm(confirmText)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleResetSampleData = () => {
    const confirmText = isRtl
      ? 'هل تريد استعادة المنتجات الافتراضية الأربعة الأصلية؟'
      : 'Reset to original sample products?';
    if (window.confirm(confirmText)) {
      setProducts(INITIAL_PRODUCTS);
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'dropwave-products-catalog.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json) && json.length > 0) {
          setProducts(json);
        }
      } catch (err) {
        console.error('Error importing JSON', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col text-zinc-900">
      {/* Hidden file input for catalog import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header (Top Bar Contract: 3 Zones, whitespace-nowrap) */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenAddModal={() => {
          setProductToEdit(null);
          setIsAddModalOpen(true);
        }}
        currency={currency}
        onCurrencyChange={setCurrency}
        isRtl={isRtl}
        onToggleLanguage={handleToggleLanguage}
        productsCount={products.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'catalog' && (
          <div>
            {/* Storefront Hero Section */}
            <HeroSection
              isRtl={isRtl}
              onOpenAddModal={() => {
                setProductToEdit(null);
                setIsAddModalOpen(true);
              }}
              onExploreCatalog={() => {
                catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenReels={() => setCurrentView('reels')}
            />

            {/* Featured Catalog Area */}
            <div ref={catalogSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Category & Search Filter Bar */}
              <FilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onlyWithVideo={onlyWithVideo}
                onToggleOnlyWithVideo={() => setOnlyWithVideo(!onlyWithVideo)}
                isRtl={isRtl}
                onExport={handleExport}
                onImport={handleImport}
                onResetSampleData={handleResetSampleData}
              />

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currency={currency}
                      isRtl={isRtl}
                      onOpenVideo={(prod) => setActiveVideoProduct(prod)}
                      onOpenDetail={(prod) => setActiveDetailProduct(prod)}
                      onEdit={handleOpenEdit}
                      onDelete={handleDeleteProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">
                  <div className="w-12 h-12 mx-auto mb-3 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mb-1">
                    {isRtl ? 'لا توجد منتجات مطابقة لخيارات البحث' : 'No matching products found'}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4 max-w-sm mx-auto">
                    {isRtl
                      ? 'جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً، أو أضف منتجك الأول الآن'
                      : 'Try adjusting your search filters or add a new product with links'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setOnlyWithVideo(false);
                    }}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    {isRtl ? 'إعادة ضبط الفلاتر' : 'Clear Filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'reels' && (
          <div className="py-6">
            <ReelsFeed
              products={products}
              currency={currency}
              isRtl={isRtl}
              onOpenDetail={(prod) => setActiveDetailProduct(prod)}
            />
          </div>
        )}

        {currentView === 'bio' && (
          <LinkInBioView
            products={products}
            currency={currency}
            isRtl={isRtl}
            onOpenVideo={(prod) => setActiveVideoProduct(prod)}
            onOpenDetail={(prod) => setActiveDetailProduct(prod)}
          />
        )}

        {currentView === 'calculator' && (
          <ProfitCalculator
            products={products}
            currency={currency}
            isRtl={isRtl}
          />
        )}
      </main>

      {/* Modals */}
      <VideoPlayerModal
        product={activeVideoProduct}
        currency={currency}
        isRtl={isRtl}
        onClose={() => setActiveVideoProduct(null)}
      />

      <ProductDetailModal
        product={activeDetailProduct}
        currency={currency}
        isRtl={isRtl}
        onClose={() => setActiveDetailProduct(null)}
        onOpenVideo={(prod) => {
          setActiveDetailProduct(null);
          setActiveVideoProduct(prod);
        }}
      />

      <AddEditProductModal
        isOpen={isAddModalOpen}
        productToEdit={productToEdit}
        currency={currency}
        isRtl={isRtl}
        onClose={() => {
          setIsAddModalOpen(false);
          setProductToEdit(null);
        }}
        onSave={handleSaveProduct}
      />

      {/* Clean Footer (Compliant with Anti-Slop: No fake telemetry or status tickers) */}
      <footer className="border-t border-zinc-200 bg-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900">DropWave</span>
            <span>·</span>
            <span>{isRtl ? 'منصة عرض وتسويق منتجات وفيديوهات الدروب شيبينج' : 'Winning Dropship Showcase'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('catalog')}
              className="hover:text-zinc-900 transition-colors"
            >
              {isRtl ? 'الكتالوج' : 'Catalog'}
            </button>
            <button
              onClick={() => setCurrentView('reels')}
              className="hover:text-zinc-900 transition-colors"
            >
              {isRtl ? 'الريلز' : 'Reels'}
            </button>
            <button
              onClick={() => setCurrentView('bio')}
              className="hover:text-zinc-900 transition-colors"
            >
              {isRtl ? 'لينك إن بايو' : 'Bio Link'}
            </button>
            <button
              onClick={() => setCurrentView('calculator')}
              className="hover:text-zinc-900 transition-colors"
            >
              {isRtl ? 'حاسبة الأرباح' : 'Calculator'}
            </button>
          </div>

          <span className="text-zinc-400">
            {isRtl ? 'جميع الحقوق محفوظة © 2026' : '© 2026 DropWave'}
          </span>
        </div>
      </footer>
    </div>
  );
}
