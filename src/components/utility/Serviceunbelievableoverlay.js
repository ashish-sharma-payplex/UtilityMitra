// src/components/utility/ServiceUnavailableOverlay.jsx
// ─── Shared reusable overlay for all API error states ────────────────────────

export default function ServiceUnavailableOverlay({ onRetry, retrying, title, message, minHeight = "62vh" }) {
  return (
    <>
      <style>{`
        @keyframes suBackdropIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes suCardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.96) }
          to   { opacity: 1; transform: translateY(0)    scale(1)    }
        }
        @keyframes ringPulse {
          0%,100% { transform: scale(1);   opacity: .35 }
          50%     { transform: scale(1.18); opacity: .12 }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0px)  }
          50%     { transform: translateY(-8px) }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px) }
          50%     { transform: translateY(6px) }
        }
        @keyframes floatC {
          0%,100% { transform: translateX(0px)  }
          50%     { transform: translateX(-6px) }
        }
        @keyframes su-spin {
          to { transform: rotate(360deg) }
        }

        .su-backdrop {
          min-height: var(--su-min-height, 62vh);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: 'Montserrat', sans-serif;
          animation: suBackdropIn 0.3s ease both;
        }
        .su-card {
          position: relative;
          overflow: hidden;
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 24px;
          padding: 2.75rem 2.25rem 2.25rem;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          animation: suCardIn 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s both;
        }
        .su-icon-wrap {
          position: relative;
          width: 72px; height: 72px;
          margin: 0 auto 1.4rem;
          display: flex; align-items: center; justify-content: center;
        }
        .su-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: #fef3c7;
        }
        .su-ring1 { animation: ringPulse 2.4s ease-in-out infinite; }
        .su-ring2 { animation: ringPulse 2.4s ease-in-out 0.8s infinite; transform: scale(0.82); }
        .su-icon-inner {
          position: relative; z-index: 1;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #fff8e1;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 12px rgba(245,158,11,0.18);
        }
        .su-dot {
          position: absolute;
          border-radius: 50%;
          opacity: 0.18;
          pointer-events: none;
        }
        .su-dot-a {
          width:14px; height:14px; background:#1A914B;
          top:18px; right:28px;
          animation: floatA 3s ease-in-out infinite;
        }
        .su-dot-b {
          width:9px; height:9px; background:#f59e0b;
          bottom:52px; left:22px;
          animation: floatB 2.6s ease-in-out infinite;
        }
        .su-dot-c {
          width:11px; height:11px; background:#3b82f6;
          top:44px; left:14px;
          animation: floatC 3.4s ease-in-out infinite;
        }
        .su-title {
          font-size: 17px; font-weight: 700; color: #111;
          margin: 0 0 0.6rem; line-height: 1.4;
        }
        .su-msg {
          font-size: 13.5px; color: #888; line-height: 1.75;
          margin: 0 0 1.9rem;
        }
        .su-btn {
          width: 100%;
          padding: 13px 0;
          background: #1A914B;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(26,145,75,0.28);
          letter-spacing: 0.01em;
        }
        .su-btn:hover:not(:disabled) {
          background: #157a3f;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(26,145,75,0.35);
        }
        .su-btn:active:not(:disabled) { transform: translateY(0px); }
        .su-btn--loading { opacity: 0.82; cursor: not-allowed; }
        .su-spinner-wrap { display: inline-flex; align-items: center; gap: 8px; }
        .su-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: su-spin 0.7s linear infinite;
          display: inline-block;
        }
      `}</style>

      <div className="su-backdrop" style={{ "--su-min-height": minHeight }}>
        <div className="su-card">
          <div className="su-icon-wrap">
            <div className="su-ring su-ring1" />
            <div className="su-ring su-ring2" />
            <div className="su-icon-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
          </div>

          <div className="su-dot su-dot-a" />
          <div className="su-dot su-dot-b" />
          <div className="su-dot su-dot-c" />

          <p className="su-title">
            {title ?? "Services temporarily unavailable"}
          </p>
          <p className="su-msg">
            {message ?? (
              <>
                We're facing some technical issues right now.<br />
                Our team is already on it — please try again<br />
                in a few moments.
              </>
            )}
          </p>

          <button
            className={`su-btn${retrying ? " su-btn--loading" : ""}`}
            onClick={onRetry}
            disabled={retrying}
          >
            {retrying ? (
              <span className="su-spinner-wrap">
                <span className="su-spinner" />
                Retrying…
              </span>
            ) : "Try again"}
          </button>
        </div>
      </div>
    </>
  );
}