import React, { useState, useRef } from 'react';
import { DropshipProduct, Currency } from '../types';
import { formatPrice, calculateProfit } from '../utils/formatters';
import { X, Play, Pause, Volume2, VolumeX, ShoppingBag, Package, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';

interface VideoPlayerModalProps {
  product: DropshipProduct | null;
  currency: Currency;
  isRtl: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  product,
  currency,
  isRtl,
  onClose,
}) => {
  if (!product) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);

  const { netProfit, marginPercent } = calculateProfit(
    product.price,
    product.costPrice,
    product.shippingCost || 0
  );

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(product.storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[320px] lg:min-h-[500px]">
          {product.videoUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={product.videoUrl}
                poster={product.imageUrl}
                autoPlay
                playsInline
                loop
                className="max-h-[70vh] w-full object-contain cursor-pointer"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Video Player Controls Overlay */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-4 px-4 py-2.5 bg-black/60 backdrop-blur-md rounded-2xl text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-indigo-400 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-indigo-400 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="text-xs font-mono text-zinc-300">
                  {product.viralViews || 'TikTok Winning Reel'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-zinc-400">
              <p>{isRtl ? 'لا يوجد فيديو محدد لهذا المنتج' : 'No video available'}</p>
            </div>
          )}
        </div>

        {/* Product Details & Links Side Panel */}
        <div className="w-full lg:w-96 bg-zinc-900 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[90vh] text-white">
          <div>
            {/* Category and Metrics */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-medium">
              <span className="capitalize">{product.category}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-amber-400 font-mono tabular-nums">★ {product.rating}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="font-mono tabular-nums">{product.ordersCount.toLocaleString()} {isRtl ? 'طلب' : 'orders'}</span>
            </div>

            {/* Product Title */}
            <h2 className="text-xl font-bold text-white mb-2 leading-snug">
              {isRtl ? product.title : (product.titleEn || product.title)}
            </h2>

            {/* Ad Hook / Selling Pitch */}
            {product.adHook && (
              <div className="mb-4 p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/60 text-xs text-zinc-200">
                <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'الخطاف الإعلاني المقترح للتسويق:' : 'Ad Hook:'}</span>
                </div>
                <p className="leading-relaxed">{product.adHook}</p>
              </div>
            )}

            {/* Pricing and Profit Breakdown */}
            <div className="p-3.5 bg-zinc-800/50 rounded-xl border border-zinc-700/40 mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-zinc-400">{isRtl ? 'سعر البيع المقترح:' : 'Selling Price:'}</span>
                <span className="text-lg font-bold text-white font-mono tabular-nums">
                  {formatPrice(product.price, currency)}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-zinc-300 mb-1">
                <span className="text-zinc-400">{isRtl ? 'تكلفة المورد + الشحن:' : 'Product Cost + Shipping:'}</span>
                <span className="font-mono tabular-nums text-zinc-300">
                  {formatPrice((product.costPrice || 0) + (product.shippingCost || 0), currency)}
                </span>
              </div>
              <div className="pt-2 border-t border-zinc-700 flex items-baseline justify-between">
                <span className="text-xs font-semibold text-emerald-400">{isRtl ? 'صافي الربح التقديري:' : 'Net Profit:'}</span>
                <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                  +{formatPrice(netProfit, currency)} ({marginPercent}%)
                </span>
              </div>
            </div>

            {/* Product Bullet Points / Features */}
            {product.bulletPoints && product.bulletPoints.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  {isRtl ? 'أبرز مميزات المنتج:' : 'Key Features:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {product.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-indigo-400 shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Links and CTA Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-zinc-800">
            {/* Primary Buy / Store Link */}
            <a
              href={product.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/30"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isRtl ? 'شراء المنتج من المتجر' : 'Buy Now / Store Link'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Supplier Link */}
            {product.supplierUrl && (
              <a
                href={product.supplierUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Package className="w-4 h-4 text-zinc-400" />
                <span>{isRtl ? 'فتح رابط المورد (AliExpress / CJ)' : 'Supplier Sourcing Link'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Social Post / Reel Link */}
            {product.videoPostUrl && (
              <a
                href={product.videoPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span>{isRtl ? 'مشاهدة إعلان تيك توك الأصلي' : 'Original TikTok / Reel Post'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="w-full py-2 px-4 text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isRtl ? 'تم نسخ الرابط بنجاح!' : 'Link Copied!') : (isRtl ? 'نسخ رابط الشراء' : 'Copy Store Link')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
