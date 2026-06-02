// pages/terms/index.js

import Head from "next/head";

export default function TermsConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Utility Mitra</title>
      </Head>

      {/* Same Privacy Policy Wrapper Pattern with Inter Font */}
      <div
        className="w-full py-6 md:py-8"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-5">

          {/* Heading */}
          <h1 className="text-center text-[22px] md:text-[24px] font-semibold text-[#5B5B5B] mb-5">
            Terms & Conditions
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-[#D6D6D6] mb-5"></div>

          {/* Content Wrapper */}
          <div className="text-[14px] leading-6 text-[#6A6A6A]">

            {/* Section 1 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              1. Introduction
            </h2>
            <p className="mb-5">
              These Terms and Conditions ('Terms') govern your access and use of the Utility mitra website (www.utilitymitra.com) 
              and its associated WEB application (the 'Platform'). By accessing or using the Platform, you agree to be bound by these Terms. 
              If you do not agree to all of these Terms, you are not authorized to use the Platform.
            </p>

            {/* Section 2 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              2. Definitions
            </h2>
            <p className="mb-5">
              "We" / "Us" / "Our" / "Company" refers to Utility Mitra and its affiliates. "Visitor"/ "User" refers to you, 
              the person accessing or using the Platform. "Credits" refers to the virtual currency purchased on the Platform for use towards recharges and bill payments.
            </p>

            {/* Section 3 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              3. Use of Content
            </h2>
            <p className="mb-5">
              All content on the Platform, including logos, brands, marks, headings, labels, names, and designs, is the property of Utility Mitra or its licensors. 
              You may not use this content without our written permission.
            </p>

            {/* Section 4 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              4. Security Rules
            </h2>
            <p className="mb-5">
              You are prohibited from violating the security of the Platform. This includes activities such as accessing unauthorized data or accounts, attempting 
              to breach security measures, interfering with the Platform's services, or sending unsolicited emails. Violations of security may result in civil or 
              criminal liability.
            </p>

            {/* Section 5 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              5. General Rules
            </h2>
            <p className="mb-5">
              You may not use the Platform to transmit or store any content that is illegal, violates any law or regulation, infringes on intellectual property rights, 
              violates privacy rights, or is libelous, defamatory, pornographic, obscene, threatening, abusive, or hateful.
            </p>

            {/* Section 6 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              6. Indemnity
            </h2>
            <p className="mb-5">
              You agree to indemnify and hold harmless Utility Mitra, its officers, directors, employees, and agents from any claims, actions, or liabilities arising 
              from your use of the Platform or breach of these Terms.
            </p>

            {/* Section 7 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              7. Limitation of Liability
            </h2>
            <p className="mb-5">
              Utility Mitra shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from your use of the 
              Platform, including inability to use the Platform, cost of substitute services, errors, interruptions, unauthorized access to your data, or statements 
              or conduct of third-party users. Our total liability to you for all damages or losses will not exceed the amount you paid to use the Platform, if any.
            </p>

            {/* Section 8 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              8. Disclaimer of Consequential Damages
            </h2>
            <p className="mb-5">
              Utility Mitra and its associated entities shall not be liable for any consequential damages, including lost profits, data loss, or business interruption, 
              arising from your use of the Platform.
            </p>

            {/* Section 9 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              9. Processing Fees and Credits
            </h2>
            <p className="mb-5">
              Utility Mitra may charge convenience fees for certain recharges and transaction fees for using the Platform. These fees may change without notice. 
              Credits purchased on the Platform are used for recharges and bill payments. You are responsible for all charges associated with your use of the Platform.
            </p>

            {/* Section 10 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              10. Refunds
            </h2>
            <p className="mb-5">
              In the event of a failed recharge or bill payment, the unused Credits will be automatically refunded to your wallet. These refunded Credits can be 
              used for future transactions on the Platform.
            </p>

            {/* Section 11 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              11. Recharge Offers/Plans
            </h2>
            <p className="mb-4">
              Utility Mitra strives to provide accurate recharge offers and plans. However, you are responsible for verifying the offer/plan with the respective 
              operator before making a recharge.
            </p>
            <p className="mb-5">
              Utility Mitra will not be held responsible for wrong recharges due to incorrect offers/plans, and no refund will be provided in such cases.
            </p>

            {/* Section 12 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              12. Updates to Terms and Conditions
            </h2>
            <p className="mb-5">
              We may update these Terms at any time. You are advised to periodically review the Terms for any changes. Your continued use of the Platform after 
              any changes constitutes your acceptance of the new Terms.
            </p>

            {/* Section 13 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              13. Governing Law
            </h2>
            <p className="mb-5">
              These Terms shall be governed by and construed in accordance with the laws of India.
            </p>

            {/* Section 14 */}
            <h2 className="font-bold text-[16px] text-[#555555] mb-3">
              14. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at{" "}
              <a 
                href="mailto:support@utilitymitra.com" 
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                support@utilitymitra.com
              </a>. By using the Platform, you acknowledge that you have read and understood these Terms and agree to be bound by them.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
