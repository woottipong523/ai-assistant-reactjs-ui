// App.js
import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import WelcomeCard from "./components/WelcomeCard";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

export default function App() {
    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "สวัสดีครับ มีอะไรให้ช่วยไหมครับวันนี้?",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            streaming: false,
        },
    ]);
    const [loading, setLoading] = useState(false);

    // ถ้าจะสลับโหมด: true = auto (ตัดสินใจก่อน), false = proxy ตรงไป Ollama
    const USE_AUTO = true; // <--- เปลี่ยนตรงนี้ได้ตามต้องการ

    // ฟังก์ชันส่ง prompt (stream)
    const handleSend = async (userText) => {
        if (!userText) return;
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // เตรียม history ให้แสดงใน UI (ฝั่ง backend auto ใช้แค่ prompt อย่างเดียว)
        const apiMessages = messages.map((m) => ({
            role: m.type === "user" ? "user" : "assistant",
            content: m.text,
        }));
        apiMessages.push({ role: "user", content: userText });

        // อัพเดต UI ก่อนส่ง
        setMessages((prev) => [
            ...prev,
            { type: "user", text: userText, time, streaming: false },
            { type: "bot", text: "", time, streaming: true },
        ]);
        setLoading(true);

        try {
            // --- CHANGED: เลือก endpoint ตามโหมด ---
            const url = USE_AUTO
                ? "http://localhost:4000/api/llm/ask/stream" // auto-route: ตัดสินใจก่อนค่อยตอบ/ค้น
                : "http://localhost:4000/api/llm/chat";      // proxy ตรงไป Ollama

            // --- CHANGED: payload ---
            const body = USE_AUTO
                ? JSON.stringify({ prompt: userText }) // auto ใช้แค่ prompt
                : JSON.stringify({                    // proxy เดิม (คงไว้ให้สลับได้)
                    model: "llama3.1:latest",
                    stream: true,
                    messages: apiMessages,
                });

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (!res.ok || !res.body) {
                throw new Error(`HTTP ${res.status}`);
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let partial = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });

                // รูปแบบจาก backend คือ NDJSON: 1 บรรทัด = 1 JSON
                chunk
                    .split("\n")
                    .filter(Boolean)
                    .forEach((line) => {
                        try {
                            const json = JSON.parse(line);

                            // error event
                            if (json.error) {
                                partial += `\n⚠️ ${json.error}\n`;
                            }

                            // message content event (ฝั่ง backend ส่งเป็น { message: { content }, done })
                            const content = json.message?.content || "";
                            if (content) {
                                partial += content;
                            }

                            // อัพเดตข้อความ streaming
                            setMessages((prev) => {
                                const arr = [...prev];
                                arr[arr.length - 1] = {
                                    ...arr[arr.length - 1],
                                    text: partial,
                                    streaming: !json.done, // ถ้าเจอ done=true ก็จะปิดสตรีม
                                };
                                return arr;
                            });
                        } catch {
                            // ข้ามบรรทัดที่ parse ไม่ได้ (เช่นว่าง/ไม่ใช่ JSON)
                        }
                    });
            }

            // เมื่อ stream จบ ให้ streaming=false
            setMessages((prev) => {
                const arr = [...prev];
                arr[arr.length - 1] = {
                    ...arr[arr.length - 1],
                    streaming: false,
                };
                return arr;
            });
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    type: "bot",
                    text: `เกิดข้อผิดพลาดในการติดต่อเซิร์ฟเวอร์ (${error.message})`,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#111429] min-h-screen">
            <TopBar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 flex flex-col pt-20 md:ml-64 min-h-screen relative">
                    <div className="flex-1 flex flex-col px-8">
                        <WelcomeCard />
                        <ChatMessages messages={messages} loading={loading} />
                    </div>
                    <ChatInput onSend={handleSend} loading={loading} />
                </main>
            </div>
        </div>
    );
}
