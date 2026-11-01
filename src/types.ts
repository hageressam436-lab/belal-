export interface DropshipProduct {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  category: 'tech' | 'home' | 'beauty' | 'fitness' | 'kitchen';
  price: number; // Selling price (سعر البيع للزبون)
  costPrice: number; // Supplier cost (سعر الشراء من المورد)
  shippingCost?: number; // Shipping cost (تكلفة الشحن)
  rating: number;
  ordersCount: number;
  viralViews?: string;
  
  // Media
  imageUrl: string;
  videoUrl?: string; // MP4 or streaming video
  
  // Dropshipping Links
  storeUrl: string; // Store purchase link (Shopify / Salla / Zid / Amazon / etc)
  supplierUrl?: string; // Supplier link (AliExpress, CJ Dropshipping, 1688)
  videoPostUrl?: string; // TikTok / Instagram Reel post link
  
  // Marketing & Ad Hooks
  adHook?: string;
  bulletPoints: string[];
  
  isTrending?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export type ViewMode = 'catalog' | 'reels' | 'bio' | 'calculator';
export type Currency = 'USD' | 'SAR' | 'AED' | 'EGP' | 'EUR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD (1)
  nameAr: string;
  nameEn: string;
}
