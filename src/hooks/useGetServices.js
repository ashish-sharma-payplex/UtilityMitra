import { useState, useEffect, useCallback } from "react";
import { MainApiWithBasicAuth } from "../lib/AuthApi";

export function useGetBbpsServices() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);

    const res = await MainApiWithBasicAuth("/bbps/v1/getServices/", {
      method: "GET",
      username: "INDI130",
      password: "MjAyNTA1MjMxMjU3MTI=",
      apiKey: "oZtRi2h-LOP9acvUP7pqxfsJkdAOBvxxeIXbe9bz_FI",
    });

    if (!res.ok) {
      setError(res.error ?? "Failed to fetch services");
      setLoading(false);
      return;
    }

    const services = res.data?.data?.services;

    if (!res.data?.status || !services) {
      setError(res.data?.message ?? "Services unavailable");
      setData([]);
      setLoading(false);
      return;
    }

    setData(services);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    data,
    loading,
    error,
    refetch: fetchServices,
  };
}