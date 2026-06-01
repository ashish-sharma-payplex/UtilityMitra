import { useState, useCallback } from "react";
import { MainApiWithBasicAuth } from "../lib/AuthApi";

const BBPS_USERNAME = process.env.NEXT_PUBLIC_BBPS_USERNAME ?? "INDI130";
const BBPS_PASSWORD = process.env.NEXT_PUBLIC_BBPS_PASSWORD ?? "MjAyNTA1MjMxMjU3MTI=";
const BBPS_API_KEY  = process.env.NEXT_PUBLIC_BBPS_API_KEY  ?? "oZtRi2h-LOP9acvUP7pqxfsJkdAOBvxxeIXbe9bz_FI";

export function useBillValidation() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const validate = useCallback(async ({ biller_id, customer_params, mobile, email }) => {
    console.log("🟢 validate() called", { biller_id, customer_params, mobile, email });

    setLoading(true);
    setError(null);
    setData(null);

    const res = await MainApiWithBasicAuth("/bbps/v1/billValidation", {
      method: "POST",
      username: BBPS_USERNAME,
      password: BBPS_PASSWORD,
      apiKey:   BBPS_API_KEY,
      body: {
        billerId:      biller_id,
        customerParms: customer_params,
        mobile,
        email,
      },
    });

    console.log("📡 API response:", res);

    if (!res.ok || res.data?.status === false) {
      const msg = res.data?.message ?? res.error ?? "Bill validation failed";
      setError(msg);
      setLoading(false);
      return { ok: false, error: msg };
    }

    setData(res.data?.data ?? null);
    setLoading(false);
    return { ok: true, data: res.data?.data ?? null };
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, validate, reset };
}