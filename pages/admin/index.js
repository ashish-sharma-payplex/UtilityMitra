import { useAdminAuth } from "@/src/hooks/admin-panel/useAdminAuth";
import { MainApi } from "@/src/lib/MainApi";
import { useState, useEffect } from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────
const EyeIcon = ({ show }) =>
  show ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const LogoutIcon = () => (
  <svg
    width="16"
    height="16"
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
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M3 6H21M3 12H21M3 18H21" />
  </svg>
);

// ─── Static Data ──────────────────────────────────────────────────────────────
const RECENT_TXN = [
  {
    id: "BBPS001",
    user: "Ashish Kumar",
    service: "FASTag Recharge",
    amount: 100,
    status: "SUCCESS",
    date: "26 May 2026, 7:29 PM",
  },
  {
    id: "BBPS002",
    user: "Rohit Sharma",
    service: "Electricity Bill",
    amount: 1450,
    status: "SUCCESS",
    date: "26 May 2026, 6:15 PM",
  },
  {
    id: "BBPS003",
    user: "Priya Singh",
    service: "TATA Play DTH",
    amount: 299,
    status: "REFUNDED",
    date: "26 May 2026, 5:45 PM",
  },
  {
    id: "BBPS004",
    user: "Neha Gupta",
    service: "Mobile Recharge",
    amount: 199,
    status: "PENDING",
    date: "26 May 2026, 4:30 PM",
  },
  {
    id: "BBPS005",
    user: "Amit Verma",
    service: "Gas Bill",
    amount: 650,
    status: "SUCCESS",
    date: "26 May 2026, 3:10 PM",
  },
  {
    id: "BBPS006",
    user: "Sunita Rao",
    service: "Water Bill",
    amount: 320,
    status: "FAILED",
    date: "26 May 2026, 2:55 PM",
  },
  {
    id: "BBPS007",
    user: "Karan Mehta",
    service: "Credit Card Bill",
    amount: 5000,
    status: "SUCCESS",
    date: "26 May 2026, 1:20 PM",
  },
];

const STATUS_CFG = {
  SUCCESS: { bg: "#e8f5e9", color: "#1A914B" },
  PENDING: { bg: "#fff8e1", color: "#f59e0b" },
  REFUNDED: { bg: "#fff3e0", color: "#f97316" },
  FAILED: { bg: "#fef2f2", color: "#e53935" },
};

const TYPE_CFG = {
  CREDIT: { bg: "#e8f5e9", color: "#1A914B" },
  DEBIT: { bg: "#fef2f2", color: "#e53935" },
};

