import { useState, useCallback } from "react";
import { MainApiWithBasicAuth } from "../lib/AuthApi";

// ── normalize API response to what BillerPage expects ──
function normalizeBillData(bill) {
  const br = bill.billerResponse ?? {};
  return {
    ref_id: bill.refId,
    customer_name: br.customerName ?? "",
    amount: br.amount ?? "0",
    due_date: br.dueDate ?? "",
    bill_date: br.billDate ?? "",
    bill_number: br.billNumber ?? "",
    bill_period: br.billPeriod ?? "",
    customer_params: (bill.billDetails ?? []).map((p) => ({
      name: p.name,
      value: p.value,
    })),
    additional_info: (bill.additionalInfo ?? []).map((p) => ({
      name: p.name,
      value: p.value,
    })),
  };
}

export function useFetchBill() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBill = useCallback(async ({ biller_id, customer_params,mobile,email }) => {
    setLoading(true);
    setError(null);
    setData(null);

   const res = await MainApiWithBasicAuth("/bbps/v1/billFetch", {
  method: "POST",
  username: "INDI130",
  password: "MjAyNTA1MjMxMjU3MTI=",
  apiKey: "oZtRi2h-LOP9acvUP7pqxfsJkdAOBvxxeIXbe9bz_FI",
  body: {
    billerId: biller_id,        
    customerParms: customer_params, 
    mobile,
    email,
  },
});

    if (!res.ok) {
      const msg = res.error ?? "Failed to fetch bill";
      setError(msg);
      setLoading(false);
      return { ok: false, error: msg };
    }

    const bill = res.data?.data?.bill;
    if (!bill) {
      const msg = "Invalid response from server";
      setError(msg);
      setLoading(false);
      return { ok: false, error: msg };
    }

    const normalized = normalizeBillData(bill);
    setData(normalized);
    setLoading(false);
    return { ok: true, data: normalized };
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetchBill, reset };
}