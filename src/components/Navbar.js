// components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import LoginModal from "./utility/LoginModal";
import Image from "next/image";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  {
    label: "Recharge & Bills",
    href: "#",
    children: [
      { label: "Mobile Recharge", href: "#" },
      { label: "Electricity Bill", href: "#" },
      { label: "DTH Recharge", href: "#" },
      { label: "Credit Card Bill", href: "#" },
      { label: "Gas Bill", href: "#" },
    ],
  },
  {
    label: "Ticket Booking",
    href: "#",
    children: [
      { label: "Train Tickets", href: "#" },
      { label: "Bus Tickets", href: "#" },
      { label: "Flight Tickets", href: "#" },
      { label: "Movie Tickets", href: "#" },
    ],
  },
  {
    label: "Payments & Services",
    href: "#",
    children: [
      { label: "UPI Transfer", href: "#" },
      { label: "Send Money", href: "#" },
      { label: "Insurance", href: "#" },
      { label: "Loans", href: "#" },
    ],
  },
  {
    label: "Paytm for Business",
    href: "#",
    children: [
      { label: "Payment Gateway", href: "#" },
      { label: "POS Machine", href: "#" },
      { label: "Business Loans", href: "#" },
    ],
  },
  {
    label: "Company",
    href: "#",
    children: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Investors", href: "#" },
    ],
  },
];

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 16L7 11M12 16L17 11M12 16V4M4 20H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" />
    <path
      d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6H21M3 12H21M3 18H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ── Dropdown Menu ─────────────────────────────────────────────────────────────
