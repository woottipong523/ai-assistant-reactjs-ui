import React from "react";
import { useAuth } from "../../auth/AuthContext"; // 👈 import context
import { useNavigate } from "react-router-dom"; // 👈 import navigate

export default function TopBar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 h-16 bg-[#15172c] flex items-center px-8 border-b border-[#282e5e]">
            <div className="flex-1 flex items-center">
                <div className="flex items-center space-x-2">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-300">
                        สร้าง AI Assistant ด้วยตนเอง
                    </span>
                    <span className="ml-3 h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs text-slate-300 ml-1">ออนไลน์</span>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-300">👋 {user?.name ?? user?.email ?? "Guest"}</span>

                <button
                    onClick={handleLogout}
                    className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                    Logout
                </button>

                <button className="p-2 rounded-full hover:bg-[#22264c]">
                    <svg width="18" height="18" fill="none" stroke="#b4b8ff" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 6v12M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <button className="p-2 rounded-full hover:bg-[#22264c]">
                    <svg width="18" height="18" fill="none" stroke="#b4b8ff" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83v0a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33
            1.65 1.65 0 0 0-1 1.51V20a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 7 18.67a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0v0
            a2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 4 12.91V12a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83v0
            a2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 7 5.33V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v.09c.3.04.59.14.85.31" />
                    </svg>
                </button>

                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                </div>
            </div>
        </header>
    );
}
