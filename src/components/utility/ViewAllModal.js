import { useEffect } from "react";
import { useRouter } from "next/router";

// ── Service categories — slugs ke hisaab se group karo ───────────────────────
const CATEGORIES = [
  {
    title: "Recharges",
    slugs: [
      "mobile-prepaid", "mobile-postpaid", "dth", "broadband-postpaid",
      "fastag", "metro-recharge", "ncmc-recharge", "prepaid-meter", "ev-recharge",
    ],
  },
  {
    title: "Bill Payments",
    slugs: [
      "electricity", "loan-repayment", "water", "gas", "lpg-gas",
      "landline-postpaid", "cable-tv", "municipal-taxes", "municipal-services",
      "credit-card", "insurance", "life-insurance", "health-insurance",
      "housing-society", "education-fees", "recurring-deposit",
      "national-pension-system", "echallan", "hospital", "hospital-and-pathology",
    ],
  },
  {
    title: "More Services",
    slugs: [
      "subscription", "clubs-and-associations", "donation",
      "rental", "b2b", "agent-collection",
    ],
  },
];

// ── Skeleton tile ─────────────────────────────────────────────────────────────
const SkeletonTile = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "12px 6px" }}>
    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "vam-shimmer 1.4s infinite" }} />
    <div style={{ width: 52, height: 10, borderRadius: 4, background: "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "vam-shimmer 1.4s infinite" }} />
    <div style={{ width: 38, height: 10, borderRadius: 4, background: "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "vam-shimmer 1.4s infinite" }} />
  </div>
);

// ── Service tile ──────────────────────────────────────────────────────────────
const ServiceTile = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item.slug)}
    style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 8, padding: "12px 6px", borderRadius: 12, cursor: "pointer",
      transition: "background 0.15s, transform 0.15s",
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "#f0faf4"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <img src={item.img} alt={item.name} style={{ width: 48, height: 48, objectFit: "contain" }} />
    <span style={{ fontSize: 12, fontWeight: 500, color: "#333", textAlign: "center", lineHeight: 1.4, whiteSpace: "pre-line" }}>
      {item.name.includes(" ") ? item.name.replace(" ", "\n") : item.name}
    </span>
  </div>
);

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function ViewAllModal({ isOpen, onClose, services = [], loading = false }) {
  const router = useRouter();

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleServiceClick = (slug) => {
    onClose();
    router.push(`/billers?service=${slug}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  // Services jo kisi category me nahi hain → "Others" me
  const categorySlugs = CATEGORIES.flatMap(c => c.slugs);
  const otherServices = services.filter(s => !categorySlugs.includes(s.slug));

  const allCategories = otherServices.length > 0
    ? [...CATEGORIES, { title: "Others", slugs: otherServices.map(s => s.slug) }]
    : CATEGORIES;

  return (
    <>
      <style>{`
        @keyframes vam-shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
        @keyframes vam-fade-in { from { opacity:0; } to { opacity:1; } }
        @keyframes vam-slide-up { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        
        .vam-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: vam-fade-in 0.2s ease;
        }
        .vam-box {
          background: #fff;
          border-radius: 20px;
          width: 100%; max-width: 780px;
          max-height: 85vh;
          display: flex; flex-direction: column;
          box-shadow: 0 24px 60px rgba(0,0,0,0.2);
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
          animation: vam-slide-up 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .vam-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; border-bottom: 1px solid #f0f0f0; flex-shrink: 0;
        }
        .vam-title { font-size: 18px; font-weight: 700; color: #111; }
        .vam-close {
          width: 32px; height: 32px; border-radius: 50%; border: none;
          background: #f0f0f0; cursor: pointer; display: flex;
          align-items: center; justify-content: center; color: #555;
          transition: background 0.2s; flex-shrink: 0;
        }
        .vam-close:hover { background: #e0e0e0; color: #111; }
        .vam-body { overflow-y: auto; padding: 20px 24px; flex: 1; }
        .vam-body::-webkit-scrollbar { width: 5px; }
        .vam-body::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
        .vam-section { margin-bottom: 28px; }
        .vam-section-title {
          font-size: 15px; font-weight: 700; color: #111;
          margin-bottom: 16px; padding-bottom: 8px;
          border-bottom: 2px solid #f0f0f0;
        }
        .vam-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 4px;
        }
        @media (max-width: 600px) {
          .vam-box { max-height: 92vh; border-radius: 16px 16px 0 0; align-self: flex-end; }
          .vam-grid { grid-template-columns: repeat(4, 1fr); }
          .vam-backdrop { align-items: flex-end; padding: 0; }
        }
        @media (max-width: 400px) {
          .vam-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div className="vam-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="vam-box">

          {/* Header */}
          <div className="vam-header">
            <span className="vam-title">All Services</span>
            <button className="vam-close" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="vam-body">
            {loading || services.length === 0
              ? (
                // ── Skeleton ──
                [0, 1, 2].map((si) => (
                  <div key={si} className="vam-section">
                    {/* Section title skeleton */}
                    <div style={{ width: 120, height: 14, borderRadius: 4, background: "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "vam-shimmer 1.4s infinite", marginBottom: 20 }} />
                    <div className="vam-grid">
                      {Array.from({ length: 6 }).map((_, i) => <SkeletonTile key={i} />)}
                    </div>
                  </div>
                ))
              )
              : (
                // ── Real data ──
                allCategories.map((cat) => {
                  const catServices = cat.slugs
                    .map(slug => services.find(s => s.slug === slug))
                    .filter(Boolean);

                  if (catServices.length === 0) return null;

                  return (
                    <div key={cat.title} className="vam-section">
                      <div className="vam-section-title">{cat.title}</div>
                      <div className="vam-grid">
                        {catServices.map((item) => (
                          <ServiceTile key={item.slug} item={item} onClick={handleServiceClick} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )
            }
          </div>

        </div>
      </div>
    </>
  );
}