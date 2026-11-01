import React from 'react';
import { ViewMode, Currency } from '../types';
import { CURRENCIES } from '../data/initialProducts';
import { Plus, Video, LayoutGrid, Smartphone, Calculator, Globe } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onOpenAddModal: () => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  isRtl: boolean;
  onToggleLanguage: () => void;
  productsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenAddModal,
  currency,
  onCurrencyChange,
  isRtl,
  onToggleLanguage,
  productsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark / Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onViewChange('catalog')}
              className="text-left rtl:text-right group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-lg tracking-tight group-hover:bg-indigo-600 transition-colors">
                DW
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-zinc-900 block leading-none">
                  DropWave
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {isRtl ? 'منصة منتجات الدروب شيبينج' : 'Winning Dropship Catalog'}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onViewChange('catalog')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'catalog'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{isRtl ? 'الكتالوج والمعرض' : 'Product Catalog'}</span>
              <span className="text-xs text-zinc-400 font-normal">({productsCount})</span>
            </button>

            <button
              onClick={() => onViewChange('reels')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'reels'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Video className="w-4 h-4 text-rose-500" />
              <span>{isRtl ? 'ريلز وفيديوهات الإعلانات' : 'Reels & Video Feed'}</span>
            </button>

            <button
              onClick={() => onViewChange('bio')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'bio'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{isRtl ? 'صفحة لينك إن بايو' : 'Link in Bio View'}</span>
            </button>

            <button
              onClick={() => onViewChange('calculator')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'calculator'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{isRtl ? 'حاسبة الأرباح وROAS' : 'Profit Calculator'}</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Utility dropdowns */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Currency selector */}
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              aria-label="Currency"
              className="text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border-none rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-zinc-900 cursor-pointer transition-colors"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>

            {/* Language toggle */}
            <button
              onClick={onToggleLanguage}
              aria-label="Language Toggle"
              className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{isRtl ? 'EN' : 'عربي'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-sm transition-all hover:shadow whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isRtl ? 'إضافة منتج جديد' : 'Add Product'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar for small screens */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-zinc-100 text-xs">
          <button
            onClick={() => onViewChange('catalog')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded ${
              currentView === 'catalog' ? 'text-zinc-900 font-bold' : 'text-zinc-500'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{isRtl ? 'المنتجات' : 'Catalog'}</span>
          </button>
          <button
            onClick={() => onViewChange('reels')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded ${
              currentView === 'reels' ? 'text-rose-600 font-bold' : 'text-zinc-500'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{isRtl ? 'الريلز' : 'Reels'}</span>
          </button>
          <button
            onClick={() => onViewChange('bio')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded ${
              currentView === 'bio' ? 'text-zinc-900 font-bold' : 'text-zinc-500'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{isRtl ? 'لينك إن بايو' : 'Bio Link'}</span>
          </button>
          <button
            onClick={() => onViewChange('calculator')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded ${
              currentView === 'calculator' ? 'text-zinc-900 font-bold' : 'text-zinc-500'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{isRtl ? 'الأرباح' : 'Calculator'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
