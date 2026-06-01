// src/hooks/useGetBbpsBillers.js
import { useState, useEffect, useCallback } from "react";
import { MainApiWithBasicAuth } from "../lib/AuthApi";

function normalizeBiller(b) {
  return {
    biller_id:              b.billerId,
    biller_name:            b.billerName,
    fetch_requirement:      b.fetchRequirement,
    validation_requirement: b.supportBillValidation,
    customer_params: (b.customerParams ?? []).map((p) => ({
      name:       p.paramName,
      data_type:  p.dataType,
      optional:   p.optional === "true" || p.optional === true,
      min_length: p.minLength,
      max_length: p.maxLength,
      regex:      p.regex ?? "",
    })),
    status:          b.status,
    biller_alias:    b.billerAliasName,
    biller_category: b.billerCategoryName,
  };
}

export function useGetBbpsBillers(slug, { offset = 0, limit = 100 } = {}) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const fetchBillers = useCallback(async (search = "") => {
    if (!slug) return;

    setLoading(true);
    // ✅ purana data rehne do jab tak naya nahi aata (search ke waqt flicker nahi)
    setError(null);

    const params = new URLSearchParams({ offset, limit, catval: slug });
    if (search && search.trim() !== "") params.set("search", search.trim());

    const res = await MainApiWithBasicAuth(
      `/bbps/v1/getBillerMdmData/billerCategory?${params.toString()}`,
      {
        method:   "GET",
        username: "INDI130",
        password: "MjAyNTA1MjMxMjU3MTI=",
        apiKey:   "oZtRi2h-LOP9acvUP7pqxfsJkdAOBvxxeIXbe9bz_FI",
      }
    );

    if (!res.ok) {
      setError(res.error ?? "Failed to fetch billers");
      setLoading(false);
      return;
    }

    const raw = res.data?.data?.result ?? [];
    setData(raw.map(normalizeBiller));
    setLoading(false);
  }, [slug, offset, limit]);

  // Initial load — no search
  useEffect(() => {
    fetchBillers("");
  }, [fetchBillers]);

  // retry — error ke baad fresh load karne ke liye (search="" se fresh initial fetch)
  const retry = useCallback(() => fetchBillers(""), [fetchBillers]);

  return { data, loading, error, fetchBillers, retry };
}