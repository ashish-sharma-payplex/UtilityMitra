// src/components/RefundPolicy/index.jsx
import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function RefundPolicy() {
  return (
    <Box sx={{ maxWidth: "1280px", margin: "0 auto", padding: "20px", fontFamily: "Inter" }}>
      {/* Page Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: "30px",
          lineHeight: "43px",
          textAlign: "center",
          mb: 3,
          color: "#5F5F5F",
        }}
      >
        Refund Policy
      </Typography>

      {/* Subheading */}
      <Typography sx={{ fontWeight: 600, fontSize: "18px", mb: 1 }}>
        Utility Mitra Refund Policy
      </Typography>

      {/* Intro */}
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 2, lineHeight: "20px" }}>
        At Utility Mitra, we are committed to providing a seamless and transparent experience for all your prepaid recharge and bill payment needs. Please read our refund policy carefully:
      </Typography>

      {/* Section 1 */}
      <Typography sx={{ fontWeight: 600, fontSize: "18px", mt: 2 }}>
        1. Incorrect Mobile Number Recharge
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 2 }}>
        If you accidentally recharge an incorrect mobile number and the transaction status is marked as successful, we regret that we cannot process a refund in such cases. We advise all users to verify the mobile number carefully before confirming any transaction.
      </Typography>

      {/* Section 2 */}
      <Typography sx={{ fontWeight: 600, fontSize: "18px", mt: 2 }}>
        2. Recharge and Bill Payment Failures
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 1 }}>
        In the event of a failed recharge or bill payment (where payment is deducted but the service is not activated), we offer two refund options:
      </Typography>

      <Box sx={{ pl: 3, mb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          Refund to Original Payment Source:
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 1 }}>
          The amount will be credited back to your original payment method (UPI, debit card, credit card, net banking, etc.) within 7 working days.
        </Typography>

        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          Refund to RechargeMojo Wallet:
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: "16px" }}>
          The refund is processed instantly and can be used for future mobile, DTH, or bill payments on our platform.
        </Typography>
      </Box>

      {/* Section 3 */}
      <Typography sx={{ fontWeight: 600, fontSize: "18px", mt: 2 }}>
        How to Request a Refund
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 1 }}>
        Go to your Order History, select your failed transaction, and click the ‘Refund’ button against it. Then, choose your preferred refund option. The refund will be processed as per the selected mode.
      </Typography>

      {/* Section 4 */}
      <Typography sx={{ fontWeight: 600, fontSize: "18px", mt: 2 }}>
        3. Support for Recharge and Bill Payment Issues
      </Typography>
      <Typography sx={{ fontWeight: 700, fontSize: "16px", mb: 1 }}>
        Service Not Activated:
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 1 }}>
        If your transaction is marked as successful but the service hasn’t been activated, please contact our support team immediately.
      </Typography>

      <Typography sx={{ fontWeight: 700, fontSize: "16px", mb: 1 }}>
        Raise a Support Ticket:
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 1 }}>
        Use the Help & Support section on our app or website to raise a ticket for any transaction-related issues.
      </Typography>

      <Typography sx={{ fontWeight: 700, fontSize: "16px", mb: 1 }}>
        Email Support:
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 1 }}>
        You can also reach us at{" "}
        <Link href="mailto:contact@utilitymitra.com" sx={{ color: "#1D4ED8" }}>
          contact@utilitymitra.com
        </Link>
      </Typography>

      <Typography sx={{ fontWeight: 700, fontSize: "16px", mb: 1 }}>
        Level 2 Escalation:
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 2 }}>
        For unresolved concerns, escalate the matter to{" "}
        <Link href="mailto:disputes@utilitymitra.com" sx={{ color: "#1D4ED8" }}>
          disputes@utilitymitra.com
        </Link>
      </Typography>

      {/* Note */}
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 2 }}>
        Note: RechargeMojo acts as a facilitator between customers and telecom/DTH operators. While we strive for prompt resolutions, certain delays or failures may occur due to technical issues or third-party systems.
      </Typography>

      {/* Closing */}
      <Typography sx={{ fontWeight: 400, fontSize: "16px", mb: 2 }}>
        We appreciate your trust and cooperation. For any queries or assistance regarding our refund policy, feel free to connect with our support team.
      </Typography>

      <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
        Thank you for choosing UtilityMitra!
      </Typography>
    </Box>
  );
}