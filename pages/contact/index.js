import Head from "next/head";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_1hg7btn";
const EMAILJS_TEMPLATE_ID = "template_czyto8h";
const EMAILJS_PUBLIC_KEY = "ASXu01Vz69rgsdShX";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const newErrors = {};

    // Name — no digits allowed, no leading spaces, min 2 chars
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email — strict regex, no leading spaces
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Enter a valid email address";
      }
    }

    // Phone — exactly 10 digits (we store without +91 prefix)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      }
    }

    // Message — required, no leading spaces
    if (!formData.message || !formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          phone: formData.phone.trim() ? `+91 ${formData.phone.trim()}` : "Not provided",
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let sanitized = value.startsWith(" ") ? value.trimStart() : value;

    // Name field — block digit input in real time
    if (name === "name") {
      sanitized = sanitized.replace(/[0-9]/g, "");
    }

    // Phone field — only allow digits, max 10
    if (name === "phone") {
      sanitized = sanitized.replace(/[^0-9]/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: sanitized });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

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

          <div className="contact-header">
            <p className="contact-label">Get Started</p>
            <h1 className="contact-heading">
              Get in touch with us. We're here to assist you.
            </h1>
          </div>

          <div className="contact-input-area">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>

              <div className="contact-row">

                <div className="input-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`contact-input ${errors.name ? "input-error" : ""}`}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="input-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`contact-input ${errors.email ? "input-error" : ""}`}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Phone with static +91 prefix */}
                <div className="input-field">
                  <div className="phone-wrapper">
                    <span className="phone-prefix">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      className={`contact-input phone-input ${errors.phone ? "input-error" : ""}`}
                    />
                  </div>
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

              </div>

              <div className={`input-field-message ${errors.message ? "input-field-message-error" : ""}`}>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input contact-textarea"
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              {status === "success" && (
                <div className="status-banner success-banner">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="status-banner error-banner">
                  ❌ Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                className="contact-cta"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Leave us a Message</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* ── Bottom Contact Info Section ── */}
        <div className="contact-info-section">

          <div className="info-header">
            <p className="info-label">Contact Info</p>
            <h2 className="info-heading">We are always happy to assist you</h2>
          </div>

          <div className="info-cards">

            <div className="info-card">
              <div className="info-card-heading">
                <span className="info-card-title">Email Address</span>
                <div className="info-divider" />
              </div>
              <div className="info-card-details">
                <p className="info-card-value">info@utilitymitra.com</p>
                <p className="info-card-sub">
                  Assistance hours:<br />
                  Monday – Friday 6 am to 8 pm EST
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-heading">
                <span className="info-card-title">Number</span>
                <div className="info-divider" />
              </div>
              <div className="info-card-details">
                <p className="info-card-value">+91 8529637410</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-heading">
                <span className="info-card-title">Locations</span>
                <div className="info-divider" />
              </div>
              <div className="info-card-details">
                <p className="info-card-sub">
                  2nd Floor, Shree Tower, Main Road,<br />
                  Harmu Chowk, Ranchi,<br />
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
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .contact-header {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .contact-label {
          font-weight: 400;
          font-size: 24px;
          line-height: 36px;
          color: #000000;
          margin: 0;
        }

        .contact-heading {
          font-weight: 600;
          font-size: 50px;
          line-height: 72px;
          color: #434343;
          margin: 0;
          max-width: 905px;
        }

        .contact-input-area {
          width: 100%;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 48px;
          width: 100%;
        }

        .contact-row {
          display: flex;
          flex-direction: row;
          gap: 32px;
          width: 100%;
        }

        .input-field {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #cacaca;
          padding: 10px 10px 12px;
        }

        .input-field-message {
          width: 100%;
          border-bottom: 1px solid #cacaca;
          padding: 10px 10px 12px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .input-field-message-error {
          border-bottom: 1px solid #e53e3e;
        }

        /* Phone wrapper with static +91 */
        .phone-wrapper {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
        }

        .phone-prefix {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 20px;
          line-height: 36px;
          color: #000000;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .phone-input {
          flex: 1;
          min-width: 0;
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
          box-sizing: border-box;
        }

        .contact-input::placeholder {
          color: #000000;
          opacity: 0.5;
        }

        .contact-textarea {
          resize: none;
          min-height: 100px;
        }

        // .input-error {
        //   border-bottom: 1px solid #e53e3e;
        // }

        .error-text {
          font-size: 13px;
          color: #e53e3e;
          margin-top: 6px;
        }

        .status-banner {
          padding: 14px 20px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
        }

        .success-banner {
          background: #f0fff4;
          color: #276749;
          border: 1px solid #9ae6b4;
        }

        .error-banner {
          background: #fff5f5;
          color: #c53030;
          border: 1px solid #feb2b2;
        }

        .contact-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 18px 28px;
          width: fit-content;
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
          transition: background 0.2s ease, opacity 0.2s ease;
        }

        .contact-cta:hover {
          background: #021a50;
        }

        .contact-cta:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* ── Bottom Info Section ── */
        .contact-info-section {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 72px 120px;
          gap: 80px;
          width: 100%;
          min-height: 300px;
          background-color: #e8e8e8;
          background-image: url('/topo-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-sizing: border-box;
        }

        .info-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 200px;
          flex-shrink: 0;
        }

        .info-label {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #444;
          margin: 0;
        }

        .info-heading {
          font-weight: 700;
          font-size: 28px;
          line-height: 36px;
          color: #111;
          margin: 0;
        }

        .info-cards {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 48px;
          flex: 1;
        }

        .info-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
        }

        .info-card-heading {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-card-title {
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: #111;
        }

        .info-divider {
          width: 24px;
          height: 2px;
          background: #111;
        }

        .info-card-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-card-value {
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #111;
          margin: 0;
        }

        .info-card-sub {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #333;
          margin: 0;
        }

        /* ── Tablet: 1100px ── */
        @media (max-width: 1100px) {
          .contact-container {
            padding: 60px 48px;
            gap: 60px;
          }

          .contact-heading {
            font-size: 44px;
            line-height: 56px;
          }

          .contact-info-section {
            flex-direction: column;
            padding: 60px 48px;
            gap: 40px;
            min-height: unset;
          }

          .info-header {
            width: 100%;
          }

          .info-heading {
            font-size: 24px;
            width: 100%;
          }

          .info-cards {
            width: 100%;
            flex-wrap: wrap;
            gap: 32px;
          }

          .info-card {
            flex: 1 1 200px;
          }
        }

        /* ── Mobile: 768px ── */
        @media (max-width: 768px) {
          .contact-container {
            padding: 32px 20px;
            gap: 28px;
          }

          .contact-label {
            font-size: 14px;
            line-height: 20px;
          }

          .contact-heading {
            font-size: 24px;
            line-height: 34px;
          }

          .contact-header {
            gap: 8px;
          }

          .contact-row {
            flex-direction: column;
            gap: 20px;
          }

          .contact-input {
            font-size: 16px;
            line-height: 28px;
          }

          .phone-prefix {
            font-size: 16px;
            line-height: 28px;
          }

          .contact-form {
            gap: 20px;
          }

          .contact-cta {
            width: 100%;
            justify-content: center;
            font-size: 16px;
            padding: 16px 20px;
          }

          /* Mobile info section — tight equal gaps */
          .contact-info-section {
            flex-direction: column;
            padding: 28px 20px;
            gap: 0;
            min-height: unset;
          }

          .info-header {
            width: 100%;
            margin-bottom: 20px;
          }

          /* Each card same gap between them */
          .info-cards {
            flex-direction: column;
            gap: 0;
            width: 100%;
          }

          .info-card {
            width: 100%;
            gap: 10px;
            padding: 20px 0;
            border-bottom: 1px solid #d0d0d0;
          }

          .info-card:last-child {
            border-bottom: none;
          }

          .info-heading {
            font-size: 18px;
            line-height: 26px;
          }
        }

        /* ── Mobile portrait: 480px ── */
        @media (max-width: 480px) {
          .contact-container {
            padding: 24px 16px;
            gap: 24px;
          }

          .contact-heading {
            font-size: 21px;
            line-height: 30px;
          }

          .contact-label {
            font-size: 13px;
          }

          .contact-input {
            font-size: 15px;
            line-height: 26px;
          }

          .phone-prefix {
            font-size: 15px;
            line-height: 26px;
          }

          .contact-info-section {
            padding: 24px 16px;
          }

          .info-heading {
            font-size: 17px;
          }
        }
      `}</style>
    </>
  );
}