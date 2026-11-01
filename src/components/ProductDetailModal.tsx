import React, { useState } from 'react';
import { DropshipProduct, Currency } from '../types';
import { formatPrice, calculateProfit } from '../utils/formatters';
import { X, Play, ShoppingBag, Package, ExternalLink, Copy, Check, Sparkles, TrendingUp, Star, ShieldCheck, Truck } from 'lucide-react';

interface ProductDetailModalProps {
  product: DropshipProduct | null;
  currency: Currency;
  isRtl: boolean;
  onClose: () => void;
  onOpenVideo: (product: DropshipProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  isRtl,
  onClose,
  onOpenVideo,
}) => {
  if (!product) return null;

  const [copied, setCopied] = useState(false);
  const { netProfit, marginPercent, markupPercent } = calculateProfit(
    product.price,
    product.costPrice,
    product.shippingCost || 0
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(product.storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 p-2.5 bg-black/50 hover:bg-black/75 text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media Column */}
          <div className="relative aspect-[4/3] md:aspect-auto bg-zinc-100 flex items-center justify-center overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.videoUrl && (
              <button
                onClick={() => onOpenVideo(product)}
                className="absolute inset-0 m-auto w-16 h-16 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm transition-transform hover:scale-110"
                title={isRtl ? 'تشغيل الفيديو الإعلاني' : 'Play video ad'}
              >
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              </button>
            )}
            {product.isTrending && (
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm">
                {isRtl ? 'منتج رائج على تيك توك 🔥' : 'Viral TikTok Winner 🔥'}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              {/* Category, Rating, Orders */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2 font-medium">
                <span className="capitalize">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-mono tabular-nums text-zinc-700">{product.rating}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{product.ordersCount.toLocaleString()} {isRtl ? 'طلب ناجح' : 'orders'}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-zinc-900 mb-2 leading-snug">
                {isRtl ? product.title : (product.titleEn || product.title)}
              </h2>

              {/* Description */}
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Ad Hook */}
              {product.adHook && (
                <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl mb-4 text-xs">
                  <div className="flex items-center gap-1 font-bold text-amber-800 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'الخطاف الإعلاني للتسويق (Hook):' : 'Marketing Ad Hook:'}</span>
                  </div>
                  <p className="text-zinc-700">{product.adHook}</p>
                </div>
              )}

              {/* Profit Analysis Box */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 mb-5">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs text-zinc-500">{isRtl ? 'سعر البيع المقترح:' : 'Retail Price:'}</span>
                  <span className="text-xl font-bold text-zinc-900 font-mono tabular-nums">
                    {formatPrice(product.price, currency)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-zinc-500 mb-1">
                  <span>{isRtl ? 'تكلفة المورد + الشحن:' : 'Supplier Cost + Shipping:'}</span>
                  <span className="font-mono tabular-nums">
                    {formatPrice((product.costPrice || 0) + (product.shippingCost || 0), currency)}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {isRtl ? 'صافي هامش الربح:' : 'Net Profit Margin:'}
                  </span>
                  <span className="text-base font-bold text-emerald-600 font-mono tabular-nums">
                    +{formatPrice(netProfit, currency)} ({marginPercent}%)
                  </span>
                </div>
              </div>

              {/* Features List */}
              {product.bulletPoints && product.bulletPoints.length > 0 && (
                <div className="mb-6 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    {isRtl ? 'المواصفات والمميزات:' : 'Key Specifications:'}
                  </h4>
                  {product.bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs and Links */}
            <div className="space-y-2 pt-4 border-t border-zinc-100">
              <a
                href={product.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isRtl ? 'فتح رابط الشراء / المتجر' : 'Go to Store / Buy Page'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {product.supplierUrl && (
                <a
                  href={product.supplierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Package className="w-4 h-4 text-zinc-600" />
                  <span>{isRtl ? 'رابط المورد (AliExpress / CJ Dropshipping)' : 'Supplier Sourcing Link'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={handleCopy}
                className="w-full py-2 text-xs text-zinc-500 hover:text-zinc-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isRtl ? 'تم نسخ الرابط!' : 'Link copied!') : (isRtl ? 'نسخ رابط الشراء للمشاركة' : 'Copy store link')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
