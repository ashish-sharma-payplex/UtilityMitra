import Link from "next/link";
import Head from "next/head";

// ─── Data ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Prepaid Recharge", href: "/billers?service=mobile-prepaid" },
  { label: "Electricity", href: "/billers?service=electricity" },
  { label: "DTH Recharge", href: "/billers?service=dth" },
  { label: "Broadband", href: "/billers?service=broadband-postpaid" },
  { label: "View all", href: "#" },
];

const navigationLinks = [
  { label: "Support", href: "#" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Refund Policy", href: "/refund" },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/">
      <img
        src="/UTILITYMITRA.jpg"
        alt="UtilityMitra Logo"
        style={{ height: "40px", width: "auto", objectFit: "contain" }}
      />
    </Link>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <>
      {/* ── Google Font + Global Styles via next/head (SSR-safe) ── */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .um-footer-root * {
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }
          .um-footer-card {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
            padding: 40px 48px 0 48px;
          }
          .um-footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 40px;
            padding-bottom: 40px;
          }
          .um-footer-link {
            font-size: 13px;
            color: #6b7280;
            text-decoration: none;
            transition: color 0.2s;
          }
          .um-footer-link:hover {
            color: #1A6B3A;
          }
          .um-footer-bottom {
            border-top: 1px solid #e5e7eb;
            padding: 18px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 8px;
          }
          @media (max-width: 1024px) {
            .um-footer-card { padding: 32px 32px 0 32px; }
            .um-footer-grid {
              grid-template-columns: 1.5fr 1fr 1fr;
              gap: 28px;
            }
            .um-footer-grid > *:last-child {
              grid-column: 1 / -1;
              border-top: 1px solid #e5e7eb;
              padding-top: 24px;
            }
          }
          @media (max-width: 768px) {
            .um-footer-card { padding: 28px 20px 0 20px; }
            .um-footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 24px;
            }
            .um-footer-grid > *:first-child { grid-column: 1 / -1; }
            .um-footer-grid > *:last-child {
              grid-column: 1 / -1;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
            }
            .um-footer-bottom {
              flex-direction: column;
              align-items: flex-start;
            }
          }
          @media (max-width: 480px) {
            .um-footer-card { padding: 24px 16px 0 16px; }
            .um-footer-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .um-footer-grid > *:last-child {
              grid-column: unset;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
            }
          }
        `}</style>
      </Head>

      <div
        className="um-footer-root"
        style={{ padding: "24px 0px 32px 0px" }}
      >
        <footer className="um-footer-card">
          {/* ── Main Grid ── */}
          <div className="um-footer-grid">
            {/* Brand */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Logo />
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#808080",
                  maxWidth: "320px",
                  margin: 0,
                }}
              >
                UtilityMitra brings together multiple utility services on one
                platform, making recharges and bill payments simple, fast, and
                hassle-free.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                Services
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="um-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Others links */}
            <div>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                Others links
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="um-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                Contact us
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                UtilityMitra Technologies Pvt. Ltd.
                <br />
                2nd Floor, Shree Tower,
                <br />
                Main Road, Harmu Chowk,
                <br />
                Ranchi, Jharkhand – 834002, India
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  lineHeight: "1.7",
                  marginTop: "10px",
                }}
              >
                +91 85296337410
                <br />
                support@utility.com
              </p>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="um-footer-bottom">
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              © 2025 Payplex Technologies. All Rights Reserved.
            </p>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              CIN: U72900JH2025PTC012345
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
