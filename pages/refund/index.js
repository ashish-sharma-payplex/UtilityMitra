
// src/components/RefundPolicy/index.jsx
import React from "react";
import Head from "next/head";

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund Policy | Utility Mitra</title>
      </Head>

      {/* Same Privacy Policy / Terms Wrapper Pattern with Inter Font */}
      <div
        className="w-full py-6 md:py-8"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-5">

          {/* Page Heading */}
          <h1 className="text-center text-[22px] md:text-[24px] font-semibold text-[#5B5B5B] mb-5">
            Refund Policy
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-[#D6D6D6] mb-5"></div>

          {/* Content Wrapper aligned with image_8c5241.png formatting */}
          <div className="text-[14px] leading-6 text-[#6A6A6A]">

            {/* Subheading */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              Utility Mitra Refund Policy
            </h2>

            {/* Intro */}
            <p className="mb-5">
              At <strong>Utility Mitra</strong>, we are committed to providing a seamless and transparent experience for all your prepaid recharge and bill payment needs. Please read our refund policy carefully:
            </p>

            {/* Section 1 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              1. Incorrect Mobile Number Recharge
            </h2>
            <p className="mb-5">
              If you accidentally recharge an incorrect mobile number and the transaction status is marked as <strong>successful</strong>, we regret that we cannot process a refund in such cases. We advise all users to <strong>verify the mobile number carefully</strong> before confirming any transaction.
            </p>

            {/* Section 2 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              2. Recharge and Bill Payment Failures
            </h2>
            <p className="mb-3">
              In the event of a <strong>failed recharge or bill payment</strong> (where payment is deducted but the service is not activated), we offer two refund options:
            </p>

            {/* Bullet list matched perfectly with image_8c5241.png */}
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                <strong>Refund to Original Payment Source:</strong> The amount will be credited back to your original payment method (UPI, debit card, credit card, net banking, etc.) within <strong>7 working days</strong>.
              </li>
              <li>
                <strong>Refund to RechargeMojo Wallet:</strong> The refund is processed <strong>instantly</strong> and can be used for future <strong>mobile, DTH, or bill payments</strong> on our platform.
              </li>
            </ul>

            {/* How to Request Section formatted inline like the image */}
            <p className="mb-5">
              <strong>How to Request a Refund:</strong> Go to your <span className="text-blue-600 cursor-pointer hover:underline">Order History</span>, select your failed transaction, and click the <strong>‘Refund’</strong> button against it. Then, choose your preferred refund option. The refund will be processed as per the selected mode.
            </p>

            {/* Section 3 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              3. Support for Recharge and Bill Payment Issues
            </h2>
            
            <p className="mb-3">
              <strong>Service Not Activated:</strong> If your transaction is marked as <strong>successful</strong> but the service hasn’t been activated, please contact our support team immediately.
            </p>

            <p className="mb-3">
              <strong>Raise a Support Ticket:</strong> Use the <strong>Help & Support</strong> section on our app or website to raise a ticket for any transaction-related issues.
            </p>

            <p className="mb-5">
              <strong>Email Support:</strong> You can also reach us at{" "}
              <a 
                href="mailto:contact@utilitymitra.com" 
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                contact@utilitymitra.com
              </a>
            </p>

            {/* Level 2 Escalation */}
            <p className="mb-5">
              <strong>Level 2 Escalation:</strong> For unresolved concerns, escalate the matter to{" "}
              <a 
                href="mailto:disputes@utilitymitra.com" 
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                disputes@utilitymitra.com
              </a>
            </p>

            {/* Note */}
            <p className="mb-5 text-[13px] italic text-[#7A7A7A]">
              <strong>Note:</strong> RechargeMojo acts as a facilitator between customers and telecom/DTH operators. While we strive for prompt resolutions, certain delays or failures may occur due to technical issues or third-party systems.
            </p>

            {/* Closing */}
            <p className="mb-4">
              We appreciate your trust and cooperation. For any queries or assistance regarding our refund policy, feel free to connect with our support team.
            </p>

            <p className="font-bold text-[#555555]">
              Thank you for choosing UtilityMitra!
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
