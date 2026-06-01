// ─────────────────────────────────────────────────────────────────────────────
// lib/api.js
//
// SINGLE SOURCE OF TRUTH for base URL.
// Agar future me URL change karni ho, sirf .env.local me
//   NEXT_PUBLIC_API_BASE_URL=http://new-server.com
// karo — poore project me automatically update ho jayega.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  console.warn(
    "[MainApi] NEXT_PUBLIC_API_BASE_URL is not set in .env.local. " +
    "Add it like: NEXT_PUBLIC_API_BASE_URL=http://192.168.1.22:8000"
  );
}

/**
 * MainApi — Central API caller
 *
 * @param {string}  endpoint   — e.g. "/api/v1/auth/login"
 * @param {object}  options
 * @param {string}  [options.method="GET"]
 * @param {object}  [options.body]         — plain JS object, auto-JSON-stringified
 * @param {string}  [options.token]        — Bearer token (for protected routes)
 * @param {object}  [options.headers]      — extra headers (merged on top)
 *
 * @returns {Promise<{ data: any, status: number, ok: boolean, error: string|null }>}
 *
 * Usage examples:
 *   // Public POST
 *   const res = await MainApi("/api/v1/auth/login", {
 *     method: "POST",
 *     body: { mobile: "9999999999", password: "Pass@123" },
 *   });
 *
 *   // Authenticated GET
 *   const res = await MainApi("/api/v1/users/profile", {
 *     token: "eyJhbGci...",
 *   });
 */
export async function MainApi(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    token,
    headers: extraHeaders = {},
  } = options;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    return {
      data,
      status: response.status,
      ok: response.ok,
      error: response.ok ? null : (data?.message ?? `HTTP ${response.status}`),
    };
  } catch (err) {
    // Network error, server down, etc.
    return {
      data: null,
      status: 0,
      ok: false,
      error: err.message ?? "Network error",
    };
  }
}