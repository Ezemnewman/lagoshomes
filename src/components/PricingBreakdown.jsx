/**
 * Shows purchase price + any extra fees (agency, legal, etc.) and a
 * computed total. Takes `fees` as an array rather than hardcoding
 * "Agency Fee" and "Legal Fee" — a rent listing might have an agency
 * fee but no legal fee, a sale might have both, a land plot might add
 * a survey fee. The page decides whether to render this section at
 * all (property.showPricingBreakdown), so listings that don't need
 * it just skip it entirely rather than showing a breakdown with ₦0 fees.
 */
export default function PricingBreakdown({ basePrice, basePriceLabel = "Purchase Price", fees = [] }) {
  const total = basePrice + fees.reduce((sum, fee) => sum + fee.amount, 0);

  const formatNaira = (amount) => `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="bg-surface-container rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center text-on-surface-variant font-body-md">
        <span>{basePriceLabel}</span>
        <span className="font-bold text-on-surface">{formatNaira(basePrice)}</span>
      </div>

      {fees.map((fee) => (
        <div key={fee.label} className="flex justify-between items-center text-on-surface-variant font-body-md">
          <span>{fee.label}</span>
          <span className="font-bold text-on-surface">{formatNaira(fee.amount)}</span>
        </div>
      ))}

      <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
        <span className="font-headline-sm text-on-surface">Total Price</span>
        <span className="font-display-lg text-primary text-[28px]">{formatNaira(total)}</span>
      </div>
    </div>
  );
}
