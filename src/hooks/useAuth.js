import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { MainApi } from "@/src/lib/MainApi";
import { clearCredentials, setCredentials } from "../redux/slices/autSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const login = useCallback(async ({ mobile, password }) => {
    setLoading(true);
    setError(null);

    const loginRes = await MainApi("/api/v1/auth/login", {
      method: "POST",
      body: { mobile, password },
    });

    if (!loginRes.ok) {
      const msg = loginRes.error ?? "Login failed";
      setError(msg);
      setLoading(false);
      return { success: false, error: msg };
    }

    const accessToken = loginRes.data?.data?.access_token;
    if (!accessToken) {
      const msg = "No token received from server";
      setError(msg);
      setLoading(false);
      return { success: false, error: msg };
    }

    // Profile fetch
    const profileRes = await MainApi("/api/v1/users/profile", { token: accessToken });
    const user = profileRes.ok ? (profileRes.data?.data ?? { name: "User" }) : { name: "User" };

    // ← Redux dispatch — ye localStorage bhi save kar dega (slice me dekho)
    dispatch(setCredentials({ token: accessToken, user }));

    setLoading(false);
    return { success: true, token: accessToken, user };
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(clearCredentials());  // Redux + localStorage dono saaf
    setError(null);
  }, [dispatch]);

  return { loading, error, login, logout };
}