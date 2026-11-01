import React, { useState, useRef, useEffect } from 'react';
import { DropshipProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown, ShoppingBag, Package, ExternalLink, Copy, Check, Heart, Share2 } from 'lucide-react';

interface ReelsFeedProps {
  products: DropshipProduct[];
  currency: Currency;
  isRtl: boolean;
  onOpenDetail: (product: DropshipProduct) => void;
}

export const ReelsFeed: React.FC<ReelsFeedProps> = ({
  products,
  currency,
  isRtl,
  onOpenDetail,
}) => {
  const videoProducts = products.filter((p) => p.videoUrl);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentProduct = videoProducts[currentIndex] || products[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Auto-play was prevented, continue with muted or paused
        });
      }
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < videoProducts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(videoProducts.length - 1);
    }
  };

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

  const handleLike = () => {
    if (!currentProduct) return;
    const id = currentProduct.id;
    const currentLikes = likes[id] || 1240;
    const isCurrentlyLiked = hasLiked[id];

    setLikes({ ...likes, [id]: isCurrentlyLiked ? currentLikes - 1 : currentLikes + 1 });
    setHasLiked({ ...hasLiked, [id]: !isCurrentlyLiked });
  };

  const handleShare = () => {
    if (!currentProduct) return;
    navigator.clipboard.writeText(currentProduct.storeUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentProduct) {
    return (
      <div className="py-20 text-center text-zinc-500">
        <p>{isRtl ? 'لا توجد فيديوهات مضافة بعد. أضف منتجك الأول مع رابط فيديو!' : 'No videos available yet. Add your first product with a video!'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-4 px-2 sm:px-0">
      <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
        {/* Video Player */}
        <video
          ref={videoRef}
          src={currentProduct.videoUrl}
          poster={currentProduct.imageUrl}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
        />

        {/* Top Floating Controls */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-20">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>{currentIndex + 1} / {videoProducts.length}</span>
            <span aria-hidden="true">·</span>
            <span>{currentProduct.viralViews || 'TikTok Winner'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Side Social Engagement Column */}
        <div className="absolute right-4 bottom-32 rtl:right-auto rtl:left-4 z-20 flex flex-col items-center gap-4 text-white">
          <button
            onClick={handleLike}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Like"
          >
            <div className={`p-3 rounded-full backdrop-blur-md transition-all ${hasLiked[currentProduct.id] ? 'bg-rose-500 text-white' : 'bg-black/50 hover:bg-black/70'}`}>
              <Heart className={`w-5 h-5 ${hasLiked[currentProduct.id] ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[11px] font-mono mt-1 text-white/90">
              {((likes[currentProduct.id] || 1240) / 1000).toFixed(1)}k
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Share"
          >
            <div className="p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-md transition-colors">
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </div>
            <span className="text-[11px] mt-1 text-white/90">
              {copied ? (isRtl ? 'تم!' : 'Done') : (isRtl ? 'مشاركة' : 'Share')}
            </span>
          </button>

          <button
            onClick={() => onOpenDetail(currentProduct)}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Details"
          >
            <div className="p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-md transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-1 text-white/90">{isRtl ? 'تفاصيل' : 'Specs'}</span>
          </button>
        </div>

        {/* Next / Previous Reel Buttons */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-4 z-20 flex flex-col gap-2">
          <button
            onClick={handlePrev}
            className="p-2 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-colors"
            title={isRtl ? 'الفيديو السابق' : 'Previous video'}
            aria-label="Previous Reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-colors"
            title={isRtl ? 'الفيديو التالي' : 'Next video'}
            aria-label="Next Reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Pinned Product Buy Card */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 z-20 text-white">
          <div className="p-3 bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-zinc-700/60 shadow-lg">
            <div className="flex items-center gap-3 mb-2.5">
              <img
                src={currentProduct.imageUrl}
                alt={currentProduct.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-zinc-700"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold truncate text-white">
                  {isRtl ? currentProduct.title : (currentProduct.titleEn || currentProduct.title)}
                </h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                    {formatPrice(currentProduct.price, currency)}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    ★ {currentProduct.rating} ({currentProduct.ordersCount} {isRtl ? 'طلب' : 'orders'})
                  </span>
                </div>
              </div>
            </div>

            {/* Hook Text */}
            {currentProduct.adHook && (
              <p className="text-[11px] text-zinc-300 line-clamp-1 mb-2.5">
                {currentProduct.adHook}
              </p>
            )}

            {/* Direct Buy Button */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={currentProduct.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isRtl ? 'اشترِ الآن' : 'Buy Now'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {currentProduct.supplierUrl ? (
                <a
                  href={currentProduct.supplierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'رابط المورد' : 'Supplier'}</span>
                </a>
              ) : (
                <button
                  onClick={() => onOpenDetail(currentProduct)}
                  className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{isRtl ? 'التفاصيل' : 'Details'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
