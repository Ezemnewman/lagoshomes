import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api, { setAccessToken } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      const refreshToken = localStorage.getItem("kcee_refresh_token");
      if (!refreshToken) { setLoading(false); return; }
      try {
        const data = await api.post("/auth/refresh", { refreshToken });
        setAccessToken(data.data.accessToken);
        localStorage.setItem("kcee_refresh_token", data.data.refreshToken);
        const meData = await api.get("/auth/me");
        setUser(meData.data.user);
      } catch {
        localStorage.removeItem("kcee_refresh_token");
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.post("/auth/login", { email, password });
    setAccessToken(data.data.accessToken);
    localStorage.setItem("kcee_refresh_token", data.data.refreshToken);
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const googleLogin = useCallback(async (idToken, role = "BUYER") => {
    const data = await api.post("/auth/google", { idToken, role });
    setAccessToken(data.data.accessToken);
    localStorage.setItem("kcee_refresh_token", data.data.refreshToken);
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const register = useCallback(async (form) => {
    const data = await api.post("/auth/register", form);
    setAccessToken(data.data.accessToken);
    localStorage.setItem("kcee_refresh_token", data.data.refreshToken);
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem("kcee_refresh_token");
    try { await api.post("/auth/logout", { refreshToken }); } catch {}
    setAccessToken(null);
    localStorage.removeItem("kcee_refresh_token");
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const data = await api.get("/auth/me");
    setUser(data.data.user);
    return data.data.user;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
