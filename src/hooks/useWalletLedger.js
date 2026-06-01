import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { MainApi } from "@/src/lib/MainApi";

export function useWalletLedger() {
  const token = useSelector((state) => state.auth.token);

  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // Returns latest closing_balance from first item, or 0
  const balance = (() => {
    const items = data?.items ?? [];
    if (items.length === 0) return 0;
    return parseFloat(items[0].closing_balance ?? 0);
  })();

  const fetchLedger = useCallback(async () => {
    if (!token) return { ok: false, error: "Not authenticated" };

    setLoading(true);
    setError(null);
    setData(null);

    const res = await MainApi("/api/v1/users/wallet-ledger", {
      method: "GET",
      token,
    });

    if (!res.ok) {
      const msg = res.error ?? "Could not fetch wallet balance";
      setError(msg);
      setLoading(false);
      return { ok: false, error: msg };
    }

    const payload = res.data?.data ?? res.data ?? null;
    setData(payload);
    setLoading(false);
    return { ok: true, data: payload };
  }, [token]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, balance, loading, error, fetchLedger, reset };
}