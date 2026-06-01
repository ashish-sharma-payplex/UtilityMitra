// pages/payment-success/index.js
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";

// ─── Service image map (same as BillerPage) ──────────────────────────────────
const serviceImageMap = {
  "education-fees":          "/utility/educationfees.svg",
  electricity:               "/utility/ElectricBill.svg",
  "loan-repayment":          "/utility/loanrepayment.svg",
  gas:                       "/utility/gas-pipe.svg",
  water:                     "/utility/water.svg",
  "mobile-postpaid":         "/utility/postpaid.svg",
  "housing-society":         "/utility/housing.svg",
  "broadband-postpaid":      "/utility/broadband.svg",
  insurance:                 "/utility/insurance.svg",
  "landline-postpaid":       "/utility/device-landline-phone.svg",
  fastag:                    "/utility/fastag.svg",
  "cable-tv":                "/utility/postpaid.svg",
  "municipal-taxes":         "/utility/muncipal.svg",
  "life-insurance":          "/utility/lifeinsurance.svg",
  dth:                       "/utility/DTHrecharge.svg",
  "credit-card":             "/utility/cards.svg",
  "hospital-and-pathology":  "/utility/pathology.svg",
  "municipal-services":      "/utility/muncipal.svg",
  "lpg-gas":                 "/utility/LPG.svg",
  "clubs-and-associations":  "/utility/club&association.svg",
  subscription:              "/utility/subcription.svg",
  "health-insurance":        "/utility/healthinsurance.svg",
  "mobile-prepaid":          "/utility/recharge.svg",
  "recurring-deposit":       "/utility/recharge.svg",
  hospital:                  "/utility/hospital.svg",
  rental:                    "/utility/rental.svg",
  b2b:                       "/utility/b2b.svg",
  "metro-recharge":          "/utility/train-front.svg",
  "ncmc-recharge":           "/utility/recharge.svg",
  donation:                  "/utility/donation.svg",
  "national-pension-system": "/utility/recharge.svg",
  "prepaid-meter":           "/utility/prepaid.svg",
  "agent-collection":        "/utility/agentcollection.svg",
  echallan:                  "/utility/eChallan.svg",
  "ev-recharge":             "/utility/EVrecharge.svg",
};

// ─── CopyButton ───────────────────────────────────────────────────────────────
const CopyButton = ({ text, copied, type, onCopy }) => (
  <Box
    onClick={() => onCopy(text, type)}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      cursor: "pointer",
      color: copied ? "#16a34a" : "#6b7280",
      transition: "color 0.2s",
      "&:hover": { color: "#16a34a" },
      flexShrink: 0,
    }}
  >
    <ContentCopyIcon sx={{ fontSize: 14 }} />
    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
      {copied ? "COPIED" : "COPY"}
    </Typography>
  </Box>
);

