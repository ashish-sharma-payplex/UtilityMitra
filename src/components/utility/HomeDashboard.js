import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/src/hooks/useAuth";
import LoginModal from "@/src/components/utility/LoginModal";
import ViewAllModal from "@/src/components/utility/ViewAllModal";
import { useRouter } from "next/router";
import { useGetBbpsServices } from "@/src/hooks/useGetServices";

const serviceImageMap = {
  "education-fees": "/utility/educationfees.svg",
  electricity: "/utility/ElectricBill.svg",
  "loan-repayment": "/utility/loanrepayment.svg",
  gas: "/utility/gas-pipe.svg",
  water: "/utility/water.svg",
  "mobile-postpaid": "/utility/postpaid.svg",
  "housing-society": "/utility/housing.svg",
  "broadband-postpaid": "/utility/broadband.svg",
  insurance: "/utility/insurance.svg",
  "landline-postpaid": "/utility/device-landline-phone.svg",
  fastag: "/utility/fastag.svg",
  "cable-tv": "/utility/postpaid.svg",
  "municipal-taxes": "/utility/muncipal.svg",
  "life-insurance": "/utility/lifeinsurance.svg",
  dth: "/utility/DTHrecharge.svg",
  "credit-card": "/utility/cards.svg",
  "hospital-and-pathology": "/utility/pathology.svg",
  "municipal-services": "/utility/muncipal.svg",
  "lpg-gas": "/utility/LPG.svg",
  "clubs-and-associations": "/utility/club&association.svg",
  subscription: "/utility/subcription.svg",
  "health-insurance": "/utility/healthinsurance.svg",
  "mobile-prepaid": "/utility/recharge.svg",
  "recurring-deposit": "/utility/recharge.svg",
  hospital: "/utility/hospital.svg",
  rental: "/utility/rental.svg",
  b2b: "/utility/b2b.svg",
  "metro-recharge": "/utility/train-front.svg",
  "ncmc-recharge": "/utility/recharge.svg",
  donation: "/utility/donation.svg",
  "national-pension-system": "/utility/recharge.svg",
  "prepaid-meter": "/utility/prepaid.svg",
  "agent-collection": "/utility/agentcollection.svg",
  echallan: "/utility/eChallan.svg",
  "ev-recharge": "/utility/EVrecharge.svg",
};

const MAIN_DISPLAY_COUNT = 7;

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonItem = () => (
  <div className="recharge-item" style={{ pointerEvents: "none" }}>
    <div className="skel-circle" />
    <div className="skel-bar" style={{ width: 56 }} />
    <div className="skel-bar" style={{ width: 40 }} />
  </div>
);

// ── Service Unavailable Overlay ───────────────────────────────────────────────
const ServiceUnavailableOverlay = ({ onRetry, retrying }) => (
  <div className="su-backdrop">
    <div className="su-card">

      {/* Animated icon ring */}
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

      {/* Floating dots decoration */}
      <div className="su-dot su-dot-a" />
      <div className="su-dot su-dot-b" />
      <div className="su-dot su-dot-c" />

      <p className="su-title">Services temporarily unavailable</p>
      <p className="su-msg">
        We're facing some technical issues right now.<br />
        Our team is already on it — please try again<br />
        in a few moments.
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
);

// ── Promo & App card data ─────────────────────────────────────────────────────
const CashbackIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
    <rect width="32" height="32" rx="6" fill="#1565c0" />
    <text x="16" y="13" textAnchor="middle" fontSize="7" fontWeight="900" fill="#fff" fontFamily="sans-serif">Cash</text>
    <text x="16" y="22" textAnchor="middle" fontSize="7" fontWeight="900" fill="#FFD600" fontFamily="sans-serif">Back</text>
  </svg>
);

const BroadbandIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
    <rect width="32" height="32" rx="6" fill="#e3f2fd" />
    <path d="M8 20 Q16 10 24 20" stroke="#1565c0" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="22" r="2.5" fill="#1565c0" />
    <line x1="16" y1="24" x2="16" y2="28" stroke="#1565c0" strokeWidth="1.5" />
    <line x1="12" y1="28" x2="20" y2="28" stroke="#1565c0" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PROMO_BANNERS = [
  { icon: <CashbackIcon />, title: "Do Mobile Recharge", bold: "and Win ₹100 cashback.", sub: "Promo: TAKEITALL", btnText: "Recharge Now →", btnHref: "#" },
  { icon: <BroadbandIcon />, title: "Broadband Recharge", bold: "", sub: "Bill due? Pay now & get rewarded", btnText: "Pay Now →", btnHref: "#" },
];

