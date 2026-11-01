import React, { useState, useEffect } from 'react';
import { DropshipProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Sparkles, Link as LinkIcon, DollarSign, Video, Image as ImageIcon, Check } from 'lucide-react';

interface AddEditProductModalProps {
  isOpen: boolean;
  productToEdit: DropshipProduct | null;
  currency: Currency;
  isRtl: boolean;
  onClose: () => void;
  onSave: (product: DropshipProduct) => void;
}

const PRESET_IMAGES = [
  { label: 'خلاط محمول', labelEn: 'Portable Blender', url: '/src/assets/images/product_portable_blender_1793494087298.jpg' },
  { label: 'مصباح الغروب', labelEn: 'Sunset Lamp', url: '/src/assets/images/product_sunset_lamp_1793494088283.jpg' },
  { label: 'جهاز تنظيف البشرة', labelEn: 'Skin Scrubber', url: '/src/assets/images/product_ultrasonic_scrubber_1793494089502.jpg' },
  { label: 'باور بانك ماج سيف', labelEn: 'MagSafe PowerBank', url: '/src/assets/images/product_magsafe_powerbank_1793494088657.jpg' },
];

export const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  isOpen,
  productToEdit,
  currency,
  isRtl,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'tech' | 'kitchen' | 'beauty' | 'home' | 'fitness'>('tech');
  const [price, setPrice] = useState('39.99');
  const [costPrice, setCostPrice] = useState('12.00');
  const [shippingCost, setShippingCost] = useState('3.00');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/product_portable_blender_1793494087298.jpg');
  const [videoUrl, setVideoUrl] = useState('');
  const [storeUrl, setStoreUrl] = useState('https://myshopify.com/products/sample');
  const [supplierUrl, setSupplierUrl] = useState('https://aliexpress.com/item/sample');
  const [videoPostUrl, setVideoPostUrl] = useState('');
  const [adHook, setAdHook] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [isTrending, setIsTrending] = useState(true);

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setTitleEn(productToEdit.titleEn || '');
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price.toString());
      setCostPrice(productToEdit.costPrice.toString());
      setShippingCost((productToEdit.shippingCost || 0).toString());
      setImageUrl(productToEdit.imageUrl);
      setVideoUrl(productToEdit.videoUrl || '');
      setStoreUrl(productToEdit.storeUrl);
      setSupplierUrl(productToEdit.supplierUrl || '');
      setVideoPostUrl(productToEdit.videoPostUrl || '');
      setAdHook(productToEdit.adHook || '');
      setBulletPoints(productToEdit.bulletPoints.join('\n'));
      setIsTrending(!!productToEdit.isTrending);
    } else {
      // Default clean values
      setTitle('');
      setTitleEn('');
      setDescription('');
      setCategory('tech');
      setPrice('39.99');
      setCostPrice('11.50');
      setShippingCost('3.00');
      setImageUrl(PRESET_IMAGES[0].url);
      setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      setStoreUrl('https://myshopify.com');
      setSupplierUrl('https://aliexpress.com');
      setVideoPostUrl('');
      setAdHook('');
      setBulletPoints('شحن سريع وضمان استبدال\nتصميم فاخر وخفيف الوزن\nأعلى تقييم على تيك توك');
      setIsTrending(true);
    }
  }, [productToEdit]);

  const pNum = parseFloat(price) || 0;
  const cNum = parseFloat(costPrice) || 0;
  const sNum = parseFloat(shippingCost) || 0;
  const netProfit = pNum - (cNum + sNum);
  const marginPct = pNum > 0 ? Math.round((netProfit / pNum) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !storeUrl.trim()) return;

    const bullets = bulletPoints
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const newProduct: DropshipProduct = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      title: title.trim(),
      titleEn: titleEn.trim() || title.trim(),
      description: description.trim() || title.trim(),
      category,
      price: pNum,
      costPrice: cNum,
      shippingCost: sNum,
      rating: productToEdit ? productToEdit.rating : 4.9,
      ordersCount: productToEdit ? productToEdit.ordersCount : Math.floor(Math.random() * 2000) + 500,
      viralViews: productToEdit?.viralViews || `${(Math.random() * 8 + 1).toFixed(1)}M Views`,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      videoUrl: videoUrl.trim() || undefined,
      storeUrl: storeUrl.trim(),
      supplierUrl: supplierUrl.trim() || undefined,
      videoPostUrl: videoPostUrl.trim() || undefined,
      adHook: adHook.trim() || undefined,
      bulletPoints: bullets.length > 0 ? bullets : ['جودة عالية وضمان', 'شحن سريع ومجاني'],
      isTrending,
      isFeatured: true,
      createdAt: productToEdit ? productToEdit.createdAt : new Date().toISOString().split('T')[0],
    };

    onSave(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              {productToEdit
                ? (isRtl ? 'تعديل بيانات المنتج واللينكات' : 'Edit Product & Links')
                : (isRtl ? 'إضافة منتج دروب شيبينج جديد' : 'Add New Dropshipping Product')}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isRtl
                ? 'أدخل روابط الشراء، رابط المورد، وفيديو المنتج الإعلاني'
                : 'Configure direct store links, supplier source, and video ad reel'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Title in Arabic and English */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'اسم المنتج (بالعربية) *' : 'Product Title (Arabic/Primary) *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isRtl ? 'مثال: خلاط فواكه محمول ذكي' : 'e.g. Smart Portable Blender'}
                className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'اسم المنتج (بالإنجليزية)' : 'Product Title (English)'}
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Portable Electric Juicer Blender"
                className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Category & Trending */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'تصنيف المنتج' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all"
              >
                <option value="tech">{isRtl ? 'أجهزة وإلكترونيات' : 'Tech & Gadgets'}</option>
                <option value="kitchen">{isRtl ? 'المطبخ والمنزل' : 'Kitchen & Living'}</option>
                <option value="beauty">{isRtl ? 'العناية والجمال' : 'Beauty & Skincare'}</option>
                <option value="home">{isRtl ? 'ديكور وإضاءة' : 'Home & Decor'}</option>
                <option value="fitness">{isRtl ? 'رياضة ولياقة' : 'Sports & Fitness'}</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-zinc-300 focus:ring-indigo-500"
                />
                <span className="text-xs font-semibold text-zinc-800">
                  {isRtl ? 'منتج رائج (Trending Winner 🔥)' : 'Mark as Trending Winner 🔥'}
                </span>
              </label>
            </div>
          </div>

          {/* Pricing, Cost & Profit Margin Calculator */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                {isRtl ? 'التسعير وحساب هامش الربح التلقائي ($)' : 'Pricing & Margin Calculator ($)'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  {isRtl ? 'سعر البيع للزبون ($) *' : 'Retail Price ($) *'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-sm px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  {isRtl ? 'سعر المورد ($)' : 'Supplier Cost ($)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="w-full text-sm px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  {isRtl ? 'تكلفة الشحن ($)' : 'Shipping Cost ($)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  className="w-full text-sm px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 font-mono"
                />
              </div>
            </div>

            {/* Margin Result Banner */}
            <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs">
              <span className="font-medium text-emerald-800">
                {isRtl ? 'صافي الربح المتوقع لكل طلب:' : 'Projected Net Profit per order:'}
              </span>
              <span className="font-bold text-emerald-700 font-mono tabular-nums text-sm">
                +${netProfit.toFixed(2)} ({marginPct}%)
              </span>
            </div>
          </div>

          {/* Links Section (Key Feature) */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 uppercase tracking-wider">
              <LinkIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isRtl ? 'روابط الدروب شيبينج المهمة' : 'Dropshipping Product Links'}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'رابط الشراء المباشر (متجرك شوبيفاي / سلة / زد) *' : 'Direct Store / Buy Link *'}
              </label>
              <input
                type="url"
                required
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                placeholder="https://yourstore.com/products/item"
                className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all font-mono text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {isRtl ? 'رابط المورد (AliExpress / CJ / 1688)' : 'Supplier Sourcing Link'}
                </label>
                <input
                  type="url"
                  value={supplierUrl}
                  onChange={(e) => setSupplierUrl(e.target.value)}
                  placeholder="https://aliexpress.com/item/..."
                  className="w-full text-sm px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {isRtl ? 'رابط منشور إعلان تيك توك / ريلز' : 'TikTok / Reel Post Link'}
                </label>
                <input
                  type="url"
                  value={videoPostUrl}
                  onChange={(e) => setVideoPostUrl(e.target.value)}
                  placeholder="https://tiktok.com/@creator/video/..."
                  className="w-full text-sm px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Video URL */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 mb-1">
              <Video className="w-3.5 h-3.5 text-rose-500" />
              <span>{isRtl ? 'رابط تشغيل الفيديو (MP4 أو فيديو مباشر)' : 'Video Stream / MP4 URL'}</span>
            </div>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://.../video.mp4"
              className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all font-mono text-xs"
            />
            <p className="text-[11px] text-zinc-400 mt-1">
              {isRtl ? 'يمكنك وضع رابط MP4 مباشر لتشغيله في المشغل وقسم الريلز' : 'Paste any direct MP4 link for smooth playback in reels & video modal'}
            </p>
          </div>

          {/* Product Image Selection & Presets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isRtl ? 'صورة المنتج' : 'Product Image'}</span>
              </div>
              <span className="text-[11px] text-zinc-400">
                {isRtl ? 'اختر من النماذج أو الصق رابط' : 'Pick preset or paste URL'}
              </span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {PRESET_IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl === img.url ? 'border-zinc-900 shadow-md scale-95' : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  {imageUrl === img.url && (
                    <div className="absolute top-1 right-1 bg-zinc-900 text-white rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://.../image.jpg"
              className="w-full text-xs px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-zinc-900 font-mono"
            />
          </div>

          {/* Ad Hook / Marketing Copy */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isRtl ? 'الخطاف الإعلاني المقترح للتسويق (Ad Hook)' : 'Viral Marketing Ad Hook'}</span>
            </div>
            <input
              type="text"
              value={adHook}
              onChange={(e) => setAdHook(e.target.value)}
              placeholder={isRtl ? 'مثال: اصنع عصيرك الطازج أينما كنت بضغطة زر واحدة!' : 'e.g. Blend your fresh smoothie in 30s anywhere wireless!'}
              className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all"
            />
          </div>

          {/* Key Features / Bullet points */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              {isRtl ? 'أبرز مميزات المنتج (سطر لكل ميزة)' : 'Key Features (1 per line)'}
            </label>
            <textarea
              rows={3}
              value={bulletPoints}
              onChange={(e) => setBulletPoints(e.target.value)}
              placeholder={isRtl ? 'شحن سريع Type-C\nمقاوم للماء\nشفرات فولاذية قوية' : 'Fast Type-C charging\nWaterproof\nStainless steel blades'}
              className="w-full text-xs px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl shadow-md transition-all hover:shadow"
            >
              {productToEdit
                ? (isRtl ? 'حفظ التعديلات' : 'Save Changes')
                : (isRtl ? 'إضافة المنتج إلى الكتالوج' : 'Add to Catalog')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
