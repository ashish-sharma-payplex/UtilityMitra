export async function MainApiWithBasicAuth(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    username,
    password,
    apiKey,
    headers: extraHeaders = {},
  } = options;

  // Different base URL
  const BASIC_AUTH_BASE_URL = "https://api1.indiplex.co.in";

  // Create Basic Auth token
  const basicAuth = btoa(`${username}:${password}`);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${basicAuth}`,
    "x-api-key": apiKey,
    ...extraHeaders,
  };

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(
      `${BASIC_AUTH_BASE_URL}${endpoint}`,
      config
    );

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
      error: response.ok
        ? null
        : (data?.message ?? `HTTP ${response.status}`),
    };
  } catch (err) {
    return {
      data: null,
      status: 0,
      ok: false,
      error: err.message ?? "Network error",
    };
  }
}