import React, { useState } from 'react';
import { DropshipProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { Calculator, TrendingUp, DollarSign, Target, Award, ArrowRight } from 'lucide-react';

interface ProfitCalculatorProps {
  products: DropshipProduct[];
  currency: Currency;
  isRtl: boolean;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  products,
  currency,
  isRtl,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [sellingPrice, setSellingPrice] = useState<number>(products[0]?.price || 39.99);
  const [productCost, setProductCost] = useState<number>(products[0]?.costPrice || 11.50);
  const [shippingCost, setShippingCost] = useState<number>(products[0]?.shippingCost || 3.20);
  const [adSpendPerOrder, setAdSpendPerOrder] = useState<number>(10.00); // Target CPA
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(300);

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    const p = products.find((prod) => prod.id === id);
    if (p) {
      setSellingPrice(p.price);
      setProductCost(p.costPrice);
      setShippingCost(p.shippingCost || 0);
    }
  };

  // Calculations
  const paymentFee = (sellingPrice * (paymentFeePercent / 100)) + 0.30;
  const totalCostPerOrder = productCost + shippingCost + adSpendPerOrder + paymentFee;
  const netProfitPerOrder = sellingPrice - totalCostPerOrder;
  const netMarginPercent = sellingPrice > 0 ? (netProfitPerOrder / sellingPrice) * 100 : 0;
  
  // Break-even CPA: how much you can spend on ads to make $0 profit
  const breakEvenCPA = Math.max(0, sellingPrice - (productCost + shippingCost + paymentFee));
  // Break-even ROAS: Selling Price / Break-even CPA
  const breakEvenROAS = breakEvenCPA > 0 ? (sellingPrice / breakEvenCPA) : 0;
  // Actual ROAS if spending adSpendPerOrder: Selling Price / adSpendPerOrder
  const actualROAS = adSpendPerOrder > 0 ? (sellingPrice / adSpendPerOrder) : 0;

  // Monthly projections
  const monthlyRevenue = sellingPrice * monthlyOrders;
  const monthlyAdSpend = adSpendPerOrder * monthlyOrders;
  const monthlyNetProfit = netProfitPerOrder * monthlyOrders;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          {isRtl ? 'حاسبة أرباح وإعلانات الدروب شيبينج (ROAS & Margin)' : 'Dropshipping Profit & ROAS Calculator'}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600">
          {isRtl
            ? 'احسب صافي الربح الفعلي بعد خصم تكلفة المنتج، الشحن، إعلانات تيك توك وفيسبوك (CPA)، وعمولات بوابات الدفع.'
            : 'Calculate real net margins after accounting for COGS, shipping, TikTok/Meta ad spend (CPA), and payment fees.'}
        </p>
      </div>

      {/* Preset Product Selector */}
      {products.length > 0 && (
        <div className="mb-6 p-4 bg-white border border-zinc-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>{isRtl ? 'تحميل بيانات منتج من الكتالوج:' : 'Quick-load from product catalog:'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectProduct(p.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedProductId === p.id
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {isRtl ? p.title.slice(0, 24) : (p.titleEn || p.title).slice(0, 24)}...
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Panel */}
        <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider pb-2 border-b border-zinc-100">
            {isRtl ? 'بيانات التكلفة والتسعير ($)' : 'Cost & Pricing Inputs ($)'}
          </h3>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              {isRtl ? 'سعر بيع المنتج للزبون ($)' : 'Retail Selling Price ($)'}
            </label>
            <input
              type="number"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2 text-sm font-mono bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'تكلفة المورد ($)' : 'Supplier Cost ($)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={productCost}
                onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'تكلفة الشحن ($)' : 'Shipping ($)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={shippingCost}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-zinc-700">
                {isRtl ? 'تكلفة الإعلان لكل طلب ناجح (Target CPA)' : 'Target Ad Spend per Order (CPA) ($)'}
              </label>
              <span className="text-[11px] text-zinc-400 font-mono">${adSpendPerOrder}</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(50, sellingPrice)}
              step="0.5"
              value={adSpendPerOrder}
              onChange={(e) => setAdSpendPerOrder(parseFloat(e.target.value) || 0)}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'عمولة بوابة الدفع (%)' : 'Payment Fee (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={paymentFeePercent}
                onChange={(e) => setPaymentFeePercent(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono bg-zinc-50 border border-zinc-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {isRtl ? 'الطلبات المتوقعة شهرياً' : 'Monthly Orders'}
              </label>
              <input
                type="number"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono bg-zinc-50 border border-zinc-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Results & Projections Panel */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
              <span className="text-xs text-zinc-500 block mb-1">
                {isRtl ? 'صافي الربح للطلب الواحد' : 'Net Profit per Order'}
              </span>
              <div className={`text-xl font-bold font-mono tabular-nums ${netProfitPerOrder >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {netProfitPerOrder >= 0 ? '+' : ''}{formatPrice(netProfitPerOrder, currency)}
              </div>
              <span className="text-[11px] text-zinc-400 font-medium mt-1 block">
                {isRtl ? 'هامش ربح' : 'Margin'}: {netMarginPercent.toFixed(1)}%
              </span>
            </div>

            <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
              <span className="text-xs text-zinc-500 block mb-1">
                {isRtl ? 'أقصى تكلفة إعلانية (Break-even CPA)' : 'Break-even CPA'}
              </span>
              <div className="text-xl font-bold text-zinc-900 font-mono tabular-nums">
                {formatPrice(breakEvenCPA, currency)}
              </div>
              <span className="text-[11px] text-zinc-400 font-medium mt-1 block">
                {isRtl ? 'أعلى تكلفة إعلان دون خسارة' : 'Max allowable ad cost'}
              </span>
            </div>

            <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
              <span className="text-xs text-zinc-500 block mb-1">
                {isRtl ? 'العائد الإعلاني الفعلي (ROAS)' : 'Current ROAS'}
              </span>
              <div className="text-xl font-bold text-indigo-600 font-mono tabular-nums">
                {actualROAS.toFixed(2)}x
              </div>
              <span className="text-[11px] text-zinc-400 font-medium mt-1 block">
                {isRtl ? 'نقطة التعادل' : 'Break-even'}: {breakEvenROAS.toFixed(2)}x
              </span>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              {isRtl ? 'تفصيل تكاليف وأرباح الطلب الواحد' : 'Cost Breakdown per Single Order'}
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-600">
                <span>{isRtl ? 'سعر البيع الإجمالي (Revenue)' : 'Total Selling Revenue'}:</span>
                <span className="font-mono font-semibold text-zinc-900">{formatPrice(sellingPrice, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500">
                <span>{isRtl ? '- تكلفة المنتج من المورد' : '- Supplier Product Cost'}:</span>
                <span className="font-mono text-zinc-700">-{formatPrice(productCost, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500">
                <span>{isRtl ? '- مصاريف الشحن والتوصيل' : '- Shipping & Delivery'}:</span>
                <span className="font-mono text-zinc-700">-{formatPrice(shippingCost, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500">
                <span>{isRtl ? '- تكلفة الإعلانات المستهدفة (Ad Spend)' : '- Ad Spend (CPA)'}:</span>
                <span className="font-mono text-zinc-700">-{formatPrice(adSpendPerOrder, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500">
                <span>{isRtl ? '- رسوم بوابة الدفع والمنصة' : '- Payment & Platform Fees'}:</span>
                <span className="font-mono text-zinc-700">-{formatPrice(paymentFee, currency)}</span>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-sm font-bold">
                <span className="text-zinc-900">{isRtl ? '= صافي الربح الفعلي في جيبك' : '= Real Net Profit in Your Pocket'}:</span>
                <span className={`font-mono ${netProfitPerOrder >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {formatPrice(netProfitPerOrder, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Projection Table */}
          <div className="p-5 bg-zinc-900 text-white rounded-2xl shadow-lg">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{isRtl ? `توقعات الأرباح الشهرية عند (${monthlyOrders} طلب):` : `Monthly Projections (${monthlyOrders} orders):`}</span>
            </h4>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <div>
                <span className="text-[11px] text-zinc-400 block">{isRtl ? 'المبيعات الإجمالية' : 'Total Revenue'}</span>
                <span className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">
                  {formatPrice(monthlyRevenue, currency)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 block">{isRtl ? 'ميزانية الإعلانات' : 'Total Ad Spend'}</span>
                <span className="text-base sm:text-lg font-bold font-mono tabular-nums text-zinc-300">
                  {formatPrice(monthlyAdSpend, currency)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-emerald-400 block">{isRtl ? 'صافي أرباحك الشهرية' : 'Monthly Net Profit'}</span>
                <span className="text-base sm:text-lg font-bold font-mono tabular-nums text-emerald-400">
                  +{formatPrice(monthlyNetProfit, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
