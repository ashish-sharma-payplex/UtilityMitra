import { MainApi } from "@/src/lib/MainApi";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const EyeIcon = ({ open }) =>
  open ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SpinnerIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A914B"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

// ── Shared styles ─────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

  .lm-backdrop {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    animation: lm-fade-in 0.2s ease;
  }
  @keyframes lm-fade-in { from { opacity: 0; } to { opacity: 1; } }

  .lm-box {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 760px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.18);
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
    animation: lm-slide-up 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    flex-direction: row;
  }
  @keyframes lm-slide-up {
    from { opacity: 0; transform: translateY(28px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  /* ── Left image panel ── */
  .lm-image-panel {
    width: 280px;
    flex-shrink: 0;
    background: linear-gradient(160deg, #002970 0%, #1A914B 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    position: relative;
    overflow: hidden;
  }
  .lm-image-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .lm-image-panel img.lm-side-img {
    width: 100%;
    max-width: 240px;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.3));
  }
  .lm-image-panel-tagline {
    margin-top: 20px;
    font-size: 12px;
    color: rgba(255,255,255,0.75);
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.5px;
    position: relative;
    z-index: 1;
  }
  .lm-image-panel-tagline strong {
    display: block;
    font-size: 16px;
    color: #fff;
    font-weight: 800;
    margin-bottom: 4px;
  }

  /* ── Right content panel ── */
  .lm-right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .lm-header {
    // background: linear-gradient(135deg, #252525 0%, #1A914B 100%);
    padding: 0px 24px 0px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .lm-header-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .lm-logo-text { font-weight: 800; font-size: 20px; letter-spacing: -0.5px; color: #fff; }
  .lm-logo-text span { color: #00BAF2; }
  .lm-header-sub { font-size: 11px; color: rgba(255,255,255,0.75); margin-top: 3px; font-weight: 500; }
  .lm-close {
    background: rgba(255,255,255,0.15); border: none; cursor: pointer;
    border-radius: 50%; width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; transition: background 0.2s; flex-shrink: 0;
  }
  .lm-close:hover { background: rgba(255,255,255,0.28); }

  .lm-body { padding: 20px 24px 24px; overflow-y: auto; max-height: 520px; }
  .lm-field { margin-bottom: 14px; }
  .lm-label { display: block; font-size: 12px; font-weight: 600; color: #555; margin-bottom: 6px; letter-spacing: 0.3px; }
  .lm-input-wrap { position: relative; }

  /* +91 prefix styles */
  .lm-mobile-wrap {
    display: flex;
    align-items: center;
    border: 1.5px solid #e0e0e0;
    border-radius: 10px;
    background: #fafafa;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .lm-mobile-wrap:focus-within {
    border-color: #1A914B;
    box-shadow: 0 0 0 3px rgba(26,145,75,0.1);
    background: #fff;
  }
  .lm-mobile-wrap.err { border-color: #e53935; }
  .lm-mobile-wrap.err:focus-within { box-shadow: 0 0 0 3px rgba(229,57,53,0.1); }
  .lm-mobile-prefix {
    padding: 12px 10px 12px 14px;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: #444;
    white-space: nowrap;
    border-right: 1.5px solid #e0e0e0;
    background: #f0f0f0;
    user-select: none;
    flex-shrink: 0;
  }
  .lm-mobile-input {
    flex: 1;
    padding: 12px 14px;
    border: none;
    border-radius: 0;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    color: #111;
    outline: none;
    background: transparent;
    min-width: 0;
  }

  .lm-input {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1.5px solid #e0e0e0;
    font-size: 14px; font-family: 'Montserrat', sans-serif;
    color: #111; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box; background: #fafafa;
  }
  .lm-input:focus {
    border-color: #1A914B;
    box-shadow: 0 0 0 3px rgba(26,145,75,0.1);
    background: #fff;
  }
  .lm-input.err { border-color: #e53935; }
  .lm-input.err:focus { box-shadow: 0 0 0 3px rgba(229,57,53,0.1); }
  .lm-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: #888;
    display: flex; align-items: center; padding: 0; transition: color 0.2s;
  }
  .lm-eye:hover { color: #1A914B; }
  .lm-field-err { font-size: 11.5px; color: #e53935; margin-top: 5px; font-weight: 500; }

  .lm-api-err {
    background: #fff5f5; border: 1px solid #ffcdd2;
    border-radius: 10px; padding: 10px 14px;
    font-size: 12.5px; color: #c62828; font-weight: 500; margin-bottom: 16px;
  }

  .lm-submit {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, #1A914B, #157a3e);
    border: none; border-radius: 50px;
    font-size: 15px; font-weight: 700; color: #fff; cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    transition: opacity 0.2s, transform 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .lm-submit:hover:not(:disabled) { opacity: 0.92; transform: scale(1.01); }
  .lm-submit:disabled { opacity: 0.65; cursor: not-allowed; }

  .lm-footer-note { text-align: center; font-size: 11px; color: #aaa; margin-top: 14px; font-weight: 500; }

  /* Switch link */
  .lm-switch {
    text-align: center; margin-top: 16px;
    font-size: 12.5px; color: #666; font-weight: 500;
  }
  .lm-switch-btn {
    background: none; border: none; cursor: pointer;
    color: #1A914B; font-weight: 700; font-size: 12.5px;
    font-family: 'Montserrat', sans-serif;
    padding: 0; text-decoration: underline;
    transition: color 0.2s;
  }
  .lm-switch-btn:hover { color: #157a3e; }

  /* Success screen */
  .lm-success {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 40px 24px; text-align: center; gap: 12px;
  }
  .lm-success-title { font-size: 18px; font-weight: 800; color: #111; margin: 0; }
  .lm-success-sub { font-size: 13px; color: #666; font-weight: 500; margin: 0; }
  .lm-success-redirect { font-size: 11px; color: #aaa; margin-top: 4px; }

  /* Tab indicator */
  .lm-tabs {
    display: flex; gap: 0;
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 20px;
  }
  .lm-tab {
    flex: 1; padding: 10px; background: none; border: none;
    font-size: 13px; font-weight: 600; cursor: pointer;
    font-family: 'Montserrat', sans-serif; color: #888;
    border-bottom: 2px solid transparent; margin-bottom: -2px;
    transition: color 0.2s, border-color 0.2s;
  }
  .lm-tab.active { color: #1A914B; border-bottom-color: #1A914B; }

  /* Responsive: stack on small screens */
  @media (max-width: 580px) {
    .lm-box { flex-direction: column; max-width: 400px; }
    .lm-image-panel { width: 100%; padding: 24px 16px 20px; flex-direction: row; gap: 16px; }
    .lm-image-panel img.lm-side-img { max-width: 80px; margin-top: 0; }
    .lm-image-panel-tagline { margin-top: 0; text-align: left; }
  }
`;

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  loading,
  error,
  forceOpen = false,
}) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [success, setSuccess] = useState(false); // register success screen

  // Login fields
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // Register fields
  const [rName, setRName] = useState("");
  const [rMobile, setRMobile] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPassword, setRPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [fieldErr, setFieldErr] = useState({});
  const [apiErr, setApiErr] = useState(null);
  const [regLoading, setRegLoading] = useState(false);

  const firstRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !forceOpen) onClose();
    };
    if (isOpen) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [isOpen, onClose, forceOpen]);

  // Focus + reset on open/close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstRef.current?.focus(), 80);
    } else {
      setMode("login");
      setSuccess(false);
      setMobile("");
      setPassword("");
      setRName("");
      setRMobile("");
      setREmail("");
      setRPassword("");
      setShowPass(false);
      setFieldErr({});
      setApiErr(null);
    }
  }, [isOpen]);

  // Reset errors when mode switches
  useEffect(() => {
    setFieldErr({});
    setApiErr(null);
    setShowPass(false);
    setTimeout(() => firstRef.current?.focus(), 80);
  }, [mode]);

  // Escape key
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [isOpen, onClose]);

  // ── Validate login ──────────────────────────────────────────────────────────
  const validateLogin = () => {
    const errs = {};
    if (!mobile.trim()) errs.mobile = "Mobile number required";
    else if (!/^\d{10}$/.test(mobile.trim()))
      errs.mobile = "Enter valid 10-digit mobile";
    if (!password) errs.password = "Password required";
    return errs;
  };

  // ── Validate register ───────────────────────────────────────────────────────
  const validateRegister = () => {
    const errs = {};
    if (!rName.trim()) errs.rName = "Full name required";
    if (!rMobile.trim()) errs.rMobile = "Mobile number required";
    else if (!/^\d{10}$/.test(rMobile.trim()))
      errs.rMobile = "Enter valid 10-digit mobile";
    if (!rEmail.trim()) errs.rEmail = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rEmail.trim()))
      errs.rEmail = "Enter valid email";
    if (!rPassword) errs.rPassword = "Password required";
    else if (rPassword.length < 6) errs.rPassword = "Min 6 characters";
    return errs;
  };

  // ── Login submit ────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validateLogin();
    if (Object.keys(errs).length) {
      setFieldErr(errs);
      return;
    }
    setFieldErr({});
    setApiErr(null);

    const result = await onLogin({ mobile: mobile.trim(), password });

    if (result?.success) {
      toast.success("Login successful");
      onClose();
    } else {
      toast.error(result?.error ?? "Login failed");
      setApiErr(result?.error ?? "Login failed");
    }
  };

  // ── Register submit ─────────────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validateRegister();
    if (Object.keys(errs).length) {
      setFieldErr(errs);
      return;
    }
    setFieldErr({});
    setApiErr(null);
    setRegLoading(true);

    const res = await MainApi("/api/v1/auth/register", {
      method: "POST",
      body: {
        name: rName.trim(),
        mobile: rMobile.trim(),
        email: rEmail.trim(),
        password: rPassword,
      },
    });

    setRegLoading(false);

    if (!res.ok) {
      toast.error(res.error ?? "Registration failed");
      setApiErr(res.error ?? "Registration failed");
      return;
    }

    // Success — show success screen then auto-switch to login
    toast.success("Registration successful 🎉");
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setMode("login");
      // Pre-fill mobile in login
      setMobile(rMobile.trim());
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="lm-backdrop"
        onClick={(e) => {
          if (!forceOpen && e.target === e.currentTarget) onClose();
        }}
      >
        <div className="lm-box">
          {/* ── LEFT IMAGE PANEL ── */}
          <div className="lm-image-panel">
            <img
              src="/logo1.webp"
              alt="UtilityMitra"
              className="lm-side-img"
            />
            <div className="lm-image-panel-tagline">
              <strong>UtilityMitra</strong>
              {mode === "login" ? "Welcome back!" : "Join us today!"}
            </div>
          </div>

          {/* ── RIGHT CONTENT PANEL ── */}
          <div className="lm-right-panel">
            <div className="lm-header">
              {/* <div className="lm-header-inner">
                <img
                  src="/logo2.webp"
                  alt="Dealplex"
                  style={{ width: "64px", height: "auto", objectFit: "cover" }}
                />
                <div className="lm-header-sub">
                  {mode === "login"
                    ? "Sign in to your account"
                    : "Create a new account"}
                </div>
              </div> */}

             
              {!forceOpen && (
                <button className="lm-close" onClick={onClose} aria-label="Close">
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Success Screen */}
            {success ? (
              <div className="lm-success">
                <SuccessIcon />
                <p className="lm-success-title">Account Created! 🎉</p>
                <p className="lm-success-sub">
                  Registration successful. Redirecting to login...
                </p>
                <p className="lm-success-redirect">⏳ Please wait...</p>
              </div>
            ) : (
              <div className="lm-body">
                {/* Tabs */}
                <div className="lm-tabs">
                  <button
                    className={`lm-tab${mode === "login" ? " active" : ""}`}
                    onClick={() => setMode("login")}
                    type="button"
                  >
                    Sign In
                  </button>
                  <button
                    className={`lm-tab${mode === "register" ? " active" : ""}`}
                    onClick={() => setMode("register")}
                    type="button"
                  >
                    Register
                  </button>
                </div>

                {/* API Error */}
                {apiErr && <div className="lm-api-err">⚠ {apiErr}</div>}

                {/* ── LOGIN FORM ── */}
                {mode === "login" && (
                  <form onSubmit={handleLogin} noValidate>
                    {error && !apiErr && (
                      <div className="lm-api-err">⚠ {error}</div>
                    )}

                    <div className="lm-field">
                      <label className="lm-label">Mobile Number</label>
                      {/* +91 prefix wrapper */}
                      <div className={`lm-mobile-wrap${fieldErr.mobile ? " err" : ""}`}>
                        <span className="lm-mobile-prefix">+91</span>
                        <input
                          ref={firstRef}
                          className="lm-mobile-input"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value.replace(/\D/g, ""));
                            setFieldErr((p) => ({ ...p, mobile: undefined }));
                          }}
                          disabled={loading}
                        />
                      </div>
                      {fieldErr.mobile && (
                        <div className="lm-field-err">{fieldErr.mobile}</div>
                      )}
                    </div>

                    <div className="lm-field">
                      <label className="lm-label">Password</label>
                      <div className="lm-input-wrap">
                        <input
                          className={`lm-input${fieldErr.password ? " err" : ""}`}
                          type={showPass ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setFieldErr((p) => ({ ...p, password: undefined }));
                          }}
                          disabled={loading}
                          style={{ paddingRight: "42px" }}
                        />
                        <button
                          type="button"
                          className="lm-eye"
                          onClick={() => setShowPass((s) => !s)}
                          tabIndex={-1}
                        >
                          <EyeIcon open={showPass} />
                        </button>
                      </div>
                      {fieldErr.password && (
                        <div className="lm-field-err">{fieldErr.password}</div>
                      )}
                    </div>

                    <button
                      className="lm-submit"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <SpinnerIcon /> Signing in...
                        </>
                      ) : (
                        "Sign In →"
                      )}
                    </button>

                    <div className="lm-switch">
                      Account not created?{" "}
                      <button
                        type="button"
                        className="lm-switch-btn"
                        onClick={() => setMode("register")}
                      >
                        Register here
                      </button>
                    </div>

                    <div className="lm-footer-note">
                      Your data is secure &amp; encrypted
                    </div>
                  </form>
                )}

                {/* ── REGISTER FORM ── */}
                {mode === "register" && (
                  <form onSubmit={handleRegister} noValidate>
                    <div className="lm-field">
                      <label className="lm-label">Full Name</label>
                      <input
                        ref={firstRef}
                        className={`lm-input${fieldErr.rName ? " err" : ""}`}
                        type="text"
                        placeholder="Enter your full name"
                        value={rName}
                        onChange={(e) => {
                          setRName(e.target.value);
                          setFieldErr((p) => ({ ...p, rName: undefined }));
                        }}
                        disabled={regLoading}
                      />
                      {fieldErr.rName && (
                        <div className="lm-field-err">{fieldErr.rName}</div>
                      )}
                    </div>

                    <div className="lm-field">
                      <label className="lm-label">Mobile Number</label>
                      {/* +91 prefix wrapper */}
                      <div className={`lm-mobile-wrap${fieldErr.rMobile ? " err" : ""}`}>
                        <span className="lm-mobile-prefix">+91</span>
                        <input
                          className="lm-mobile-input"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={rMobile}
                          onChange={(e) => {
                            setRMobile(e.target.value.replace(/\D/g, ""));
                            setFieldErr((p) => ({ ...p, rMobile: undefined }));
                          }}
                          disabled={regLoading}
                        />
                      </div>
                      {fieldErr.rMobile && (
                        <div className="lm-field-err">{fieldErr.rMobile}</div>
                      )}
                    </div>

                    <div className="lm-field">
                      <label className="lm-label">Email Address</label>
                      <input
                        className={`lm-input${fieldErr.rEmail ? " err" : ""}`}
                        type="email"
                        placeholder="your@email.com"
                        value={rEmail}
                        onChange={(e) => {
                          setREmail(e.target.value);
                          setFieldErr((p) => ({ ...p, rEmail: undefined }));
                        }}
                        disabled={regLoading}
                      />
                      {fieldErr.rEmail && (
                        <div className="lm-field-err">{fieldErr.rEmail}</div>
                      )}
                    </div>

                    <div className="lm-field">
                      <label className="lm-label">Password</label>
                      <div className="lm-input-wrap">
                        <input
                          className={`lm-input${fieldErr.rPassword ? " err" : ""}`}
                          type={showPass ? "text" : "password"}
                          placeholder="Min 6 characters"
                          value={rPassword}
                          onChange={(e) => {
                            setRPassword(e.target.value);
                            setFieldErr((p) => ({ ...p, rPassword: undefined }));
                          }}
                          disabled={regLoading}
                          style={{ paddingRight: "42px" }}
                        />
                        <button
                          type="button"
                          className="lm-eye"
                          onClick={() => setShowPass((s) => !s)}
                          tabIndex={-1}
                        >
                          <EyeIcon open={showPass} />
                        </button>
                      </div>
                      {fieldErr.rPassword && (
                        <div className="lm-field-err">{fieldErr.rPassword}</div>
                      )}
                    </div>

                    <button
                      className="lm-submit"
                      type="submit"
                      disabled={regLoading}
                    >
                      {regLoading ? (
                        <>
                          <SpinnerIcon /> Creating account...
                        </>
                      ) : (
                        "Create Account →"
                      )}
                    </button>

                    <div className="lm-switch">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="lm-switch-btn"
                        onClick={() => setMode("login")}
                      >
                        Sign in here
                      </button>
                    </div>

                    <div className="lm-footer-note">
                      Your data is secure &amp; encrypted
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}