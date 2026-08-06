const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

let accessToken = null;
export const setAccessToken = (token) => { accessToken = token; };
export const getAccessToken = () => accessToken;

const request = async (method, path, body = null, isMultipart = false) => {
  const headers = {};
  if (!isMultipart) headers["Content-Type"] = "application/json";
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const config = {
    method,
    headers,
    ...(body && { body: isMultipart ? body : JSON.stringify(body) }),
  };

  let response = await fetch(`${BASE_URL}${path}`, config);

  // Auto-refresh access token if expired
  if (response.status === 401 && accessToken) {
    const refreshToken = localStorage.getItem("kcee_refresh_token");
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        accessToken = refreshData.data.accessToken;
        localStorage.setItem("kcee_refresh_token", refreshData.data.refreshToken);
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        response = await fetch(`${BASE_URL}${path}`, config);
      }
    }
  }

  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, message: data.message, errors: data.errors };
  }
  return data;
};

const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  patch: (path, body) => request("PATCH", path, body),
  delete: (path) => request("DELETE", path),
  upload: (path, formData) => request("POST", path, formData, true),
};

export default api;
