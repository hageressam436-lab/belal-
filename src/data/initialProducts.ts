import { DropshipProduct, CurrencyConfig } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1, nameAr: 'دولار أمريكي', nameEn: 'US Dollar' },
  SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75, nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal' },
  AED: { code: 'AED', symbol: 'د.إ', rate: 3.67, nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham' },
  EGP: { code: 'EGP', symbol: 'ج.م', rate: 49.0, nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, nameAr: 'يورو', nameEn: 'Euro' },
};

export const INITIAL_PRODUCTS: DropshipProduct[] = [
  {
    id: 'prod-1',
    title: 'خلاط فواكه محمول ذكي مع شاحن لاسلكي',
    titleEn: 'Smart Portable Blender with Wireless Charger',
    description: 'خلاط عصير فواكه شخصي قوي ومقاوم للماء بقدرة 50 واط، سعة 400 مل، شفرات ستانلس ستيل مضادة للصدأ وتصميم عصري يرافقك في النادي والمكتب والسفر.',
    category: 'kitchen',
    price: 39.99,
    costPrice: 11.50,
    shippingCost: 3.20,
    rating: 4.9,
    ordersCount: 2480,
    viralViews: '5.8M TikTok Views',
    imageUrl: '/src/assets/images/product_portable_blender_1793494087298.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    storeUrl: 'https://shopify.com',
    supplierUrl: 'https://aliexpress.com',
    videoPostUrl: 'https://tiktok.com',
    adHook: 'وداعاً للعصائر الجاهزة! اصنع سموذي طازج في 30 ثانية في أي مكان بدون أسلاك.',
    bulletPoints: [
      'شحن مغناطيسي سريع يدوم حتى 15 استخدام للشحنة الواحدة',
      'مقاوم للماء بالكامل وسهل التنظيف تلقائياً بضغطة زر',
      'قفل أمان ذكي يمنع التشغيل عند فتح الغطاء',
      'وزن خفيف 450 جرام مع مقبض سيليكون مريح'
    ],
    isTrending: true,
    isFeatured: true,
    createdAt: '2026-10-20'
  },
  {
    id: 'prod-2',
    title: 'مصباح الغروب الذكي بتأثير الهالة الضوئية',
    titleEn: 'Minimalist Sunset Projection Ambient Lamp',
    description: 'مصباح إضاءة سينمائية محيطية دوار 360 درجة، يضفي أجواء رومانسية وهدوء على غرفتك واستوديو تصوير المحتوى والتيك توك بألوان الغروب الدافئة.',
    category: 'home',
    price: 29.99,
    costPrice: 7.20,
    shippingCost: 2.80,
    rating: 4.8,
    ordersCount: 4120,
    viralViews: '12.4M Reels Views',
    imageUrl: '/src/assets/images/product_sunset_lamp_1793494088283.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    storeUrl: 'https://salla.sa',
    supplierUrl: 'https://cjdropshipping.com',
    videoPostUrl: 'https://instagram.com',
    adHook: 'حوّل غرفتك إلى استوديو تصوير سينمائي فخم بضغطة زر واحدة!',
    bulletPoints: [
      'عدسة كريستال HD عالية النقاء مع توزيع ضوئي فائق النعومة',
      'رأس المصباح يدور 360 درجة لضبط زاوية الضوء بدقة',
      'هيكل من الألومنيوم غير اللامع بقاعدة متوازنة ومستقرة',
      'مزود بكابل USB بطول 1.5 متر مع مفتاح تحكم سهل'
    ],
    isTrending: true,
    isFeatured: true,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod-3',
    title: 'جهاز تقشير وتنظيف البشرة بالموجات فوق الصوتية',
    titleEn: 'Ultrasonic Skin Scrubber & Deep Cleanser',
    description: 'ملعقة تنظيف الوجه الاحترافية بتقنية الاهتزاز الصوتي 24000Hz لإزالة الرؤوس السوداء وتنظيف المسام وشد الوجه مع أيونات سالبة وموجبة.',
    category: 'beauty',
    price: 49.99,
    costPrice: 12.80,
    shippingCost: 3.50,
    rating: 4.9,
    ordersCount: 1890,
    viralViews: '8.1M Views',
    imageUrl: '/src/assets/images/product_ultrasonic_scrubber_1793494089502.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    storeUrl: 'https://shopify.com',
    supplierUrl: 'https://aliexpress.com',
    videoPostUrl: 'https://tiktok.com',
    adHook: 'تنظيف عميق للمسام وإزالة الرؤوس السوداء بدون ألم ومن أول استخدام في منزلك!',
    bulletPoints: [
      '3 أوضاع ذكية: تقشير بالموجات، امتصاص التغذية، شد البشرة EMS',
      'شفرة من الفولاذ الطبي الآمن 100% على كافة أنواع البشرة',
      'بطارية ليثيوم مدمجة تدوم 90 دقيقة مع شحن Type-C',
      'نتائج ملموسة فورية تغنيك عن جلسات العيادات المكلفة'
    ],
    isTrending: false,
    isFeatured: true,
    createdAt: '2026-10-25'
  },
  {
    id: 'prod-4',
    title: 'باور بانك مغناطيسي MagSafe بحلقة ستاند مدمجة',
    titleEn: 'Magnetic MagSafe Power Bank with Ring Kickstand',
    description: 'شاحن لاسلكي فائق النحافة بقوة 10000mAh يلتصق بقوة على ظهر الهاتف مع حلقة تثبيت مريحة وحامل مشاهدة للفيديوهات والمكالمات في نفس الوقت.',
    category: 'tech',
    price: 44.99,
    costPrice: 14.50,
    shippingCost: 3.80,
    rating: 4.7,
    ordersCount: 3260,
    viralViews: '3.9M Views',
    imageUrl: '/src/assets/images/product_magsafe_powerbank_1793494088657.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    storeUrl: 'https://zid.sa',
    supplierUrl: 'https://cjdropshipping.com',
    videoPostUrl: 'https://tiktok.com',
    adHook: 'اشحن هاتفك بدون كابلات واستمتع بستاند متعدد الزوايا بتصميم تيتانيوم أنيق!',
    bulletPoints: [
      'مغناطيس نيووديميوم قوي N52 لا يسقط مهما تحرك الهاتف',
      'شحن لاسلكي سريع بقوة 15 واط + منفذ PD بقوة 20 واط',
      'حلقة سبائك الزنك تعمل كمسكة أصابع وستاند أفقي ورأسي',
      'حماية ذكية مدمجة ضد ارتفاع الحرارة والتيار الزائد'
    ],
    isTrending: true,
    isFeatured: false,
    createdAt: '2026-10-27'
  }
];

export const CATEGORIES = [
  { id: 'all', nameAr: 'جميع المنتجات', nameEn: 'All Products' },
  { id: 'tech', nameAr: 'أجهزة وإلكترونيات', nameEn: 'Tech & Gadgets' },
  { id: 'kitchen', nameAr: 'المطبخ والمنزل الذكي', nameEn: 'Kitchen & Living' },
  { id: 'beauty', nameAr: 'العناية والجمال', nameEn: 'Beauty & Skincare' },
  { id: 'home', nameAr: 'ديكور وإضاءة', nameEn: 'Home & Decor' },
  { id: 'fitness', nameAr: 'رياضة ولياقة', nameEn: 'Sports & Fitness' },
];
