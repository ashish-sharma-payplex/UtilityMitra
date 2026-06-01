// src/components/WalletPaymentModal.jsx
import { useEffect } from "react";

// Lightweight inline spinner — no MUI needed
function Spinner({ size = 16, color = "#fff" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      style={{ animation: "wpm-spin 0.75s linear infinite", flexShrink: 0 }}
    >
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

export default function WalletPaymentModal({
  isOpen,
  onClose,
  onProceed,
  balance       = 0,
  billAmount    = 0,
  walletLoading = false,
  payLoading    = false,
  walletError   = null,
  payError      = null,
}) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else        document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape" && !payLoading) onClose(); };
    if (isOpen) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [isOpen, onClose, payLoading]);

  if (!isOpen) return null;

  const hasSufficientBalance = balance > 0 && balance >= billAmount;

  const fmt = (n) => `₹${parseFloat(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  })}`;
  const displayBalance = fmt(balance);
  const displayBillAmt = fmt(billAmount);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        @keyframes wpm-backdrop { from{opacity:0} to{opacity:1} }
        @keyframes wpm-sheet    { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes wpm-spin     { to{transform:rotate(360deg)} }   /* ← new */

        .wpm-backdrop {
          position:fixed;inset:0;z-index:10001;
          background:rgba(0,0,0,0.48);backdrop-filter:blur(4px);
          display:flex;align-items:center;justify-content:center;
          padding:16px;
          animation:wpm-backdrop 0.2s ease;
        }
        .wpm-modal {
          background:#fff;border-radius:20px;
          width:100%;max-width:380px;
          box-shadow:0 20px 60px rgba(0,0,0,0.2);
          animation:wpm-sheet 0.28s cubic-bezier(0.34,1.15,0.64,1);
          font-family:'Montserrat',sans-serif;
          overflow:hidden;
        }
        .wpm-header { display:flex;align-items:center;justify-content:space-between;padding:20px 20px 16px;border-bottom:1px solid #f0f2f5 }
        .wpm-title  { font-size:16px;font-weight:800;color:#0d1b2a;font-family:'Montserrat',sans-serif }
        .wpm-close  { width:28px;height:28px;border-radius:50%;border:none;background:#f0f2f5;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6b7280;transition:background 0.15s }
        .wpm-close:hover:not(:disabled) { background:#e0e3e8 }
        .wpm-close:disabled { opacity:0.5;cursor:not-allowed }
        .wpm-body { padding:20px }
        .wpm-wallet-row { display:flex;align-items:center;gap:14px;padding:14px 16px;border:1.5px solid #e5e7eb;border-radius:14px;background:#fafafa }
        .wpm-icon-box { width:40px;height:40px;border-radius:10px;background:#f0f2f5;display:flex;align-items:center;justify-content:center;flex-shrink:0 }
        .wpm-wallet-title { font-size:14px;font-weight:700;color:#0d1b2a;font-family:'Montserrat',sans-serif }
        .wpm-wallet-sub   { font-size:12px;color:#6b7280;margin-top:2px;font-family:'Montserrat',sans-serif }
        .wpm-wallet-sub span { font-weight:600;color:#374151 }
        .wpm-radio { width:20px;height:20px;border-radius:50%;border:2px solid #d1d5db;margin-left:auto;flex-shrink:0;background:#fff;transition:border-color 0.2s,background 0.2s;display:flex;align-items:center;justify-content:center }
        .wpm-radio.selected { border-color:#1A914B;background:#1A914B }
        .wpm-radio.selected::after { content:'';width:8px;height:8px;border-radius:50%;background:#fff }
        .wpm-insuf-badge { font-size:10.5px;font-weight:700;color:#dc2626;background:#fee2e2;border:1px solid #fecaca;padding:3px 8px;border-radius:20px;margin-left:auto;flex-shrink:0;font-family:'Montserrat',sans-serif }
        .wpm-error   { margin-top:14px;padding:11px 14px;background:#fff5f5;border:1.5px solid #fecaca;border-radius:10px;font-size:12px;color:#dc2626;font-weight:600;font-family:'Montserrat',sans-serif;display:flex;align-items:flex-start;gap:8px;line-height:1.5 }
        .wpm-warning { margin-top:12px;padding:10px 13px;background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;font-size:12px;color:#92400e;font-weight:600;font-family:'Montserrat',sans-serif;display:flex;align-items:center;gap:7px }
        .wpm-proceed { width:100%;margin-top:18px;padding:14px;background:#1A914B;color:#fff;border:none;border-radius:13px;font-family:'Montserrat',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:background 0.18s,transform 0.1s,box-shadow 0.18s;box-shadow:0 4px 14px rgba(26,145,75,0.30);display:flex;align-items:center;justify-content:center;gap:8px }
        .wpm-proceed:hover:not(:disabled)  { background:#157a3e;box-shadow:0 6px 20px rgba(26,145,75,0.38) }
        .wpm-proceed:active:not(:disabled) { transform:scale(0.985) }
        .wpm-proceed:disabled { background:#9ca3af;box-shadow:none;cursor:not-allowed }
        .wpm-bill-strip { display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;margin-bottom:14px;font-family:'Montserrat',sans-serif }
        .wpm-bill-strip-label { font-size:12px;font-weight:600;color:#374151 }
        .wpm-bill-strip-amt   { font-size:14px;font-weight:800;color:#1A914B }
      `}</style>

      <div className="wpm-backdrop" onClick={!payLoading ? onClose : undefined}>
        <div className="wpm-modal" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="wpm-header">
            <span className="wpm-title">Choose Payment Method</span>
            <button className="wpm-close" onClick={onClose} disabled={payLoading} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="wpm-body">

            {/* Bill amount strip */}
            <div className="wpm-bill-strip">
              <span className="wpm-bill-strip-label">Bill Amount</span>
              <span className="wpm-bill-strip-amt">{displayBillAmt}</span>
            </div>

            {/* Wallet row */}
            <div className="wpm-wallet-row">
              <div className="wpm-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="3"/>
                  <path d="M16 12h.01"/><path d="M22 9H2"/>
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {walletLoading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Spinner size={14} color="#6b7280" />
                    <span className="wpm-wallet-sub">Fetching balance…</span>
                  </div>
                ) : walletError ? (
                  <span className="wpm-wallet-sub" style={{ color: "#dc2626" }}>Could not load balance</span>
                ) : (
                  <>
                    <div className="wpm-wallet-title">
                      Pay via Wallet&nbsp;
                      <span style={{ color: "#1A914B" }}>({displayBalance})</span>
                    </div>
                    <div className="wpm-wallet-sub">Pay instantly using your Dealplex wallet.</div>
                  </>
                )}
              </div>

              {!walletLoading && !walletError && (
                hasSufficientBalance
                  ? <div className="wpm-radio selected"/>
                  : <span className="wpm-insuf-badge">Insufficient</span>
              )}
            </div>

            {/* Wallet API error */}
            {walletError && (
              <div className="wpm-error"><span>⚠️</span> {walletError}</div>
            )}

            {/* Pay-bill API error */}
            {payError && (
              <div className="wpm-error" style={{ background: "#fff5f5", borderColor: "#fecaca" }}>
                <span style={{ flexShrink: 0 }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Payment failed</div>
                  <div style={{ fontWeight: 500 }}>{payError}</div>
                </div>
              </div>
            )}

            {/* Low balance warning */}
            {!walletLoading && !walletError && !hasSufficientBalance && balance > 0 && (
              <div className="wpm-warning">
                <span>⚠</span>
                Your wallet balance ({displayBalance}) is less than the bill amount ({displayBillAmt}). Please recharge your wallet.
              </div>
            )}

            {/* Zero balance */}
            {!walletLoading && !walletError && balance === 0 && (
              <div className="wpm-warning">
                <span>⚠</span>
                Your wallet balance is ₹0.00. Please add money to proceed.
              </div>
            )}

            {/* Proceed button */}
            <button
              className="wpm-proceed"
              disabled={payLoading || walletLoading || !hasSufficientBalance}
              onClick={onProceed}
            >
              {payLoading ? (
                <><Spinner size={16} color="#fff" />Processing…</>
              ) : (
                "Proceed →"
              )}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}