import { useState, useCallback } from "react";
import { MainApiWithBasicAuth } from "../lib/AuthApi";

const BBPS_USERNAME = process.env.NEXT_PUBLIC_BBPS_USERNAME ?? "INDI130";
const BBPS_PASSWORD = process.env.NEXT_PUBLIC_BBPS_PASSWORD ?? "MjAyNTA1MjMxMjU3MTI=";
const BBPS_API_KEY  = process.env.NEXT_PUBLIC_BBPS_API_KEY  ?? "oZtRi2h-LOP9acvUP7pqxfsJkdAOBvxxeIXbe9bz_FI";

/** Generates e.g. "UMTXN1234567" — UMTXN + 7 random digits */
function generateTxnReqId() {
  const digits = Math.floor(1000000 + Math.random() * 9000000); // always 7 digits
  return `UMTXN${digits}`;
}

export function usePayBill() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  /**
   * @param {Object} params
   * @param {string} params.biller_id
   * @param {string} params.amount          — string, e.g. "500"
   * @param {string} params.service         — slug, e.g. "fastag"
   * @param {Array}  params.customer_params — [{ name, value }]
   * @param {string} params.mobile
   * @param {string} params.email
   * @param {string} params.ref_id          — fetchRefId from validation/fetch response
   */
  const payBill = useCallback(async ({
    biller_id,
    amount,
    service,
    customer_params,
    mobile,
    email,
    ref_id,
  }) => {
    setLoading(true);
    setError(null);
    setData(null);

    const txnReqId = generateTxnReqId();
    console.log("💳 payBill() called", { biller_id, amount, service, txnReqId, ref_id });

    const res = await MainApiWithBasicAuth("/bbps/v1/billPay", {
      method:   "POST",
      username: BBPS_USERNAME,
      password: BBPS_PASSWORD,
      apiKey:   BBPS_API_KEY,
      body: {
        billerId:      biller_id,
        amount:        String(amount),
        service,
        customerParms: customer_params,
        mobile,
        email,
        txnReqId,
        fetchRefId:    ref_id ?? "",
      },
    });

    console.log("📡 billPay response:", res);

    if (!res.ok || res.data?.status === false) {
      const msg = res.data?.message ?? res.error ?? "Payment failed. Please try again.";
      setError(msg);
      setLoading(false);
      return { ok: false, error: msg };
    }

    const payload = res.data?.data ?? res.data ?? null;
    setData(payload);
    setLoading(false);
    return { ok: true, data: payload };
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, payBill, reset };
}