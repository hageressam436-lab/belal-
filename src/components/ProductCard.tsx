import React, { useState } from 'react';
import { DropshipProduct, Currency } from '../types';
import { formatPrice, calculateProfit } from '../utils/formatters';
import { Play, ExternalLink, Package, ShoppingBag, Copy, Check, Edit2, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: DropshipProduct;
  currency: Currency;
  isRtl: boolean;
  onOpenVideo: (product: DropshipProduct) => void;
  onOpenDetail: (product: DropshipProduct) => void;
  onEdit: (product: DropshipProduct) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isRtl,
  onOpenVideo,
  onOpenDetail,
  onEdit,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { netProfit, marginPercent } = calculateProfit(
    product.price,
    product.costPrice,
    product.shippingCost || 0
  );

  const categoryNames: Record<string, { ar: string; en: string }> = {
    tech: { ar: 'أجهزة وإلكترونيات', en: 'Tech & Gadgets' },
    kitchen: { ar: 'المطبخ والمنزل', en: 'Kitchen & Living' },
    beauty: { ar: 'العناية والجمال', en: 'Beauty & Skincare' },
    home: { ar: 'ديكور وإضاءة', en: 'Home & Decor' },
    fitness: { ar: 'رياضة ولياقة', en: 'Sports & Fitness' },
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(product.storeUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-zinc-200/90 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Product Media Area (4:3 ratio) */}
      <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden cursor-pointer" onClick={() => onOpenDetail(product)}>
        <img
          src={product.imageUrl}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Elegant CSS fallback container on image error
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add('flex', 'items-center', 'justify-center', 'bg-zinc-100');
              parent.innerHTML = `
                <div class="text-center p-6">
                  <div class="w-12 h-12 mx-auto mb-2 text-zinc-400">🛍️</div>
                  <span class="text-xs text-zinc-500 font-medium">${product.title}</span>
                </div>
              `;
            }
          }}
        />

        {/* Video badge affordance */}
        {product.videoUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenVideo(product);
            }}
            className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1.5 bg-black/75 hover:bg-black/90 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm shadow-md transition-transform hover:scale-105"
            title={isRtl ? 'مشاهدة الفيديو الإعلاني' : 'Watch video ad reel'}
          >
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>{isRtl ? 'فيديو الإعلان' : 'Watch Reel'}</span>
          </button>
        )}

        {/* Trending text label */}
        {product.isTrending && (
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 bg-amber-500/90 text-white text-[11px] font-bold rounded-md shadow-sm">
            {isRtl ? 'منتج رائج 🔥' : 'Trending Winner 🔥'}
          </div>
        )}

        {/* Quick action buttons overlay */}
        <div className={`absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenVideo(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-zinc-900 rounded-lg text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
            <span>{isRtl ? 'تشغيل الفيديو' : 'Play Video'}</span>
          </button>
          
          <button
            onClick={handleCopyLink}
            className="p-2 bg-white/95 hover:bg-white text-zinc-700 hover:text-zinc-900 rounded-lg shadow-md transition-colors"
            title={isRtl ? 'نسخ رابط المنتج' : 'Copy link'}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separators (ZERO PILLS) */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2 font-medium">
            <span>{categoryNames[product.category]?.[isRtl ? 'ar' : 'en'] || product.category}</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="font-mono tabular-nums text-zinc-700">{product.rating}</span>
            </span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="font-mono tabular-nums">{product.ordersCount.toLocaleString()} {isRtl ? 'طلب' : 'orders'}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="text-base font-semibold text-zinc-900 hover:text-indigo-600 cursor-pointer line-clamp-2 transition-colors mb-2 leading-snug"
          >
            {isRtl ? product.title : (product.titleEn || product.title)}
          </h3>

          {/* Ad Hook / Selling Line */}
          {product.adHook && (
            <p className="text-xs text-zinc-600 line-clamp-2 mb-3 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
              <span className="font-semibold text-zinc-800">{isRtl ? 'الخطاف الإعلاني: ' : 'Ad Hook: '}</span>
              {product.adHook}
            </p>
          )}
        </div>

        <div>
          {/* Price & Dropshipping Margins Strip */}
          <div className="pt-3 border-t border-zinc-100 mb-4">
            <div className="flex items-baseline justify-between mb-1.5">
              <div>
                <span className="text-xs text-zinc-500 block">{isRtl ? 'سعر البيع للزبون' : 'Retail Price'}</span>
                <span className="text-lg font-bold text-zinc-900 font-mono tabular-nums">
                  {formatPrice(product.price, currency)}
                </span>
              </div>
              
              <div className="text-right rtl:text-left">
                <span className="text-xs text-zinc-500 block">{isRtl ? 'هامش الربح التقديري' : 'Estimated Net Profit'}</span>
                <span className="text-sm font-semibold text-emerald-600 font-mono tabular-nums">
                  +{formatPrice(netProfit, currency)} ({marginPercent}%)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono tabular-nums">
              <span>{isRtl ? 'تكلفة المورد:' : 'Supplier cost:'} {formatPrice(product.costPrice, currency)}</span>
              <span>{isRtl ? 'الشحن:' : 'Shipping:'} {formatPrice(product.shippingCost || 0, currency)}</span>
            </div>
          </div>

          {/* Direct Action Links */}
          <div className="grid grid-cols-2 gap-2">
            {/* Store / Purchase Link */}
            <a
              href={product.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="truncate">{isRtl ? 'رابط الشراء' : 'Buy Now'}</span>
              <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
            </a>

            {/* Supplier / Sourcing Link */}
            {product.supplierUrl ? (
              <a
                href={product.supplierUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                title={isRtl ? 'رابط المورد (AliExpress / CJ Dropshipping)' : 'Supplier Sourcing Link'}
              >
                <Package className="w-3.5 h-3.5 text-zinc-600" />
                <span className="truncate">{isRtl ? 'رابط المورد' : 'Supplier'}</span>
                <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
              </a>
            ) : (
              <button
                onClick={() => onOpenDetail(product)}
                className="py-2 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{isRtl ? 'التفاصيل' : 'Details'}</span>
              </button>
            )}
          </div>

          {/* Card footer actions: Edit and Delete */}
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
            <span className="text-[11px] font-mono">{product.viralViews || (isRtl ? 'منتج مميز' : 'Featured')}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onEdit(product)}
                className="hover:text-zinc-800 flex items-center gap-1 transition-colors"
                title={isRtl ? 'تعديل المنتج والروابط' : 'Edit product & links'}
              >
                <Edit2 className="w-3 h-3" />
                <span>{isRtl ? 'تعديل' : 'Edit'}</span>
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="hover:text-rose-600 flex items-center gap-1 transition-colors"
                title={isRtl ? 'حذف المنتج' : 'Delete product'}
              >
                <Trash2 className="w-3 h-3" />
                <span>{isRtl ? 'حذف' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
