import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import Icon from "../components/Icon";

/**
 * Renders inside AgentDashboardLayout's <Outlet> at
 * /agent-dashboard/subscription/confirmation.
 * Navigated to from SubscriptionPage after a successful payment.
 * Reads plan details from router state; falls back to sensible
 * defaults if someone lands here directly.
 *
 * The PDF receipt uses the same pdf-lib approach as the Terms PDF —
 * generated client-side from the payment details, no server needed.
 */
export default function SubscriptionConfirmationPage() {
  const location = useLocation();
  const {
    planName = "Professional Plan",
    billingCycle = "Monthly",
    amount = 30000,
    cardLast4 = "3456",
  } = location.state || {};

  const today = new Date();
  const nextBilling = new Date(today);
  nextBilling.setMonth(nextBilling.getMonth() + (billingCycle === "yearly" ? 12 : 1));

  const invoiceNumber = `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 900 + 100)}`;

  const formatDate = (d) =>
    d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  const [downloading, setDownloading] = useState(false);

  const handleDownloadReceipt = async () => {
    setDownloading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const page = pdfDoc.addPage([595, 842]);
      const green = rgb(0, 0.318, 0.22);
      const grey = rgb(0.4, 0.4, 0.4);
      const black = rgb(0.1, 0.1, 0.1);
      const lightGrey = rgb(0.95, 0.95, 0.95);

      // Header background
      page.drawRectangle({ x: 0, y: 720, width: 595, height: 122, color: green });
      page.drawText("KCEE Real Estate Marketplace", { x: 50, y: 800, size: 20, font: boldFont, color: rgb(1,1,1) });
      page.drawText("Payment Receipt", { x: 50, y: 770, size: 13, font, color: rgb(0.8, 1, 0.9) });
      page.drawText(invoiceNumber, { x: 50, y: 745, size: 10, font, color: rgb(0.7, 0.9, 0.8) });

      // Body
      const row = (label, value, y, bold = false) => {
        page.drawText(label, { x: 50, y, size: 11, font, color: grey });
        page.drawText(value, { x: 350, y, size: 11, font: bold ? boldFont : font, color: bold ? green : black });
      };

      page.drawText("Invoice Details", { x: 50, y: 690, size: 14, font: boldFont, color: green });
      page.drawLine({ start: { x: 50, y: 678 }, end: { x: 545, y: 678 }, thickness: 1, color: lightGrey });

      row("Invoice Number", invoiceNumber, 655);
      row("Date", formatDate(today), 630);
      row("Plan", planName, 605);
      row("Billing Cycle", billingCycle, 580);
      row("Payment Method", `Visa ending in ${cardLast4}`, 555);

      page.drawLine({ start: { x: 50, y: 540 }, end: { x: 545, y: 540 }, thickness: 1, color: lightGrey });
      row("Amount Paid", `NGN ${amount.toLocaleString()}`, 518, true);

      page.drawText("Next Billing Date", { x: 50, y: 480, size: 11, font, color: grey });
      page.drawText(formatDate(nextBilling), { x: 350, y: 480, size: 11, font, color: black });

      // Footer
      page.drawRectangle({ x: 0, y: 0, width: 595, height: 60, color: lightGrey });
      page.drawText("Thank you for your subscription to KCEE Real Estate Marketplace.", { x: 50, y: 35, size: 9, font, color: grey });
      page.drawText("For support: support@kcee.com", { x: 50, y: 18, size: 9, font, color: grey });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `KCEE-Receipt-${invoiceNumber}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Receipt PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="flex-1 md:ml-64 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="check_circle" className="text-primary text-[48px]" filled />
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
            Payment Successful!
          </h1>
          <p className="text-on-surface-variant font-body-md">
            Your <strong>{planName}</strong> is now active.
          </p>
        </div>

        {/* Receipt card */}
        <div className="bg-white rounded-xl property-shadow overflow-hidden mb-6">
          <div className="bg-primary/5 border-b border-outline-variant/30 px-6 py-4">
            <p className="font-label-md text-on-surface-variant text-xs uppercase tracking-wider">Receipt</p>
            <p className="font-bold text-primary">{invoiceNumber}</p>
          </div>

          <div className="px-6 py-5 space-y-3">
            {[
              { label: "Date", value: formatDate(today) },
              { label: "Plan", value: planName },
              { label: "Billing Cycle", value: billingCycle },
              { label: "Payment Method", value: `Visa ending in ${cardLast4}` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-on-surface-variant font-label-md text-sm">{item.label}</span>
                <span className="font-body-md text-on-surface text-sm">{item.value}</span>
              </div>
            ))}

            <div className="border-t border-outline-variant pt-3 mt-3 flex justify-between items-center">
              <span className="font-bold text-on-surface">Total Paid</span>
              <span className="font-bold text-primary text-lg">
                ₦{amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="flex-1 py-3 border-2 border-primary text-primary rounded-full font-label-md hover:bg-primary/5 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {downloading ? (
              <><Icon name="progress_activity" className="animate-spin" />Generating...</>
            ) : (
              <><Icon name="download" />Download Receipt</>
            )}
          </button>
          <Link
            to="/agent-dashboard"
            className="flex-1 py-3 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="dashboard" />
            Go to Dashboard
          </Link>
        </div>

        <p className="text-center text-xs text-on-surface-variant">
          Your next billing date is <strong>{formatDate(nextBilling)}</strong>.{" "}
          <Link to="/agent-dashboard/subscription" className="text-primary hover:underline">
            Manage subscription
          </Link>
        </p>
      </div>
    </main>
  );
}