const DropdownMenu = ({ items, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        minWidth: "200px",
        zIndex: 1000,
        overflow: "hidden",
        border: "1px solid #f0f0f0",
        animation: "dropIn 0.18s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "11px 18px",
            fontSize: "13.5px",
            color: "#333",
            textDecoration: "none",
            fontWeight: 450,
            borderBottom: i < items.length - 1 ? "1px solid #f5f5f5" : "none",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f7fdf9";
            e.currentTarget.style.color = "#1A914B";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#333";
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

// ── Logo ──────────────────────────────────────────────────────────────────────
const Logo = () => (
  <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
    <Image
      src="/LOGO.png"
      alt="Logo"
      width={170}
      height={40}
      style={{ objectFit: "contain" }}
    />
  </Link>
);

// ── User Button (logged in state) ─────────────────────────────────────────────
const UserButton = ({ name, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter(); // ✅ router yahan hai

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    toast("Logout successful", {
      icon: "❌",
      style: {
        border: "1px solid #fecaca",
        padding: "14px 18px",
        color: "#dc2626",
      },
    });
    setTimeout(() => {
      onLogout();
    }, 800);
  };

  const initial = name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((s) => !s)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#1A914B",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 700,
          color: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          padding: "5px 16px 5px 8px",
          borderRadius: "50px",
          transition: "background 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#157a3e")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1A914B")}
      >
        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {initial}
        </div>
        Hi, {name}
        <ChevronDown />
      </button>

      {/* Desktop Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            border: "1px solid #f0f0f0",
            minWidth: "190px",
            zIndex: 2000,
            overflow: "hidden",
            animation: "dropIn 0.18s ease",
            display: "flex",
            flexDirection: "column",
            padding: "6px",
            gap: "4px",
          }}
        >
          {/* My Transaction */}
          <button
            onClick={() => {
              router.push("/transactions"); // ✅ setOpen — sahi hai yahan
              setOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
              fontFamily: "'Montserrat', sans-serif",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5e9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            <span>My Transaction</span>
          </button>

          {/* Wallet */}
          <button
            onClick={() => {
              router.push("/wallet");
              setOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
              fontFamily: "'Montserrat', sans-serif",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5e9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            <span>Wallet</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#e53935",
              fontFamily: "'Montserrat', sans-serif",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5e9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { login, logout, loading, error } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(index);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 500px; }
        }
        .nav-item-btn {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 4px;
          padding: 6px 10px; border-radius: 8px;
          font-size: 13.5px; font-weight: 500; color: #222;
          font-family: 'Montserrat', sans-serif;
          transition: background 0.15s, color 0.15s; white-space: nowrap;
        }
        .nav-item-btn:hover { background: #f0faf4; color: #1A914B; }
        .download-btn {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          font-size: 13.5px; font-weight: 600; color: #1A914B;
          font-family: 'Montserrat', sans-serif;
          padding: 6px 10px; border-radius: 8px;
          transition: background 0.15s; white-space: nowrap; text-decoration: none;
        }
        .download-btn:hover { background: #f0faf4; }
        .signin-btn {
          display: flex; align-items: center; gap: 8px;
          background: #1A914B; border: none; cursor: pointer;
          font-size: 14px; font-weight: 700; color: #fff;
          font-family: 'Montserrat', sans-serif;
          padding: 9px 20px; border-radius: 50px;
          transition: background 0.2s, transform 0.15s; white-space: nowrap; text-decoration: none;
        }
        .signin-btn:hover { background: #157a3e; transform: scale(1.03); }
        .user-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-menu-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4); z-index: 998; backdrop-filter: blur(2px);
        }
        .mobile-menu {
          position: fixed; top: 0; left: 0;
          width: min(320px, 85vw); height: 100vh;
          background: #fff; z-index: 999; overflow-y: auto;
          box-shadow: 4px 0 20px rgba(0,0,0,0.15);
          animation: slideRight 0.25s ease;
        }
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .mobile-nav-item { border-bottom: 1px solid #f0f0f0; }
        .mobile-nav-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 20px; cursor: pointer;
          font-size: 14px; font-weight: 600; color: #222;
          font-family: 'Montserrat', sans-serif; transition: background 0.15s;
        }
        .mobile-nav-header:hover { background: #f7fdf9; color: #1A914B; }
        .mobile-nav-child {
          padding: 10px 20px 10px 32px; font-size: 13px; color: #555;
          font-family: 'Montserrat', sans-serif; display: block;
          text-decoration: none; border-top: 1px solid #fafafa; transition: color 0.15s;
        }
        .mobile-nav-child:hover { color: #1A914B; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger-btn { display: none !important; }
        }
        body { padding-top: 62px; }
      `}</style>

      {/* ── Login Modal ── */}
      {/* <LoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={login}
        loading={loading}
        error={error}
      /> */}

      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 20px",
            height: "62px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Logo />

          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
            className="desktop-nav"
          >
            {user ? (
              <UserButton name={user.name} onLogout={handleLogout} />
            ) : (
              <button className="signin-btn" onClick={() => setModalOpen(true)}>
                <div className="user-avatar">
                  <UserIcon />
                </div>
                Sign In
              </button>
            )}
          </div> */}
          {/* Contact Us Button */}
          <div
            className="desktop-nav"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              href="/contact"
              style={{
                padding: "10px 20px",
                background: "#1A914B",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "'Montserrat', sans-serif",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#157a3e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1A914B";
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="hamburger-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "8px",
              color: "#333",
              display: "none",
            }}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mobile-menu">
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f9fffe",
              }}
            >
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#555",
                  padding: "4px",
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Sign In / User (mobile) */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "2px solid #f0f0f0",
              }}
            >
              {user ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {/* Greeting */}
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#1A914B",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Hi, {user.name}
                  </span>

                  {/* My Transaction */}
                  <button
                    onClick={() => {
                      router.push("/transactions"); // ✅ setMobileOpen — sahi hai yahan
                      setMobileOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "#fff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#333",
                      fontFamily: "'Montserrat', sans-serif",
                      borderRadius: "8px",
                      transition: "background 0.15s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#e8f5e9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    My Transaction
                  </button>

                  {/* Wallet */}
                  <button
                    onClick={() => {
                      router.push("/wallet");
                      setMobileOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "#fff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#333",
                      fontFamily: "'Montserrat', sans-serif",
                      borderRadius: "8px",
                      transition: "background 0.15s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#e8f5e9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    Wallet
                  </button>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "#fff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#e53935",
                      fontFamily: "'Montserrat', sans-serif",
                      borderRadius: "8px",
                      transition: "background 0.15s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#e8f5e9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    <LogoutIcon />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="signin-btn"
                  style={{ justifyContent: "center", width: "100%" }}
                  onClick={() => {
                    setMobileOpen(false);
                    setModalOpen(true);
                  }}
                >
                  <div className="user-avatar">
                    <UserIcon />
                  </div>
                  Sign In
                </button>
              )}
            </div>

            <div style={{ padding: "16px 20px" }}>
              <a
                href="#"
                className="download-btn"
                style={{ justifyContent: "center" }}
              >
                <DownloadIcon />
                Download App
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
