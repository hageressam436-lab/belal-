import React, { useState } from 'react';
import { DropshipProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { Play, ShoppingBag, ExternalLink, Copy, Check, Share2, Smartphone, Monitor, Star } from 'lucide-react';

interface LinkInBioViewProps {
  products: DropshipProduct[];
  currency: Currency;
  isRtl: boolean;
  onOpenVideo: (product: DropshipProduct) => void;
  onOpenDetail: (product: DropshipProduct) => void;
}

export const LinkInBioView: React.FC<LinkInBioViewProps> = ({
  products,
  currency,
  isRtl,
  onOpenVideo,
  onOpenDetail,
}) => {
  const [deviceMode, setDeviceMode] = useState<'phone' | 'full'>('phone');
  const [copied, setCopied] = useState(false);

  const handleShareBio = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bioContent = (
    <div className="w-full max-w-md mx-auto bg-white min-h-[680px] p-6 flex flex-col justify-between text-zinc-900">
      <div>
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 p-0.5 shadow-lg mb-3">
            <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-white font-black text-2xl tracking-tighter">
              DW
            </div>
          </div>
          <h2 className="text-lg font-bold text-zinc-900">DropWave Trends</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            {isRtl ? 'أفضل وأقوى منتجات الدروب شيبينج والتريندات الحصرية ⚡' : 'Curated Viral Winning Products & Exclusive Deals ⚡'}
          </p>

          {/* Clean Trust Proof Text */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 mt-2 font-medium">
            <span>{isRtl ? 'شحن مجاني' : 'Free Shipping'}</span>
            <span aria-hidden="true">·</span>
            <span>{isRtl ? 'دفع عند الاستلام' : 'Cash on Delivery'}</span>
            <span aria-hidden="true">·</span>
            <span>{isRtl ? 'ضمان استرجاع 14 يوم' : '14-Day Guarantee'}</span>
          </div>
        </div>

        {/* Product Cards Stack (Optimized for quick thumb taps) */}
        <div className="space-y-3.5">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-zinc-50 hover:bg-white border border-zinc-200/80 rounded-2xl p-3 hover:shadow-md transition-all flex items-center gap-3.5"
            >
              {/* Product Thumbnail with Video play icon */}
              <div
                className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-200 shrink-0 cursor-pointer"
                onClick={() => onOpenVideo(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                {product.videoUrl && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-white text-white" />
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0" onClick={() => onOpenDetail(product)}>
                <h4 className="text-xs font-bold text-zinc-900 truncate group-hover:text-indigo-600 transition-colors cursor-pointer">
                  {isRtl ? product.title : (product.titleEn || product.title)}
                </h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-sm font-bold text-zinc-900 font-mono tabular-nums">
                    {formatPrice(product.price, currency)}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    ★ {product.rating}
                  </span>
                </div>
                {product.adHook && (
                  <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                    {product.adHook}
                  </p>
                )}
              </div>

              {/* Quick Buy CTA */}
              <a
                href={product.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shrink-0 transition-transform active:scale-95 shadow-sm"
                title={isRtl ? 'شراء المنتج' : 'Buy Now'}
              >
                <ShoppingBag className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Bio Footer */}
      <div className="mt-8 pt-4 border-t border-zinc-100 text-center">
        <button
          onClick={handleShareBio}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? (isRtl ? 'تم نسخ رابط البايو!' : 'Bio URL Copied!') : (isRtl ? 'مشاركة رابط البايو' : 'Share Bio Link')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Top Controls Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
        <div>
          <h3 className="text-base font-bold text-zinc-900">
            {isRtl ? 'معاينة متجر لينك إن بايو (Link-in-Bio)' : 'Link-in-Bio Storefront Preview'}
          </h3>
          <p className="text-xs text-zinc-500">
            {isRtl
              ? 'هذا هو الشكل الذي يراه زوار تيك توك وإنستغرام عند النقر على رابط البايو الخاص بك'
              : 'This is the exact view mobile visitors see when clicking your TikTok/Instagram profile bio link'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Device Toggle */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-xl">
            <button
              onClick={() => setDeviceMode('phone')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                deviceMode === 'phone' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isRtl ? 'موبايل' : 'Phone'}</span>
            </button>
            <button
              onClick={() => setDeviceMode('full')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                deviceMode === 'full' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{isRtl ? 'شاشة كاملة' : 'Full'}</span>
            </button>
          </div>

          <button
            onClick={handleShareBio}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الرابط' : 'Copy Link')}</span>
          </button>
        </div>
      </div>

      {/* Render based on view mode */}
      {deviceMode === 'phone' ? (
        <div className="flex justify-center py-4">
          {/* Realistic iPhone mockup frame */}
          <div className="w-[380px] bg-zinc-900 rounded-[48px] p-3 shadow-2xl border-4 border-zinc-800">
            {/* Phone Notch */}
            <div className="w-32 h-4 bg-zinc-900 mx-auto rounded-b-2xl mb-2 flex items-center justify-center">
              <div className="w-12 h-1 bg-zinc-700 rounded-full"></div>
            </div>
            {/* Screen Content */}
            <div className="rounded-[36px] overflow-hidden border border-zinc-200">
              {bioContent}
            </div>
            {/* Phone Home Bar */}
            <div className="w-28 h-1 bg-zinc-600 mx-auto rounded-full mt-3 mb-1"></div>
          </div>
        </div>
      ) : (
        <div className="border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
          {bioContent}
        </div>
      )}
    </div>
  );
};