const NAV_ITEMS = [
  { label: "Dashboard", icon: "▦", key: "dashboard" },
  { label: "Users", icon: "👥", key: "users" },
  { label: "Transactions", icon: "💳", key: "txn" },
  { label: "Wallet", icon: "👛", key: "wallet" },
  { label: "Settings", icon: "⚙️", key: "settings" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow({ cols }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: "14px 16px" }}>
          <div style={{ height: 13, background: "#f0f0f0", borderRadius: 6 }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onLogin }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mobile || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    const res = await onLogin(mobile, password);
    if (!res.ok) setError(res.error);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a2f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Montserrat', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "min(440px, 100%)",
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              overflow: "hidden",
            }}
          >
            <img
              src="/logo2.png"
              alt="Logo"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
              }}
            />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 800,
              color: "#111",
            }}
          >
            Admin Panel
          </h1>
          <p style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#888" }}>
            Sign in to access the dashboard
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 700,
              color: "#555",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Mobile Number
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1.5px solid #e0e0e0",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1A914B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
          >
            <span
              style={{
                padding: "13px 12px",
                background: "#f5f5f5",
                fontSize: "14px",
                fontWeight: 700,
                color: "#555",
                borderRight: "1px solid #e0e0e0",
                whiteSpace: "nowrap",
              }}
            >
              +91
            </span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter mobile number"
              maxLength={10}
              style={{
                flex: 1,
                padding: "13px 14px",
                border: "none",
                outline: "none",
                fontSize: "14px",
                fontFamily: "'Montserrat', sans-serif",
                color: "#111",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 700,
              color: "#555",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "13px 44px 13px 14px",
                boxSizing: "border-box",
                border: "1.5px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "14px",
                fontFamily: "'Montserrat', sans-serif",
                outline: "none",
                transition: "border 0.2s",
                color: "#111",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1A914B")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
            <button
              onClick={() => setShowPass((s) => !s)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
                padding: "4px",
              }}
            >
              <EyeIcon show={showPass} />
            </button>
          </div>
        </div>

        {error && (
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: "12px",
              color: "#e53935",
              fontWeight: 600,
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "14px",
            background: loading ? "#a5d6b7" : "#1A914B",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 700,
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Montserrat', sans-serif",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout, collapsed }) {
  return (
    <div
      style={{
        width: collapsed ? 0 : 240,
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "28px 24px 20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #1A914B, #157a3e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            ⚡
          </div>
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "15px",
                whiteSpace: "nowrap",
              }}
            >
              AdminPanel
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "11px",
                whiteSpace: "nowrap",
              }}
            >
              Management System
            </div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 14px",
                borderRadius: "10px",
                marginBottom: "4px",
                background: isActive ? "rgba(26,145,75,0.2)" : "transparent",
                border: isActive
                  ? "1px solid rgba(26,145,75,0.3)"
                  : "1px solid transparent",
                cursor: "pointer",
                color: isActive ? "#4ade80" : "rgba(255,255,255,0.6)",
                fontSize: "14px",
                fontWeight: isActive ? 700 : 500,
                fontFamily: "'Montserrat', sans-serif",
                transition: "all 0.15s",
                textAlign: "left",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: "16px", flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          padding: "16px 12px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "11px 14px",
            borderRadius: "10px",
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            color: "#f87171",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "'Montserrat', sans-serif",
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(248,113,113,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <LogoutIcon /> Logout
        </button>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, change, up, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #f0f0f0",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#888" }}>
          {label}
        </span>
        <span style={{ fontSize: "22px" }}>{icon}</span>
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: 800,
          color: "#111",
          marginBottom: "8px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          background: up ? "#e8f5e9" : "#fef2f2",
          color: up ? "#1A914B" : "#e53935",
          padding: "3px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {up ? "▲" : "▼"} {change}
      </div>
    </div>
  );
}

// ─── Dashboard Content ────────────────────────────────────────────────────────
function DashboardContent() {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    Promise.all([
      MainApi("/api/v1/admin/dashboard", { token }),
      MainApi("/api/v1/admin/users", { token }),
    ]).then(([dashRes, usersRes]) => {
      if (dashRes.ok && dashRes.data?.data) setStats(dashRes.data.data);
      if (usersRes.ok && usersRes.data?.data?.items)
        setRecentUsers(usersRes.data.data.items.slice(0, 5));
      setLoading(false);
    });
  }, []);

  const LIVE_STATS = stats
    ? [
        {
          label: "Total Users",
          value: stats.total_users.toLocaleString("en-IN"),
          icon: "👥",
          up: true,
          change: "Live",
        },
        {
          label: "Total Transactions",
          value: stats.total_transactions.toLocaleString("en-IN"),
          icon: "💳",
          up: true,
          change: "Live",
        },
        {
          label: "Total Volume",
          value: `₹${Number(stats.total_volume).toLocaleString("en-IN")}`,
          icon: "📈",
          up: true,
          change: "Live",
        },
        {
          label: "Success / Pending / Failed",
          value: `${stats.total_success} / ${stats.total_pending} / ${stats.total_failed}`,
          icon: "✅",
          up: stats.total_success >= stats.total_failed,
          change: "Live",
        },
      ]
    : [];

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #f0f0f0",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    height: 14,
                    width: "60%",
                    background: "#f0f0f0",
                    borderRadius: 6,
                    marginBottom: 16,
                  }}
                />
                <div
                  style={{
                    height: 28,
                    width: "40%",
                    background: "#f0f0f0",
                    borderRadius: 6,
                    marginBottom: 12,
                  }}
                />
                <div
                  style={{
                    height: 20,
                    width: "30%",
                    background: "#f0f0f0",
                    borderRadius: 20,
                  }}
                />
              </div>
            ))
          : LIVE_STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {/* Recent Transactions — static preview */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #f0f0f0",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0" }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 800,
                color: "#111",
              }}
            >
              Recent Transactions
            </h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["USER", "SERVICE", "AMOUNT", "STATUS"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#aaa",
                      letterSpacing: "0.6px",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_TXN.map((t, i) => {
                const cfg = STATUS_CFG[t.status] ?? STATUS_CFG.FAILED;
                return (
                  <tr
                    key={t.id}
                    style={{
                      borderBottom:
                        i < RECENT_TXN.length - 1
                          ? "1px solid #f5f5f5"
                          : "none",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#111",
                      }}
                    >
                      {t.user}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      {t.service}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#111",
                      }}
                    >
                      ₹{t.amount}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: cfg.bg,
                          color: cfg.color,
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Recent Users — real API */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #f0f0f0",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0" }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 800,
                color: "#111",
              }}
            >
              Recent Users
            </h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["NAME", "MOBILE", "WALLET", "JOINED"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#aaa",
                      letterSpacing: "0.6px",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} cols={4} />)
                : recentUsers.map((u, i) => (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom:
                          i < recentUsers.length - 1
                            ? "1px solid #f5f5f5"
                            : "none",
                      }}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              background: "#e8f5e9",
                              color: "#1A914B",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: 800,
                              flexShrink: 0,
                            }}
                          >
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#111",
                            }}
                          >
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        {u.mobile}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1A914B",
                        }}
                      >
                        ₹{u.wallet_balance.toLocaleString("en-IN")}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "12px",
                          color: "#888",
                        }}
                      >
                        {new Date(u.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Users Content ────────────────────────────────────────────────────────────
function UsersContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    MainApi("/api/v1/admin/users", { token }).then((res) => {
      if (res.ok && res.data?.data?.items) setUsers(res.data.data.items);
      setLoading(false);
    });
  }, []);

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const token = sessionStorage.getItem("admin_token");
    setTogglingId(user.id);
    const res = await MainApi(
      `/api/v1/admin/users/${user.id}/status?status=${newStatus}`,
      { token, method: "PUT" }
    );
    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, status: newStatus } : u
        )
      );
    }
    setTogglingId(null);
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, mobile or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "11px 16px",
            boxSizing: "border-box",
            border: "1.5px solid #e0e0e0",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Montserrat', sans-serif",
            outline: "none",
            color: "#111",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1A914B")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 800,
              color: "#111",
            }}
          >
            All Users
          </h3>
          <span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>
            {loading ? "..." : `${filtered.length} users`}
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}
          >
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {[
                  "#",
                  "NAME",
                  "MOBILE",
                  "EMAIL",
                  "STATUS",
                  "WALLET",
                  "JOINED",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#aaa",
                      letterSpacing: "0.6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} cols={7} />)
                : filtered.map((u, i) => (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom:
                          i < filtered.length - 1
                            ? "1px solid #f5f5f5"
                            : "none",
                      }}
                    >
                      {/* # */}
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "12px",
                          color: "#aaa",
                          fontWeight: 600,
                        }}
                      >
                        {u.id}
                      </td>

                      {/* NAME */}
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: u.is_admin ? "#fff3e0" : "#e8f5e9",
                              color: u.is_admin ? "#f97316" : "#1A914B",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "13px",
                              fontWeight: 800,
                              flexShrink: 0,
                            }}
                          >
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#111",
                              }}
                            >
                              {u.name}
                            </div>
                            {u.is_admin && (
                              <div
                                style={{
                                  fontSize: "10px",
                                  color: "#f97316",
                                  fontWeight: 700,
                                }}
                              >
                                ADMIN
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* MOBILE */}
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "13px",
                          color: "#444",
                        }}
                      >
                        {u.mobile}
                      </td>

                      {/* EMAIL */}
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        {u.email}
                      </td>

                      {/* STATUS — toggle button */}
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            onClick={() => handleToggleStatus(u)}
                            disabled={togglingId === u.id}
                            title={
                              u.status === "ACTIVE"
                                ? "Click to block user"
                                : "Click to activate user"
                            }
                            style={{
                              width: 44,
                              height: 24,
                              borderRadius: 12,
                              border: "none",
                              cursor:
                                togglingId === u.id ? "not-allowed" : "pointer",
                              background:
                                togglingId === u.id
                                  ? "#ccc"
                                  : u.status === "ACTIVE"
                                  ? "#1A914B"
                                  : "#e0e0e0",
                              position: "relative",
                              transition: "background 0.2s",
                              padding: 0,
                              flexShrink: 0,
                              opacity: togglingId === u.id ? 0.7 : 1,
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                top: 3,
                                left:
                                  u.status === "ACTIVE" ? 23 : 3,
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                background: "#fff",
                                transition: "left 0.2s",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                              }}
                            />
                          </button>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              color:
                                u.status === "ACTIVE" ? "#1A914B" : "#e53935",
                            }}
                          >
                            {u.status === "ACTIVE" ? "ACTIVE" : "BLOCKED"}
                          </span>
                        </div>
                      </td>

                      {/* WALLET */}
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1A914B",
                        }}
                      >
                        ₹{u.wallet_balance.toLocaleString("en-IN")}
                      </td>

                      {/* JOINED */}
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "12px",
                          color: "#888",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(u.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Transactions Content ─────────────────────────────────────────────────────
function TransactionsContent() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    MainApi("/api/v1/admin/transactions", { token }).then((res) => {
      if (res.ok && res.data?.data?.items) setTxns(res.data.data.items);
      setLoading(false);
    });
  }, []);

  const filtered = txns.filter((t) => {
    const matchSearch =
      t.txn_id.toLowerCase().includes(search.toLowerCase()) ||
      t.biller_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by TXN ID or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            maxWidth: 360,
            padding: "11px 16px",
            boxSizing: "border-box",
            border: "1.5px solid #e0e0e0",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Montserrat', sans-serif",
            outline: "none",
            color: "#111",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1A914B")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["ALL", "SUCCESS", "PENDING", "REFUNDED", "FAILED"].map((s) => {
            const isActive = filterStatus === s;
            const activeBg = s === "ALL" ? "#0f172a" : STATUS_CFG[s]?.color;
            const inactiveBg = s === "ALL" ? "#f0f0f0" : STATUS_CFG[s]?.bg;
            const inactiveColor = s === "ALL" ? "#555" : STATUS_CFG[s]?.color;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif",
                  background: isActive ? activeBg : inactiveBg,
                  color: isActive ? "#fff" : inactiveColor,
                  transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 800,
              color: "#111",
            }}
          >
            All Transactions
          </h3>
          <span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>
            {loading ? "..." : `${filtered.length} records`}
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 750 }}
          >
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {[
                  "SERVICE",
                  "DATE",
                  "TRANSACTION ID",
                  "STATUS",
                  "AMOUNT",
                  "MODE",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#aaa",
                      letterSpacing: "0.6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} cols={6} />)
                : filtered.map((t, i) => {
                    const cfg = STATUS_CFG[t.status] ?? STATUS_CFG.FAILED;
                    return (
                      <tr
                        key={t.txn_id}
                        style={{
                          borderBottom:
                            i < filtered.length - 1
                              ? "1px solid #f5f5f5"
                              : "none",
                        }}
                      >
                        <td style={{ padding: "14px 16px" }}>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#111",
                            }}
                          >
                            {t.biller_name}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#aaa",
                              marginTop: "2px",
                            }}
                          >
                            User ID: {t.user_id}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "12px",
                            color: "#666",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatDate(t.created_at)}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "12px",
                            color: "#444",
                            fontFamily: "monospace",
                            letterSpacing: "0.3px",
                          }}
                        >
                          {t.txn_id}
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span
                            style={{
                              background: cfg.bg,
                              color: cfg.color,
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: cfg.color,
                                display: "inline-block",
                              }}
                            />
                            {t.status.charAt(0) +
                              t.status.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "14px",
                            fontWeight: 800,
                            color: "#111",
                          }}
                        >
                          ₹{t.amount.toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "12px",
                            color: "#888",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                          }}
                        >
                          WALLET
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Wallet Content ───────────────────────────────────────────────────────────
function WalletContent() {
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    MainApi("/api/v1/admin/wallet-ledger", { token }).then((res) => {
      if (res.ok && res.data?.data?.items) setLedger(res.data.data.items);
      setLoading(false);
    });
  }, []);

  const filtered = ledger.filter((l) => {
    const matchSearch =
      (l.reference_id ?? "").toLowerCase().includes(search.toLowerCase()) ||
      l.remarks.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "ALL" || l.txn_type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by reference ID or remarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            maxWidth: 360,
            padding: "11px 16px",
            boxSizing: "border-box",
            border: "1.5px solid #e0e0e0",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Montserrat', sans-serif",
            outline: "none",
            color: "#111",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1A914B")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          {["ALL", "CREDIT", "DEBIT"].map((t) => {
            const isActive = filterType === t;
            const activeBg = t === "ALL" ? "#0f172a" : TYPE_CFG[t]?.color;
            const inactiveBg = t === "ALL" ? "#f0f0f0" : TYPE_CFG[t]?.bg;
            const inactiveColor = t === "ALL" ? "#555" : TYPE_CFG[t]?.color;
            return (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif",
                  background: isActive ? activeBg : inactiveBg,
                  color: isActive ? "#fff" : inactiveColor,
                  transition: "all 0.15s",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 800,
              color: "#111",
            }}
          >
            Wallet Ledger
          </h3>
          <span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>
            {loading ? "..." : `${filtered.length} records`}
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 850 }}
          >
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {[
                  "REMARKS",
                  "DATE",
                  "REFERENCE ID",
                  "TYPE",
                  "AMOUNT",
                  "OPENING BAL",
                  "CLOSING BAL",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#aaa",
                      letterSpacing: "0.6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} cols={7} />)
                : filtered.map((l, i) => {
                    const cfg = TYPE_CFG[l.txn_type] ?? TYPE_CFG.DEBIT;
                    return (
                      <tr
                        key={l.id}
                        style={{
                          borderBottom:
                            i < filtered.length - 1
                              ? "1px solid #f5f5f5"
                              : "none",
                        }}
                      >
                        <td style={{ padding: "14px 16px" }}>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#111",
                            }}
                          >
                            {l.remarks}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#aaa",
                              marginTop: "2px",
                            }}
                          >
                            User ID: {l.user_id}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "12px",
                            color: "#666",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatDate(l.created_at)}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "12px",
                            color: "#444",
                            fontFamily: "monospace",
                            letterSpacing: "0.3px",
                          }}
                        >
                          {l.reference_id ?? (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span
                            style={{
                              background: cfg.bg,
                              color: cfg.color,
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: cfg.color,
                                display: "inline-block",
                              }}
                            />
                            {l.txn_type}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "14px",
                            fontWeight: 800,
                            color:
                              l.txn_type === "CREDIT" ? "#1A914B" : "#e53935",
                          }}
                        >
                          {l.txn_type === "CREDIT" ? "+" : "-"}₹
                          {l.amount.toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "13px",
                            color: "#666",
                            fontWeight: 600,
                          }}
                        >
                          ₹{l.opening_balance.toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#111",
                          }}
                        >
                          ₹{l.closing_balance.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder ──────────────────────────────────────────────────────────────
function PlaceholderContent({ label }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #f0f0f0",
        padding: "80px 24px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>🚧</div>
      <div style={{ fontWeight: 800, fontSize: "18px", color: "#333" }}>
        {label}
      </div>
      <div style={{ fontSize: "13px", color: "#aaa", marginTop: "6px" }}>
        This section is under development
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const { isAuthenticated, loading, login, logout } = useAdminAuth();
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebar] = useState(true);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <LoginModal onLogin={login} />;

  const SECTION_TITLE = {
    dashboard: "Dashboard",
    users: "Users",
    txn: "Transactions",
    wallet: "Wallet Management",
    settings: "Settings",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0 !important; }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <Sidebar
          active={active}
          setActive={setActive}
          onLogout={logout}
          collapsed={!sidebarOpen}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f8f9fb",
            minWidth: 0,
          }}
        >
          {/* Topbar */}
          <div
            style={{
              height: 64,
              background: "#fff",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
              gap: "16px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              position: "sticky",
              top: 0,
              zIndex: 50,
            }}
          >
            <button
              onClick={() => setSidebar((s) => !s)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#555",
                padding: "6px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0f0f0")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <MenuIcon />
            </button>

            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                fontWeight: 800,
                color: "#111",
                flex: 1,
              }}
            >
              {SECTION_TITLE[active]}
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#f0faf4",
                border: "1px solid #c8e6c9",
                borderRadius: "50px",
                padding: "6px 14px 6px 8px",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#1A914B",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                A
              </div>
              <span
                style={{ fontSize: "13px", fontWeight: 700, color: "#1A914B" }}
              >
                Admin
              </span>
            </div>
          </div>

          {/* Page Content */}
          <div
            style={{
              flex: 1,
              padding: "28px 28px 40px 28px",
              overflowY: "auto",
            }}
          >
            {active === "dashboard" && <DashboardContent />}
            {active === "users" && <UsersContent />}
            {active === "txn" && <TransactionsContent />}
            {active === "wallet" && <WalletContent />}
            {active !== "dashboard" &&
              active !== "users" &&
              active !== "txn" &&
              active !== "wallet" && (
                <PlaceholderContent label={SECTION_TITLE[active]} />
              )}
          </div>
        </div>
      </div>
    </>
  );
}