import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { MainApi } from "@/src/lib/MainApi";

export function useGetBbpsServices() {
  const token = useSelector((state) => state.auth.token);

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const fetchServices = useCallback(async () => {
    if (!token) return;   // token nahi → fetch mat karo

    setLoading(true);
    setError(null);

    const res = await MainApi("/api/v1/bbps/services", {
      method: "GET",
      token,
    });

    if (!res.ok) {
      setError(res.error ?? "Failed to fetch services");
      setLoading(false);
      return;
    }

    setData(res.data?.data ?? []);
    setLoading(false);
  }, [token]);

  // Token mile ya badle → re-fetch
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { data, loading, error, refetch: fetchServices };
}