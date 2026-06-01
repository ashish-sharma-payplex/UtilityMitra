import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { MainApi } from "@/src/lib/MainApi";

export function useGetWalletData() {
  const token = useSelector((state) => state.auth.token);

  const [profile, setProfile] = useState(null);
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addingBalance, setAddingBalance] = useState(false);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    // Dono APIs parallel chalao
    const [profileRes, ledgerRes] = await Promise.all([
      MainApi("/api/v1/users/profile", { method: "GET", token }),
      MainApi("/api/v1/users/wallet-ledger", { method: "GET", token }),
    ]);

    if (!profileRes.ok) {
      setError(profileRes.error ?? "Failed to fetch profile");
      setLoading(false);
      return;
    }
    if (!ledgerRes.ok) {
      setError(ledgerRes.error ?? "Failed to fetch ledger");
      setLoading(false);
      return;
    }

    setProfile(profileRes.data?.data ?? null);
    setLedger(ledgerRes.data?.data ?? null);
    setLoading(false);
  }, [token]);

  // Add Balance function
  const addBalance = useCallback(
    async (amount) => {
      if (!token) return { ok: false, error: "Not logged in" };
      setAddingBalance(true);

      const res = await MainApi(`/api/v1/wallet/credit?amount=${amount}`, {
        method: "GET",
        token,
      });

      setAddingBalance(false);

      if (res.ok) {
        // Balance update ke liye refetch
        await fetchData();
      }

      return res;
    },
    [token, fetchData],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    profile,
    ledger,
    loading,
    error,
    addingBalance,
    addBalance,
    refetch: fetchData,
  };
}
