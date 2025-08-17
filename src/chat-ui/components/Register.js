import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Register() {
    const [name, setName] = useState("Admin");
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("1234");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { registerWithApi } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await registerWithApi({ email, password, name });
            // สมัครสำเร็จ + ล็อกอินอัตโนมัติแล้ว -> เข้า /chatui
            navigate("/chatui");
        } catch (err) {
            setError(err.message || "สมัครไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0f1021] min-h-screen flex items-center justify-center p-4 font-[Kanit]">
            <div className="bg-[#1a1c2e] text-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-[#2d3053]">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">สมัครสมาชิก</h1>
                    <p className="text-slate-300">กรอกข้อมูลให้ครบเพื่อเริ่มใช้งาน</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="block font-medium">ชื่อที่แสดง</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#26293f] border border-[#35395c] rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="เช่น Admin"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block font-medium">อีเมล</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#26293f] border border-[#35395c] rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block font-medium">รหัสผ่าน</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3 1.343 3 3v1H9v-1c0-1.657 1.343-3 3-3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8V7a5 5 0 00-10 0v1" />
                                    <rect x="9" y="14" width="6" height="6" rx="2" ry="2" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#26293f] border border-[#35395c] rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="อย่างน้อย 4 ตัวอักษร"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-semibold py-3 rounded-xl border border-[#5b61ff] transition ${loading ? "bg-[#5b61ff]/50" : "bg-[#5b61ff] hover:bg-[#7075ff]"
                            }`}
                    >
                        {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                    </button>
                </form>

                <div className="mt-6 text-center text-slate-300">
                    มีบัญชีอยู่แล้ว?{" "}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        </div>
    );
}
