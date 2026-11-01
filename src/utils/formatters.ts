import { Currency } from '../types';
import { CURRENCIES } from '../data/initialProducts';

export function formatPrice(amountInUSD: number, currency: Currency): string {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = amountInUSD * config.rate;
  
  // Format with tabular numerals and proper decimal digits
  const formattedNumber = converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formattedNumber} ${config.symbol}`;
}

export function calculateProfit(priceUSD: number, costUSD: number, shippingUSD: number = 0) {
  const netProfit = priceUSD - (costUSD + shippingUSD);
  const marginPercent = priceUSD > 0 ? (netProfit / priceUSD) * 100 : 0;
  const markupPercent = (costUSD + shippingUSD) > 0 ? (netProfit / (costUSD + shippingUSD)) * 100 : 0;

  return {
    netProfit,
    marginPercent: Math.round(marginPercent * 10) / 10,
    markupPercent: Math.round(markupPercent * 10) / 10,
  };
}
