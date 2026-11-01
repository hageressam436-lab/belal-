import React from 'react';
import { Sparkles, Plus, Play, ArrowDown, CheckCircle2, Video } from 'lucide-react';

interface HeroSectionProps {
  isRtl: boolean;
  onOpenAddModal: () => void;
  onExploreCatalog: () => void;
  onOpenReels: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isRtl,
  onOpenAddModal,
  onExploreCatalog,
  onOpenReels,
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-zinc-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
      {/* Subtle backdrop ambient glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -z-10 w-96 h-96 bg-amber-50/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Subtle natural kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50/80 px-3.5 py-1.5 rounded-full mb-4 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {isRtl ? 'تصميم عصري متكامل لمنتجات وفيديوهات الدروب شيبينج' : 'All-in-One Dropshipping Video & Product Showcase'}
            </span>
          </div>

          {/* Balanced Display Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight sm:leading-tight mb-4 [text-wrap:balance]">
            {isRtl
              ? 'اعرض منتجاتك الرابحة وفيديوهات الإعلانات بروابط شراء مباشرة'
              : 'Showcase Winning Dropship Products & Video Ads with Direct Buy Links'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-600 mb-8 leading-relaxed [text-wrap:balance]">
            {isRtl
              ? 'منصة احترافية تجمع فيديوهات ريلز وتيك توك، روابط الموردين (AliExpress / CJ)، حساب هوامش الربح التلقائي، وصفحة لينك إن بايو مخصصة لمتجرك.'
              : 'Professional showcase uniting TikTok video ads, supplier sourcing links, automated profit margins, and a high-converting link-in-bio mobile storefront.'}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold rounded-xl shadow-md transition-all hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{isRtl ? 'إضافة منتج مع روابط وفيديو' : 'Add Product with Links & Video'}</span>
            </button>

            <button
              onClick={onOpenReels}
              className="px-6 py-3 bg-white hover:bg-zinc-50 text-zinc-900 text-sm font-bold rounded-xl border border-zinc-200 shadow-sm transition-all hover:border-zinc-300 flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-rose-500" />
              <span>{isRtl ? 'مشاهدة خلاصة الريلز والفيديوهات' : 'Watch Video Reels Feed'}</span>
            </button>
          </div>

          {/* Proof Strip (Zero Pills, Clean Typographic Separators) */}
          <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isRtl ? 'حساب هامش الربح والـ ROAS لحظياً' : 'Live Net Profit & ROAS calculation'}</span>
            </div>
            <span aria-hidden="true" className="text-zinc-300 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isRtl ? 'دعم روابط شوبيفاي، سلة، زد وعلي إكسبريس' : 'Direct Shopify, Salla & AliExpress links'}</span>
            </div>
            <span aria-hidden="true" className="text-zinc-300 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isRtl ? 'مشغل فيديو تفاعلي لزيادة التحويل' : 'Interactive video player for high conversion'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
