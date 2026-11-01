import React from 'react';
import { CATEGORIES } from '../data/initialProducts';
import { Search, SlidersHorizontal, Video, Download, Upload, RefreshCw } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'margin' | 'price-asc' | 'price-desc' | 'orders';
  onSortChange: (sort: 'margin' | 'price-asc' | 'price-desc' | 'orders') => void;
  onlyWithVideo: boolean;
  onToggleOnlyWithVideo: () => void;
  isRtl: boolean;
  onExport: () => void;
  onImport: () => void;
  onResetSampleData: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onlyWithVideo,
  onToggleOnlyWithVideo,
  isRtl,
  onExport,
  onImport,
  onResetSampleData,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Search and Secondary Filter Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={isRtl ? 'ابحث عن منتج، تصنيف، أو فكرة إعلان...' : 'Search products, ad hooks, categories...'}
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 font-semibold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort & Quick Video Filter */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Only with Video Toggle */}
          <button
            onClick={onToggleOnlyWithVideo}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              onlyWithVideo
                ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm'
                : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
            }`}
            title={isRtl ? 'عرض المنتجات التي بها فيديو فقط' : 'Filter products with video'}
          >
            <Video className="w-3.5 h-3.5 text-rose-500" />
            <span className="whitespace-nowrap">{isRtl ? 'بها فيديو 🎬' : 'Has Video 🎬'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-xl px-2.5 py-2 text-xs font-medium text-zinc-700 shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent border-none text-xs font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="margin">{isRtl ? 'الأعلى ربحاً (Margin %)' : 'Highest Margin'}</option>
              <option value="orders">{isRtl ? 'الأكثر طلباً ورواجاً' : 'Most Popular'}</option>
              <option value="price-asc">{isRtl ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{isRtl ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>

          {/* Export / Reset Dropdown Actions */}
          <button
            onClick={onExport}
            className="p-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-600 hover:text-zinc-900 transition-colors shadow-sm"
            title={isRtl ? 'تصدير الكتالوج والروابط كملف JSON' : 'Export catalog to JSON'}
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onResetSampleData}
            className="p-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-600 hover:text-zinc-900 transition-colors shadow-sm"
            title={isRtl ? 'استعادة النماذج الأصلية' : 'Reset sample products'}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Tabs (Segmented Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              {isRtl ? cat.nameAr : cat.nameEn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
