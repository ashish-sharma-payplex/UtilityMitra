// pages/terms/index.js
import React from "react";

const TermsConditions = () => {
  return (
    <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '40px 20px', backgroundColor: '#fff' }}>
      {/* Heading */}
      <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '600', color: '#5F5F5F', marginBottom: '40px' }}>
        Terms & Conditions
      </h1>

      {/* Section 1 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>1. Introduction</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        These Terms and Conditions ("Terms") govern your access and use of the Utility Mitra website (www.utilitymitra.com) 
        and its associated web application (the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms. 
        If you do not agree to all of these Terms, you are not authorized to use the Platform.
      </p>

      {/* Section 2 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>2. Definitions</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        "We" / "Us" / "Our" / "Company" refers to Utility Mitra and its affiliates. "Visitor"/ "User" refers to you, 
        the person accessing or using the Platform. "Credits" refers to the virtual currency purchased on the Platform for use towards recharges and bill payments.
      </p>

      {/* Section 3 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>3. Use of Content</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        All content on the Platform, including logos, brands, marks, headings, labels, names, and designs, is the property of Utility Mitra or its licensors. 
        You may not use this content without our written permission.
      </p>

      {/* Section 4 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>4. Security Rules</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        You are prohibited from violating the security of the Platform. This includes accessing unauthorized data or accounts, attempting to breach security measures, 
        interfering with the Platform's services, or sending unsolicited emails. Violations may result in civil or criminal liability.
      </p>

      {/* Section 5 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>5. General Rules</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        You may not use the Platform to transmit or store any content that is illegal, violates any law, infringes intellectual property rights, violates privacy rights, 
        or is defamatory, obscene, threatening, or hateful.
      </p>

      {/* Section 6 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>6. Indemnity</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        You agree to indemnify and hold harmless Utility Mitra, its officers, directors, employees, and agents from any claims, actions, or liabilities arising from your use of the Platform or breach of these Terms.
      </p>

      {/* Section 7 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>7. Limitation of Liability</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        Utility Mitra shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from your use of the Platform. 
        Our total liability will not exceed the amount you paid to use the Platform, if any.
      </p>

      {/* Section 8 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>8. Refunds</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        In the event of a failed recharge or bill payment, unused Credits will be automatically refunded to your wallet and can be used for future transactions.
      </p>

      {/* Section 9 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#5F5F5F', marginTop: '20px' }}>9. Contact Us</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#5F5F5F' }}>
        If you have any questions about these Terms, please contact us at <a href="mailto:support@utilitymitra.com" style={{ color: 'blue', textDecoration: 'underline' }}>support@utilitymitra.com</a>.
      </p>

      {/* Add more sections below as per your PDF content */}
    </div>
  );
};

export default TermsConditions;