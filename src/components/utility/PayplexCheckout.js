import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 🎨 COLOR & STYLE GUIDE — change these to customize the UI
//
//  BACKGROUND (outer page):
//    bg-[#2e3452]         → dark navy-blue page background
//
//  MODAL:
//    bg-[#1e2440]         → modal card background (dark navy)
//    border-[#3a4060]     → modal border color
//
//  HEADER BAR:
//    bg-[#252b4a]         → top header strip background
//    text-white           → "Payplex Secure Checkout" text color
//    text-[#9ba3c0]       → close (×) button color
//
//  AMOUNT:
//    text-white           → ₹1 amount text color
//
//  TRANSACTION ID:
//    text-[#5b8dee]       → blue transaction ID text color
//
//  QR CODE:
//    bg-white             → QR code white background (keep white for scanning)
//    p-3                  → QR code padding (affects white border)
//
//  TIMER:
//    text-[#e53935]       → countdown timer color (red)
//
//  WAITING TEXT:
//    text-[#9ba3c0]       → "Waiting for payment..." text color
//
//  DIVIDER:
//    border-[#3a4060]     → horizontal divider lines color
// ─────────────────────────────────────────────────────────────────────────────

// Static QR code using a public QR API (renders "DEMO" as QR)
const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=demo@upi&pn=Payplex&am=1&cu=INR";

const INITIAL_SECONDS = 4 * 60 + 42; // 04:42 — change this to set timer duration

export default function PayplexCheckout() {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [open, seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const expired = seconds <= 0;

  if (!open) return null;

  return (
    // ── Outer page background ──────────────────────────────────────────────
    <div className="min-h-screen bg-[#2e3452] flex items-center justify-center p-4 font-sans">

      {/* ── Modal card ────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[360px] bg-[#1e2440] rounded-2xl border border-[#3a4060] shadow-2xl overflow-hidden">

        {/* ── Header bar ──────────────────────────────────────────────────── */}
        <div className="bg-[#252b4a] px-5 py-3 flex items-center justify-between border-b border-[#3a4060]">
          <span className="text-white text-sm font-semibold tracking-wide">
            Payplex Secure Checkout
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-[#9ba3c0] hover:text-white transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center px-8 py-6 gap-3">

          {/* Amount */}
          <p className="text-white text-3xl font-bold tracking-tight">₹1</p>

          {/* Transaction ID */}
          <p className="text-[#5b8dee] text-[11px] font-medium tracking-widest break-all text-center">
            TOPUP4BCB5E8AD6384F88BCo
          </p>

          {/* Divider */}
          <div className="w-full border-t border-[#3a4060] my-1" />

          {/* QR Code */}
          <div className="bg-white p-3 rounded-xl">
            <img
              src={QR_URL}
              alt="UPI QR Code"
              width={180}
              height={180}
              className="block"
            />
          </div>

          {/* Divider */}
          <div className="w-full border-t border-[#3a4060] my-1" />

          {/* Timer */}
          <p
            className={`text-2xl font-bold tabular-nums tracking-widest ${
              expired ? "text-[#9ba3c0]" : "text-[#e53935]"
            }`}
          >
            {expired ? "Expired" : `${mm}:${ss}`}
          </p>

          {/* Waiting text */}
          <p className="text-[#9ba3c0] text-[13px] font-medium">
            {expired ? "Session expired." : "Waiting for payment..."}
          </p>
        </div>
      </div>
    </div>
  );
}