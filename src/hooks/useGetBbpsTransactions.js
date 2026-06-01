import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { MainApi } from "@/src/lib/MainApi";

export function useGetBbpsTransactions() {
  const token = useSelector((state) => state.auth.token);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    const res = await MainApi("/api/v1/users/bbps-transactions", {
      method: "GET",
      token,
    });

    if (!res.ok) {
      setError(res.error ?? "Failed to fetch transactions");
      setLoading(false);
      return;
    }

    setData(res.data?.data ?? null);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { data, loading, error, refetch: fetchTransactions };
}
