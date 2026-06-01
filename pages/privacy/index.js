// // pages/privacy/index.js
// import React from 'react';

// const PrivacyPolicy = () => {
//   return (
//     <div className="privacy-policy-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px' }}>
//       <div style={{ lineHeight: '1.6', fontSize: '16px', color: '#222' }}>
//         <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Privacy Policy</h1>
//         <p><strong>Last updated May 30, 2026</strong></p>
//         <p>
//           This privacy notice for Utility Mitra Private Limited (“Company,” “we,” “us,” or “our”) describes how and why we might collect, store, use, and/or share (“process”) your information when you use our services (“Services”).
//         </p>

//         <h2>1. What information do we collect?</h2>
//         <ul>
//           <li>Names</li>
//           <li>Phone numbers</li>
//           <li>Email addresses</li>
//           <li>Payment details</li>
//         </ul>

//         <h2>2. How do we process your information?</h2>
//         <p>We process your information to provide, improve, and administer our Services, communicate with you, ensure security, and comply with applicable law.</p>

//         <h2>3. When and with whom do we share your personal information?</h2>
//         <p>We may share data with vendors, consultants, service providers, or in cases of business transfers. We also share information to comply with legal obligations.</p>

//         <h2>4. Cookies and tracking technologies</h2>
//         <p>We may use cookies and similar technologies to collect and store your information for analytics and personalized experiences.</p>

//         <h2>5. Data retention</h2>
//         <p>We retain your information only as long as necessary to fulfill the purposes outlined in this privacy notice or as required by law.</p>

//         <h2>6. Security of your information</h2>
//         <p>We implement reasonable technical and organizational measures to protect your personal data, but no system can be 100% secure.</p>

//         <h2>7. Your privacy rights</h2>
//         <p>You may review, change, or terminate your account at any time. For residents of the EEA or UK, you may complain to local authorities. You may also withdraw consent for processing or opt-out of marketing communications.</p>

//         <h2>8. Do-not-track features</h2>
//         <p>We do not currently respond to browser DNT signals, but will update our practices if standards are finalized.</p>

//         <h2>9. Updates to this notice</h2>
//         <p>We may update this Privacy Policy as necessary and encourage you to review it periodically.</p>

//         <h2>10. Contact Us</h2>
//         <p>
//           Questions or concerns? Email us at <a href="mailto:support@utilitymitra.com">support@utilitymitra.com</a> or by post:
//           <br/>
//           Utility Mitra Private Limited
//           <br/>
//           1029, 10th Floor, Regus, Tower B, Unitech Cyber Park, Sector 39, Pune, Maharashtra 122001, India
//         </p>

//         <h2>11. Reviewing or deleting your data</h2>
//         <p>You may request access, updates, or deletion of your personal data via our website: <a href="https://utilitymitra.com">https://utilitymitra.com</a></p>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;


// pages/privacy/index.js
import React from "react";
// import privacyImage from "@/public/your-image.png"; // Optional top image

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px", lineHeight: "1.6", fontSize: "16px", color: "#222" }}>
      


      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}>
        Privacy Policy
      </h1>
      <p><strong>Last updated May 30, 2026</strong></p>

      {/* Intro */}
      <p>
        This privacy notice for Utility Mitra Private Limited (“Company,” “we,” “us,” or “our”) describes how and why we might collect, store, use, and/or share (“process”) your information when you use our services (“Services”), including when you visit our website at https://utilitymitra.com.
      </p>

      {/* Section 1 */}
      <h2>1. What information do we collect?</h2>
      <p>We collect personal information you provide voluntarily when you register or interact with our Services. This may include:</p>
      <ul>
        <li>Names</li>
        <li>Phone numbers</li>
        <li>Email addresses</li>
        <li>Payment details</li>
      </ul>

      {/* Section 2 */}
      <h2>2. How do we process your information?</h2>
      <p>We process your information to provide, improve, and administer our Services, communicate with you, ensure security, and comply with applicable law.</p>

      {/* Section 3 */}
      <h2>3. When and with whom do we share your personal information?</h2>
      <p>We may share data with vendors, consultants, service providers, or in cases of business transfers. We also share information to comply with legal obligations.</p>

      {/* Section 4 */}
      <h2>4. Cookies and tracking technologies</h2>
      <p>We may use cookies and similar technologies to collect and store your information for analytics and personalized experiences.</p>

      {/* Section 5 */}
      <h2>5. Data retention</h2>
      <p>We retain your information only as long as necessary to fulfill the purposes outlined in this privacy notice or as required by law.</p>

      {/* Section 6 */}
      <h2>6. Security of your information</h2>
      <p>We implement reasonable technical and organizational measures to protect your personal data, but no system can be 100% secure.</p>

      {/* Section 7 */}
      <h2>7. Your privacy rights</h2>
      <p>You may review, change, or terminate your account at any time. For residents of the EEA or UK, you may complain to local authorities. You may also withdraw consent for processing or opt-out of marketing communications.</p>

      {/* Section 8 */}
      <h2>8. Do-not-track features</h2>
      <p>We do not currently respond to browser DNT signals, but will update our practices if standards are finalized.</p>

      {/* Section 9 */}
      <h2>9. Updates to this notice</h2>
      <p>We may update this Privacy Policy as necessary and encourage you to review it periodically.</p>

      {/* Section 10 */}
      <h2>10. Contact Us</h2>
      <p>
        Questions or concerns? Email us at <a href="mailto:support@utilitymitra.com">support@utilitymitra.com</a> or by post:
        <br/>
        Utility Mitra Private Limited
        <br/>
        1029, 10th Floor, Regus, Tower B, Unitech Cyber Park, Sector 39, Pune, Maharashtra 122001, India
      </p>

      {/* Section 11 */}
      <h2>11. Reviewing or deleting your data</h2>
      <p>You may request access, updates, or deletion of your personal data via our website: <a href="https://utilitymitra.com">https://utilitymitra.com</a></p>
    </div>
  );
};

export default PrivacyPolicy;