const Divider = () => <Box sx={{ borderTop: "1px solid #e5e7eb", my: 2 }} />;

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PaymentSuccessPage() {
  const router = useRouter();
  const { biller_name, amount, service, ref_id } = router.query;

  const [copiedRef, setCopiedRef] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isPdfMode, setIsPdfMode] = useState(false);

  const billCardRef = useRef(null);

  const serviceLabel = service
    ? service.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Bill Payment";

  const billerLogo = serviceImageMap[service] ?? "/utility/recharge.svg";

  const date = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const displayAmount = amount
    ? parseFloat(amount).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "";

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "ref") {
        setCopiedRef(true);
        setTimeout(() => setCopiedRef(false), 2000);
      }
    });
  };

  const handleDownloadPDF = async () => {
    if (!billCardRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const element = billCardRef.current;
      setIsPdfMode(true);
      await new Promise((r) => setTimeout(r, 50));

      const originalBorderRadius = element.style.borderRadius;
      element.style.borderRadius = "0";

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      element.style.borderRadius = originalBorderRadius;
      setIsPdfMode(false);

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth  = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin     = 10;
      const imgWidth   = pageWidth - margin * 2;
      const imgHeight  = (canvas.height / canvas.width) * imgWidth;

      let remainingHeight = imgHeight;
      let sourceY = 0;

      while (remainingHeight > 0) {
        const sliceHeight = Math.min(remainingHeight, pageHeight - margin * 2);
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width  = canvas.width;
        sliceCanvas.height = (sliceHeight / imgHeight) * canvas.height;
        const ctx = sliceCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, sourceY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
        if (sourceY > 0) pdf.addPage();
        pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", margin, margin, imgWidth, sliceHeight);
        sourceY += sliceCanvas.height;
        remainingHeight -= sliceHeight;
      }

      pdf.save(`payment_success_${ref_id || Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF download failed. Please try again.");
    } finally {
      setIsPdfMode(false);
      setDownloading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        p: { xs: 1.5, sm: 3 },
        pt: { xs: 2, sm: 4 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480 }}>

        {/* ── BILL CARD ── */}
        <Box
          ref={billCardRef}
          sx={{
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          {/* ── TOP BANNER ── */}
          <Box
            sx={{
              background: "linear-gradient(180deg, #d1fae5 0%, #f0fdf4 60%, #fff 100%)",
              pt: 4,
              pb: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 1.5,
              }}
            >
              <CheckCircleIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>

            <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#16a34a", mb: 1.5 }}>
              Payment Successful
            </Typography>

            {displayAmount && (
              <Typography sx={{ fontSize: 30, fontWeight: 700, color: "#16a34a" }}>
                ₹{displayAmount}
              </Typography>
            )}
          </Box>

          {/* ── BODY ── */}
          <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>

            {/* ── SERVICE ROW ── */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                {serviceLabel}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* Download icon */}
                {!isPdfMode && (
                  <Box
                    onClick={!downloading ? handleDownloadPDF : undefined}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: downloading ? "not-allowed" : "pointer",
                      opacity: downloading ? 0.6 : 1,
                      transition: "opacity 0.2s",
                      "&:hover": { opacity: downloading ? 0.6 : 0.7 },
                    }}
                  >
                    {downloading ? (
                      <CircularProgress size={16} sx={{ color: "#6b7280" }} />
                    ) : (
                      <DownloadIcon sx={{ fontSize: 18, color: "#6b7280" }} />
                    )}
                  </Box>
                )}

                {/* Need Help */}
                {/* <Box
                  onClick={() => router.push("/support")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <HeadsetMicOutlinedIcon sx={{ fontSize: 14, color: "#6b7280", flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 13, color: "#6b7280" }}>Need Help?</Typography>
                </Box> */}
              </Box>
            </Box>

            {/* ── BILLER INFO CARD ── */}
            <Box
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                p: 1.5,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1,
                mb: 2,
                background: "#fff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box
                  component="img"
                  src={billerLogo}
                  alt={biller_name}
                  sx={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                    flexShrink: 0,
                    mt: 0.3,
                  }}
                />
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#111", lineHeight: 1.4 }}>
                    {biller_name || "—"}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#6b7280", mt: 0.3 }}>
                    {date}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                {displayAmount && (
                  <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#111" }}>
                    ₹{displayAmount}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    justifyContent: "flex-end",
                    mt: 0.4,
                  }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#16a34a",
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>
                    Success
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ── PAYMENT INFORMATION ── */}
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                Payment Information
              </Typography>
              {/* <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src="/utility/bbpsassuredlogo.svg"
                  alt="BBPS"
                  sx={{ width: 34, height: 34, objectFit: "contain" }}
                />
              </Box> */}
            </Box>

            <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 0.3 }}>
              Paid From
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#111", mb: 1.5, textTransform: "uppercase" }}>
              Wallet
            </Typography>

            {ref_id && (
              <>
                <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 0.3 }}>
                  Reference ID
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 14, color: "#111", wordBreak: "break-all", pr: 1 }}>
                    {ref_id}
                  </Typography>
                  <CopyButton
                    text={ref_id}
                    copied={copiedRef}
                    type="ref"
                    onCopy={handleCopy}
                  />
                </Box>
              </>
            )}

            <Divider />

            {/* ── BACK TO HOME ── */}
            {!isPdfMode && (
              <Box sx={{ textAlign: "center", mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                {/* <Typography
                  onClick={() => router.push("/billers")}
                  sx={{
                    fontSize: 14,
                    color: "#16a34a",
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Pay Another Bill
                </Typography> */}
                <Typography
                  onClick={() => router.push("/")}
                  sx={{
                    fontSize: 13,
                    color: "#6b7280",
                    cursor: "pointer",
                    "&:hover": { color: "#374151" },
                  }}
                >
                  Back to Home
                </Typography>
              </Box>
            )}

          </Box>
        </Box>
        {/* end billCardRef */}

      </Box>
    </Box>
  );
}