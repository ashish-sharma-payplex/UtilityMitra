import { MainApi } from "@/src/lib/MainApi";
import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "admin_session";
const TOKEN_KEY = "admin_token";
const AUTO_LOGOUT_MS = 20 * 60 * 1000; // 20 minutes

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  const clearSession = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clearSession();
    }, AUTO_LOGOUT_MS);
  };

  useEffect(() => {
    const session = sessionStorage.getItem(STORAGE_KEY);
    if (session === "true") {
      setIsAuthenticated(true);
      resetTimer();
    }
    setLoading(false);

    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, []);

  const login = async (mobile, password) => {
    const res = await MainApi("/api/v1/admin/login", {
      method: "POST",
      body: { mobile, password },
    });

    console.log("Login full response:", JSON.stringify(res, null, 2));

    if (res.ok) {
      sessionStorage.setItem(STORAGE_KEY, "true");

      const token =
        res.data?.data?.token ||
        res.data?.token ||
        res.data?.access_token ||
        res.data?.data?.access_token;

      console.log("Token found:", token);

      if (token) sessionStorage.setItem(TOKEN_KEY, token);

      setIsAuthenticated(true);
      resetTimer();
      return { ok: true };
    }

    return { ok: false, error: res.error || "Invalid credentials" };
  };

  const logout = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    clearSession();
  };

  return { isAuthenticated, loading, login, logout };
}
