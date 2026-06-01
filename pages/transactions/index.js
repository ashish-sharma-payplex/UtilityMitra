import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetBbpsTransactions } from "@/src/hooks/useGetBbpsTransactions";

const STATUS_CONFIG = {
  SUCCESS: {
    bg: "#e8f5e9",
    color: "#1A914B",
    dot: "#1A914B",
    label: "Success",
  },
  PENDING: {
    bg: "#fff8e1",
    color: "#f59e0b",
    dot: "#f59e0b",
    label: "Pending",
  },
  REFUNDED: {
    bg: "#fff3e0",
    color: "#f97316",
    dot: "#f97316",
    label: "Refunded",
  },
  FAILED: { bg: "#fef2f2", color: "#e53935", dot: "#e53935", label: "Failed" },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.FAILED;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: cfg.bg,
        color: cfg.color,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        fontFamily: "'Montserrat', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: cfg.dot,
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
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
    {[200, 120, 180, 90, 80, 100].map((w, i) => (
      <td key={i} style={{ padding: "20px 24px" }}>
        <div
          style={{
            width: w,
            height: 14,
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

const MobileCard = ({ txn }) => (
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
        marginBottom: "12px",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: "14px",
            color: "#111",
            marginBottom: "2px",
          }}
        >
          {txn.biller_name}
        </div>
        <div style={{ fontSize: "11px", color: "#888" }}>
          {txn.customer_params?.[0]?.value ?? "—"}
        </div>
      </div>
      <StatusBadge status={txn.status} />
    </div>
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
    >
      {[
        { label: "Amount", value: `₹${txn.amount}` },
        { label: "Mode", value: txn.payment_mode },
        { label: "Date", value: formatDate(txn.created_at) },
        { label: "Transaction ID", value: txn.txn_id?.slice(0, 16) + "…" },
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
          <div
            style={{
              fontSize: "12px",
              color: "#333",
              fontWeight: 600,
              wordBreak: "break-all",
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function TransactionsPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const { data, loading, error, refetch } = useGetBbpsTransactions();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);

  const transactions = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .txn-row { transition: background 0.15s; }
        .txn-row:hover { background: #f7fdf9 !important; }
        .desktop-table { display: block; }
        .mobile-cards  { display: none; }
        @media (max-width: 768px) {
          .desktop-table { display: none !important; }
          .mobile-cards  { display: block !important; }
          .page-padding  { padding: 16px !important; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9fb",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div
          className="page-padding"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "32px 24px 24px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#111",
                }}
              >
                Payments History
              </h1>
              {pagination && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#888",
                    marginTop: "3px",
                  }}
                >
                  {pagination.total_records} transaction
                  {pagination.total_records !== 1 ? "s" : ""} found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Error State ── */}
        {error && (
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px 20px 24px",
            }}
          >
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "12px",
                padding: "20px 24px",
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

        {/* ── Empty State ── */}
        {!loading && !error && transactions.length === 0 && (
          <div
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #f0f0f0",
                padding: "80px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "16px", color: "#333" }}>
                No transactions yet
              </div>
              <div
                style={{ fontSize: "13px", color: "#aaa", marginTop: "6px" }}
              >
                Your payment history will appear here
              </div>
            </div>
          </div>
        )}

        {/* ── Desktop Table ── */}
        {(loading || transactions.length > 0) && (
          <div
            className="desktop-table"
            style={{
              maxWidth: "1280px",
              margin: "8px auto 0 auto",
              padding: "0 24px",
            }}
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
                    ? Array(5)
                        .fill(0)
                        .map((_, i) => <SkeletonRow key={i} />)
                    : transactions.map((txn, i) => (
                        <tr
                          key={txn.txn_id}
                          className="txn-row"
                          style={{
                            borderBottom:
                              i < transactions.length - 1
                                ? "1px solid #f5f5f5"
                                : "none",
                          }}
                        >
                          {/* Service */}
                          <td style={{ padding: "18px 24px" }}>
                            <div
                              style={{
                                fontWeight: 700,
                                fontSize: "14px",
                                color: "#111",
                              }}
                            >
                              {txn.biller_name}
                            </div>
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#aaa",
                                marginTop: "2px",
                              }}
                            >
                              {txn.customer_params?.[0]?.name}:{" "}
                              {txn.customer_params?.[0]?.value ?? "—"}
                            </div>
                          </td>

                          {/* Date */}
                          <td
                            style={{
                              padding: "18px 24px",
                              fontSize: "13px",
                              color: "#555",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatDate(txn.created_at)}
                          </td>

                          {/* Txn ID */}
                          <td style={{ padding: "18px 24px" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#666",
                                fontFamily: "monospace",
                                letterSpacing: "0.3px",
                              }}
                            >
                              {txn.txn_id}
                            </span>
                          </td>

                          {/* Status */}
                          <td style={{ padding: "18px 24px" }}>
                            <StatusBadge status={txn.status} />
                          </td>

                          {/* Amount */}
                          <td
                            style={{
                              padding: "18px 24px",
                              fontWeight: 700,
                              fontSize: "14px",
                              color: "#111",
                            }}
                          >
                            ₹{txn.amount}
                          </td>

                          {/* Mode */}
                          <td
                            style={{
                              padding: "18px 24px",
                              fontSize: "12px",
                              color: "#888",
                              fontWeight: 600,
                            }}
                          >
                            {txn.payment_mode}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Mobile Cards ── */}
        <div className="mobile-cards" style={{ padding: "0 16px" }}>
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
            : transactions.map((txn) => (
                <MobileCard key={txn.txn_id} txn={txn} />
              ))}
        </div>
      </div>
    </>
  );
}
