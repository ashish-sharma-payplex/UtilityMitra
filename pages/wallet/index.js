import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetWalletData } from "@/src/hooks/useGetWalletData";

// ── Txn Type Config
const TXN_CONFIG = {
  CREDIT: { color: "#1A914B", sign: "+", bg: "#e8f5e9", dot: "#1A914B" },
  DEBIT: { color: "#e53935", sign: "-", bg: "#fef2f2", dot: "#e53935" },
};

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  );
};

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SkeletonRow = () => (
  <tr>
    {[240, 100, 160].map((w, i) => (
      <td key={i} style={{ padding: "20px 24px" }}>
        <div
          style={{
            width: w,
            height: 13,
            borderRadius: 6,
            background:
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }}
        />
      </td>
    ))}
  </tr>
);

// ── Add Balance Modal
const AddBalanceModal = ({ onClose, onAdd, loading }) => {
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      setErr("Please enter a valid amount");
      return;
    }
    setErr("");
    onAdd(val);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "32px",
          width: "min(420px, 90vw)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <h3
          style={{
            margin: "0 0 6px 0",
            fontSize: "18px",
            fontWeight: 800,
            color: "#111",
          }}
        >
          Add Balance
        </h3>
        <p style={{ margin: "0 0 24px 0", fontSize: "13px", color: "#888" }}>
          Enter the amount you want to add to your wallet
        </p>

        <div style={{ position: "relative", marginBottom: "8px" }}>
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#555",
            }}
          >
            ₹
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={{
              width: "100%",
              padding: "14px 14px 14px 32px",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111",
              fontFamily: "'Montserrat', sans-serif",
              outline: "none",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#1A914B")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>

        {err && (
          <p
            style={{
              margin: "0 0 12px 0",
              fontSize: "12px",
              color: "#e53935",
              fontWeight: 600,
            }}
          >
            {err}
          </p>
        )}

        {/* Quick amounts */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {[100, 200, 500, 1000].map((q) => (
            <button
              key={q}
              onClick={() => setAmount(String(q))}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid #1A914B",
                background: amount == q ? "#1A914B" : "#fff",
                color: amount == q ? "#fff" : "#1A914B",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                transition: "all 0.15s",
              }}
            >
              ₹{q}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              background: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              color: "#555",
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "12px",
              border: "none",
              background: loading ? "#a5d6b7" : "#1A914B",
              fontSize: "14px",
              fontWeight: 700,
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Montserrat', sans-serif",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Adding..." : "Add Amount"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Success/Error Popup
const ResultPopup = ({ result, onClose }) => {
  if (!result) return null;
  const isOk = result.ok;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9100,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px 32px",
          width: "min(380px, 90vw)",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: isOk ? "#e8f5e9" : "#fef2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto",
            fontSize: "28px",
          }}
        >
          {isOk ? "✓" : "✕"}
        </div>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "18px",
            fontWeight: 800,
            color: isOk ? "#1A914B" : "#e53935",
          }}
        >
          {isOk ? "Balance Added!" : "Failed"}
        </h3>
        <p style={{ margin: "0 0 24px 0", fontSize: "13px", color: "#666" }}>
          {isOk
            ? (result.data?.message ?? "Wallet balance updated successfully")
            : (result.error ?? "Something went wrong. Please try again.")}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "12px 32px",
            borderRadius: "12px",
            border: "none",
            background: isOk ? "#1A914B" : "#e53935",
            fontSize: "14px",
            fontWeight: 700,
            color: "#fff",
            cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

// ── Mobile Card
const MobileCard = ({ item }) => {
  const cfg = TXN_CONFIG[item.txn_type] ?? TXN_CONFIG.DEBIT;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #f0f0f0",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <div style={{ flex: 1, paddingRight: "10px" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "13px",
              color: "#111",
              marginBottom: "3px",
            }}
          >
            {item.remarks}
          </div>
          {item.reference_id && (
            <div
              style={{
                fontSize: "10px",
                color: "#aaa",
                fontFamily: "monospace",
              }}
            >
              {item.reference_id}
            </div>
          )}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: "15px",
            color: cfg.color,
            whiteSpace: "nowrap",
          }}
        >
          {cfg.sign}₹{item.amount}
        </div>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}
      >
        {[
          { label: "Opening", value: `₹${item.opening_balance}` },
          { label: "Closing", value: `₹${item.closing_balance}` },
          { label: "Date", value: formatDate(item.created_at) },
          { label: "Type", value: item.txn_type },
        ].map(({ label, value }) => (
          <div key={label}>
            <div
              style={{
                fontSize: "10px",
                color: "#aaa",
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: "2px",
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: "12px", color: "#333", fontWeight: 600 }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main Page
export default function WalletPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const {
    profile,
    ledger,
    loading,
    error,
    addingBalance,
    addBalance,
    refetch,
  } = useGetWalletData();

  const [showAddModal, setShowAddModal] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);

  const handleAdd = async (amount) => {
    const res = await addBalance(amount);
    setShowAddModal(false);
    setResult(res);
  };

  const items = ledger?.items ?? [];
  const pagination = ledger?.pagination ?? null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes wave {
          0%   { transform: translateX(-100%) rotate(0deg); }
          100% { transform: translateX(100%) rotate(360deg); }
        }
        .txn-row { transition: background 0.15s; }
        .txn-row:hover { background: #f7fdf9 !important; }
        .desktop-table { display: block; }
        .mobile-cards  { display: none; }
        @media (max-width: 768px) {
          .desktop-table { display: none !important; }
          .mobile-cards  { display: block !important; }
          .mob-pad       { padding: 16px !important; }
        }
      `}</style>

      {/* Modals */}
      {showAddModal && (
        <AddBalanceModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
          loading={addingBalance}
        />
      )}
      <ResultPopup result={result} onClose={() => setResult(null)} />

      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9fb",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* ── Header ── */}
          <div className="mob-pad" style={{ padding: "32px 24px 24px 24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "28px",
              }}
            >
              <button
                onClick={() => router.back()}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  color: "#555",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#1A914B")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#e8e8e8")
                }
              >
                <BackIcon />
              </button>
              <h1
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#111",
                }}
              >
                My Wallet
              </h1>
            </div>

            {/* ── Wallet Card ── */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #1A914B 0%, #157a3e 60%, #0f5c2e 100%)",
                borderRadius: "24px",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                maxWidth: "480px",
                margin: "0 auto",
                boxShadow: "0 12px 40px rgba(26,145,75,0.3)",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  left: -20,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />

              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "0.5px",
                  }}
                >
                  Wallet
                </span>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 7H3C2.44772 7 2 7.44772 2 8V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V8C22 7.44772 21.5523 7 21 7Z"
                      stroke="white"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M16 2H8L2 7H22L16 2Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle cx="17" cy="13.5" r="1.5" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Balance */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "6px",
                    fontWeight: 500,
                  }}
                >
                  Total Balance
                </div>
                {loading ? (
                  <div
                    style={{
                      width: 160,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.15)",
                      animation: "shimmer 1.4s infinite",
                      backgroundSize: "200% 100%",
                      backgroundImage:
                        "linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    ₹{profile?.wallet_balance?.toFixed(2) ?? "0.00"}
                  </div>
                )}
              </div>

              {/* Add Balance Button */}
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1A914B",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "opacity 0.2s",
                  position: "relative",
                  zIndex: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#1A914B"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8V16M8 12H16"
                    stroke="#1A914B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Add Balance
              </button>
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <div style={{ padding: "0 24px 20px 24px" }}>
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  color: "#e53935",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{error}</span>
                <button
                  onClick={refetch}
                  style={{
                    background: "#e53935",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* ── Transaction History heading ── */}
          <div
            style={{
              padding: "32px 24px 16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#111",
                }}
              >
                Transaction History
              </h2>
              {pagination && (
                <p
                  style={{
                    margin: "3px 0 0 0",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  {pagination.total_records} record
                  {pagination.total_records !== 1 ? "s" : ""} found
                </p>
              )}
            </div>
          </div>

          {/* ── Empty State ── */}
          {!loading && !error && items.length === 0 && (
            <div style={{ padding: "0 24px" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #f0f0f0",
                  padding: "60px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ fontWeight: 700, fontSize: "16px", color: "#333" }}
                >
                  No transactions yet
                </div>
                <div
                  style={{ fontSize: "13px", color: "#aaa", marginTop: "6px" }}
                >
                  Your wallet history will appear here
                </div>
              </div>
            </div>
          )}

          {/* ── Desktop Table ── */}
          {(loading || items.length > 0) && (
            <div
              className="desktop-table"
              style={{ padding: "0 24px 40px 24px" }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        background: "#fafafa",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {[
                        "DESCRIPTION",
                        "AMOUNT",
                        "OPENING BAL",
                        "CLOSING BAL",
                        "DATE",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "14px 24px",
                            textAlign: "left",
                            fontSize: "11px",
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
                      ? Array(6)
                          .fill(0)
                          .map((_, i) => <SkeletonRow key={i} />)
                      : items.map((item, i) => {
                          const cfg =
                            TXN_CONFIG[item.txn_type] ?? TXN_CONFIG.DEBIT;
                          return (
                            <tr
                              key={item.id}
                              className="txn-row"
                              style={{
                                borderBottom:
                                  i < items.length - 1
                                    ? "1px solid #f5f5f5"
                                    : "none",
                              }}
                            >
                              {/* Description */}
                              <td style={{ padding: "18px 24px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 36,
                                      height: 36,
                                      borderRadius: "50%",
                                      background: cfg.bg,
                                      flexShrink: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "15px",
                                      fontWeight: 800,
                                      color: cfg.color,
                                    }}
                                  >
                                    {cfg.sign}
                                  </div>
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "13px",
                                        color: "#111",
                                      }}
                                    >
                                      {item.remarks}
                                    </div>
                                    {item.reference_id && (
                                      <div
                                        style={{
                                          fontSize: "11px",
                                          color: "#aaa",
                                          fontFamily: "monospace",
                                          marginTop: "2px",
                                        }}
                                      >
                                        {item.reference_id}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Amount */}
                              <td
                                style={{
                                  padding: "18px 24px",
                                  fontWeight: 800,
                                  fontSize: "15px",
                                  color: cfg.color,
                                }}
                              >
                                {cfg.sign}₹{item.amount}
                              </td>

                              {/* Opening */}
                              <td
                                style={{
                                  padding: "18px 24px",
                                  fontSize: "13px",
                                  color: "#555",
                                  fontWeight: 600,
                                }}
                              >
                                ₹{item.opening_balance}
                              </td>

                              {/* Closing */}
                              <td
                                style={{
                                  padding: "18px 24px",
                                  fontSize: "13px",
                                  color: "#555",
                                  fontWeight: 600,
                                }}
                              >
                                ₹{item.closing_balance}
                              </td>

                              {/* Date */}
                              <td
                                style={{
                                  padding: "18px 24px",
                                  fontSize: "13px",
                                  color: "#888",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {formatDate(item.created_at)}
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Mobile Cards ── */}
          <div className="mobile-cards" style={{ padding: "0 16px 32px 16px" }}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#fff",
                        borderRadius: "14px",
                        border: "1px solid #f0f0f0",
                        padding: "16px",
                        marginBottom: "12px",
                      }}
                    >
                      {[100, 60, 80, 60].map((w, j) => (
                        <div
                          key={j}
                          style={{
                            width: w + "%",
                            height: 12,
                            borderRadius: 6,
                            marginBottom: 10,
                            background:
                              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.4s infinite",
                          }}
                        />
                      ))}
                    </div>
                  ))
              : items.map((item) => <MobileCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}