const APP_CARDS = [
  { bg: "#fef8ee", image: "/utilitybottombanner1.svg" },
  { bg: "#eef6ff", image: "/utilitybottombanner2.svg" },
  { bg: "#f0faf4", image: "/utilitybottombanner3.svg" },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function HomeDashboard() {
  const { token, isHydrated } = useSelector((state) => state.auth);
  const { login, loading: loginLoading, error: loginError } = useAuth();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const router = useRouter();

  const {
    data: servicesRaw,
    loading: servicesLoading,
    error: servicesError,
    refetch,
  } = useGetBbpsServices();

  const activeServices = (servicesRaw ?? [])
    .filter((s) => s.status === "ACTIVE")
    .map((s) => ({
      name: s.name,
      slug: s.slug,
      img: serviceImageMap[s.slug] ?? "/utility/recharge.svg",
      href: `/utility/${s.slug}`,
    }));

  const displayServices = activeServices.slice(0, MAIN_DISPLAY_COUNT);
  const showSkeleton = !isHydrated || (!!token && servicesLoading);
  const hasError = !servicesLoading && !!servicesError;

  // ── Login modal ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isHydrated) return;
    setLoginModalOpen(!token);
  }, [isHydrated, token]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleServiceClick = (slug) => router.push(`/billers?service=${slug}`);

  const handleRetry = async () => {
    setRetrying(true);
    await refetch();
    setRetrying(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

        /* ── Shimmer ── */
        @keyframes shimmer {
          0%   { background-position: -200% 0 }
          100% { background-position:  200% 0 }
        }

        /* ── Overlay entrance ── */
        @keyframes suBackdropIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes suCardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.96) }
          to   { opacity: 1; transform: translateY(0)    scale(1)    }
        }

        /* ── Floating rings around icon ── */
        @keyframes ringPulse {
          0%,100% { transform: scale(1);   opacity: .35 }
          50%     { transform: scale(1.18); opacity: .12 }
        }

        /* ── Floating dots ── */
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

        /* ── Spinner ── */
        @keyframes spin {
          to { transform: rotate(360deg) }
        }

        /* ── Skeleton ── */
        .skel-circle {
          width:52px; height:52px; border-radius:50%;
          background: linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%);
          background-size:200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skel-bar {
          height:10px; border-radius:4px;
          background: linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%);
          background-size:200% 100%;
          animation: shimmer 1.4s infinite;
        }

        /* ── Overlay ── */
        .su-backdrop {
          min-height: 62vh;
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

        /* icon */
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

        /* floating dots */
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

        /* button */
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
        .su-btn:active:not(:disabled) {
          transform: translateY(0px);
        }
        .su-btn--loading { opacity: 0.82; cursor: not-allowed; }
        .su-spinner-wrap {
          display: inline-flex; align-items: center; gap: 8px;
        }
        .su-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        /* ── Dashboard ── */
        .hd-wrap       { font-family:'Montserrat',sans-serif; max-width:1200px; margin:0 auto; padding:24px 16px; display:flex; flex-direction:column; gap:20px; }
        .top-row       { display:grid; grid-template-columns:1fr auto; gap:20px; align-items:start; }
        .recharge-card { background:#fff; border-radius:16px; padding:24px; box-shadow:0 2px 12px rgba(0,0,0,0.06); border:1px solid #f0f0f0; }
        .recharge-title{ font-size:16px; font-weight:700; color:#111; margin-bottom:20px; }
        .recharge-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:8px; }
        .recharge-item { display:flex; flex-direction:column; align-items:center; gap:8px; padding:12px 6px; border-radius:12px; cursor:pointer; transition:background 0.2s,transform 0.15s; text-decoration:none; }
        .recharge-item:hover { background:#f0faf4; transform:translateY(-2px); }
        .recharge-icon { width:52px; height:52px; object-fit:contain; }
        .recharge-label{ font-size:12px; font-weight:500; color:#333; text-align:center; line-height:1.4; white-space:pre-line; }
        .view-all-tile { display:flex; flex-direction:column; align-items:center; gap:8px; padding:12px 6px; border-radius:12px; cursor:pointer; transition:background 0.2s,transform 0.15s; border:none; background:none; font-family:'Montserrat',sans-serif; }
        .view-all-tile:hover { background:#f0f4ff; transform:translateY(-2px); }
        .view-all-icon { width:52px; height:52px; display:grid; grid-template-columns:1fr 1fr; gap:4px; }
        .view-all-dot  { border-radius:6px; }

        .promo-row  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .promo-card { background:#fff; border-radius:14px; padding:16px 20px; display:flex; align-items:center; justify-content:space-between; gap:12px; box-shadow:0 2px 10px rgba(0,0,0,0.05); border:1px solid #f0f0f0; }
        .promo-left { display:flex; align-items:center; gap:12px; }
        .promo-text-title{ font-size:13px; color:#444; font-weight:400; margin-bottom:2px; }
        .promo-text-title strong { font-weight:700; color:#111; }
        .promo-text-sub  { font-size:12px; color:#777; }
        .promo-btn  { white-space:nowrap; padding:8px 16px; border:1.5px solid #1A914B; border-radius:50px; font-size:13px; font-weight:600; color:#1A914B; background:none; cursor:pointer; text-decoration:none; transition:background 0.2s,color 0.2s; font-family:'Montserrat',sans-serif; display:inline-block; }
        .promo-btn:hover { background:#1A914B; color:#fff; }

        .app-row  { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .app-card { border-radius:16px; overflow:hidden; min-height:160px; transition:transform 0.2s,box-shadow 0.2s; display:flex; align-items:stretch; padding:0; }
        .app-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.12); }
        .app-card-image { width:100%; height:100%; object-fit:cover; display:block; }

        @media (max-width:1024px) { .top-row{grid-template-columns:1fr} .recharge-grid{grid-template-columns:repeat(3,1fr)} }
        @media (max-width:768px)  { .promo-row{grid-template-columns:1fr} .app-row{grid-template-columns:1fr} }
        @media (max-width:480px)  { .recharge-icon{width:38px;height:38px} .recharge-label{font-size:11px} }
      `}</style>

      <ViewAllModal
        isOpen={viewAllOpen}
        onClose={() => setViewAllOpen(false)}
        services={activeServices}
        loading={showSkeleton}
      />
{/* 
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={login}
        loading={loginLoading}
        error={loginError}
      /> */}

      {/* ── Error state ── */}
      {hasError ? (
        <ServiceUnavailableOverlay onRetry={handleRetry} retrying={retrying} />
      ) : (
        <div className="hd-wrap">

          {/* Section 1 — Recharge Grid */}
          <div className="top-row">
            <div className="recharge-card">
              <div className="recharge-title">Recharges &amp; Bill Payments</div>
              <div className="recharge-grid">
                {showSkeleton
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonItem key={i} />)
                  : (
                    <>
                      {displayServices.map((item) => (
                        <div
                          key={item.slug}
                          className="recharge-item"
                          onClick={() => handleServiceClick(item.slug)}
                        >
                          <img src={item.img} alt={item.name} className="recharge-icon" />
                          <span className="recharge-label">
                            {item.name.includes(" ") ? item.name.replace(" ", "\n") : item.name}
                          </span>
                        </div>
                      ))}
                      <button className="view-all-tile" onClick={() => setViewAllOpen(true)}>
                        <div className="view-all-icon">
                          <div className="view-all-dot" style={{ background: "#e3f2fd" }} />
                          <div className="view-all-dot" style={{ background: "#e8f5e9" }} />
                          <div className="view-all-dot" style={{ background: "#fff3e0" }} />
                          <div className="view-all-dot" style={{ background: "#fce4ec" }} />
                        </div>
                        <span className="recharge-label">{"View All\nProducts"}</span>
                      </button>
                    </>
                  )
                }
              </div>
            </div>
          </div>

          {/* Section 2 — Promo Banners */}
          <div className="promo-row">
            {PROMO_BANNERS.map((p, i) => (
              <div key={i} className="promo-card">
                <div className="promo-left">
                  {p.icon}
                  <div>
                    <div className="promo-text-title"><strong>{p.title}</strong> {p.bold}</div>
                    <div className="promo-text-sub">{p.sub}</div>
                  </div>
                </div>
                <a href={p.btnHref} className="promo-btn">{p.btnText}</a>
              </div>
            ))}
          </div>

          {/* Section 3 — App Cards */}
          <div className="app-row">
            {APP_CARDS.map((card, i) => (
              <div key={i} className="app-card" style={{ background: card.bg }}>
                <img src={card.image} alt="banner" className="app-card-image" />
              </div>
            ))}
          </div>

        </div>
      )}
    </>
  );
}