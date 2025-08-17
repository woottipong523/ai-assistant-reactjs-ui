// src/auth/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const API_BASE = "http://localhost:4000";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    });
    const isLoggedIn = !!token;

    // เรียก API /login แล้วเก็บ token + user
    const loginWithApi = async (email, password) => {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
    };

    // ✅ เมธอดสมัครสมาชิก -> ยิง /register แล้วล็อกอินต่อให้เลย
    const registerWithApi = async ({ email, password, name }) => {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Register failed");

        // สมัครสำเร็จ -> ล็อกอินให้ทันที
        await loginWithApi(email, password);
        return data; // { id, email, name }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    // helper แนบ Authorization header ให้อัตโนมัติ
    const authFetch = (url, options = {}) => {
        const headers = new Headers(options.headers || {});
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return fetch(url, { ...options, headers });
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                token,
                user,
                loginWithApi,
                registerWithApi,
                logout,
                authFetch,
                API_BASE,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
