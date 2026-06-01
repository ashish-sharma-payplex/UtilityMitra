import Head from "next/head";
import { useState } from "react";

export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });


const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  } else if (formData.name.trim().length < 2) {
    newErrors.name = "Name must be at least 2 characters";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
  }

  if (formData.phone.trim()) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
  }

  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    console.log("Form submitted");
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Add your form submission logic here
//   };

  return (
    <>
      <Head>
        <title>Contact Us | UtilityMitra</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="contact-page">
        {/* ── Top Section ── */}
        <div className="contact-container">

          {/* ── Header ── */}
          <div className="contact-header">
            <p className="contact-label">Get Started</p>
            <h1 className="contact-heading">
              Get in touch with us. We're here to assist you.
            </h1>
          </div>

          {/* ── Input Area ── */}
          <div className="contact-input-area">
            <form onSubmit={handleSubmit} className="contact-form">

              {/* Row 1: Name, Email, Phone */}
              <div className="contact-row">
                <div className="input-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
                <div className="input-field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Row 2: Message */}
              <div className="input-field-message">
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input contact-textarea"
                />
              </div>

              {/* Submit Button */}
<button type="submit" className="contact-cta">
  <span>Leave us a Message</span>

  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>
            </form>
          </div>
        </div>

        {/* ── Bottom Contact Info Section ── */}
        <div className="contact-info-section">

          {/* Left Header */}
          <div className="info-header">
            <p className="info-label">Contact Info</p>
            <h2 className="info-heading">We are always happy to assist you</h2>
          </div>

          {/* Right Info Cards */}
          <div className="info-cards">

            {/* Email */}
            <div className="info-card">
              <div className="info-card-heading">
                <span className="info-card-title">Email Address</span>
                <div className="info-divider" />
              </div>
              <div className="info-card-details">
                <p className="info-card-value">info@utilitymitra.com</p>
                <p className="info-card-sub">
                  Assistance hours:
                  <br />
                  Monday – Friday
                  <br />
                  6 am to 8 pm EST
                </p>
              </div>
            </div>

            {/* Number */}
            <div className="info-card">
              <div className="info-card-heading">
                <span className="info-card-title">Number</span>
                <div className="info-divider" />
              </div>
              <div className="info-card-details">
                <p className="info-card-value">+91 8529637410</p>
              </div>
            </div>

            {/* Location */}
            <div className="info-card">
              <div className="info-card-heading">
                <span className="info-card-title">Locations</span>
                <div className="info-divider" />
              </div>
              <div className="info-card-details">
                <p className="info-card-sub">
                  2nd Floor, Shree Tower, Main Road,
                  <br />
                  Harmu Chowk, Ranchi,
                  <br />
                  Jharkhand – 834002, India
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      
<style jsx>{`
  .contact-page {
    font-family: 'Inter', sans-serif;
    background: #ffffff;
    min-height: 100vh;
  }

  /* ── Top Container ── */
  .contact-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 120px;
    gap: 80px;
    background: #ffffff;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .contact-header {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
  }

  .contact-label {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    color: #000000;
    margin: 0;
  }

  .contact-heading {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 60px;
    line-height: 72px;
    color: #434343;
    margin: 0;
    max-width: 905px;
  }

  /* ── Input Area ── */
  .contact-input-area {
    width: 100%;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 48px;
    width: 100%;
  }

  /* Row with 3 inputs */
  .contact-row {
    display: flex;
    flex-direction: row;
    gap: 32px;
    width: 100%;
  }

  .input-field {
    flex: 1.5;
    border-bottom: 1px solid #cacaca;
    padding: 10px 10px 32px;
  }

  .input-field-message {
    width: 100%;
    border-bottom: 1px solid #cacaca;
    padding: 10px 10px 32px;
  }

  .contact-input {
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 36px;
    color: #000000;
    background: transparent;
  }

  .contact-input::placeholder {
    color: #000000;
    opacity: 0.5;
  }

  .contact-textarea {
    resize: none;
    min-height: 100px;
  }

  /* CTA Button */
  .contact-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 18px 28px;
    width: fit-content;
    height: auto;
    background: #032267;
    border-radius: 37px;
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    white-space: nowrap;
    transition: background 0.2s ease;
  }

  .contact-cta:hover {
    background: #021a50;
  }

  .contact-info-section {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 80px 120px;
    gap: 69px;
    max-width: 1440px;
    min-height: 454px;
    margin: 0 auto;
    background: #f5f7fa;
    box-sizing: border-box;
  }

  .info-header {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 230px;
    flex-shrink: 0;
  }

  .info-label {
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    color: #000;
    margin: 0;
  }

  .info-heading {
    font-weight: 600;
    font-size: 32px;
    line-height: 130%;
    color: #434343;
    width: 232px;
    margin: 0;
  }

  .info-cards {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    width: 951px;
    flex-shrink: 0;
  }

  .info-card {
    display: flex;
    flex-direction: column;
    padding: 32px;
    gap: 27px;
    box-sizing: border-box;
  }

  .info-card:nth-child(1) {
    width: 292px;
  }

  .info-card:nth-child(2) {
    width: 237px;
  }

  .info-card:nth-child(3) {
    width: 374px;
  }

  .info-card-heading {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .info-card-title {
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    color: #000;
  }

  .info-divider {
    width: 27px;
    height: 3px;
    background: #000;
  }

  .info-card-details {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .info-card-value {
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    color: #000;
    margin: 0;
  }

  .info-card-sub {
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: #000;
    margin: 0;
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .contact-info-section {
      flex-direction: column;
      padding: 60px 30px;
    }

    .info-cards {
      width: 100%;
      flex-wrap: wrap;
    }

    .info-card:nth-child(1),
    .info-card:nth-child(2),
    .info-card:nth-child(3) {
      width: auto;
      flex: 1 1 300px;
    }
  }

  @media (max-width: 768px) {
    .contact-info-section {
      padding: 40px 20px;
    }

    .info-cards {
      flex-direction: column;
      gap: 20px;
    }

    .info-card {
      width: 100% !important;
      padding: 20px;
    }

    .info-heading {
      width: 100%;
    }
  }
`}</style>
    </>
  );
}