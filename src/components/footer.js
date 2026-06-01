import Link from "next/link";

function VanShaktiLogo() {
  return (
    <div>
      <img src="/UTILITYMITRA.jpg" alt="VanShakti Logo" className="h-12 w-auto object-contain" />
    </div>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Sustainability", href: "/sustainability" },
];

const navigationLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Terms of use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Blogs", href: "/blogs" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Threads", href: "https://threads.net" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

export default function Footer() {
  return (
    <div style={{ padding: "24px 32px 32px 32px" }}>
      <footer style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        padding: "40px 48px 0px 48px",
      }}>

        {/* Main Footer Grid — first col 2fr, baaki teen 1fr each */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "40px",
          paddingBottom: "40px",
        }}
          className="footer-grid"
        >

          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <VanShaktiLogo />
            <p className="text-gray-500 text-sm leading-relaxed" style={{ maxWidth: "260px" }}>
             UtilityMitra brings together multiple utility services on one platform, making recharges and bill payments simple, fast, and hassle-free.
            </p>
            <a
              href="mailto:support@payplex.in"
              className="text-gray-500 text-sm hover:text-[#1A6B3A] transition-colors duration-200"
            >
              support@payplex.in
            </a>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm mb-4">Quick links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 text-sm hover:text-[#1A6B3A] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm mb-4">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 text-sm hover:text-[#1A6B3A] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Handle Column */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm mb-4">Social Handle</h3>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-sm hover:text-[#1A6B3A] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid #e5e7eb", padding: "20px 0", textAlign: "center" }}>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Payplex Technologies . All Rights Reserved.
          </p>
        </div>

      </footer>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}