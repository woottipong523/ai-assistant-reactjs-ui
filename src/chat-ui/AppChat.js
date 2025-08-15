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

    // ฟังก์ชันส่ง prompt (stream)
    const handleSend = async (userText) => {
        if (!userText) return;
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // เตรียมชุด messages ทั้งหมด (history + ข้อความใหม่)
        const apiMessages = messages.map((m) => ({
            role: m.type === "user" ? "user" : "assistant",
            content: m.text,
        }));
        apiMessages.push({ role: "user", content: userText });
        console.log(apiMessages);

        // อัพเดต UI ก่อนส่ง
        setMessages((prev) => [
            ...prev,
            { type: "user", text: userText, time, streaming: false },
            { type: "bot", text: "", time, streaming: true },
        ]);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:11434/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3.1:latest",
                    stream: true,
                    messages: apiMessages,
                }),
            });

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let partial = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                chunk.split("\n").filter(Boolean).forEach((line) => {
                    try {
                        const json = JSON.parse(line);
                        const content = json.message?.content || "";
                        partial += content;
                        // อัพเดตข้อความ streaming
                        setMessages((prev) => {
                            const arr = [...prev];
                            arr[arr.length - 1] = {
                                ...arr[arr.length - 1],
                                text: partial,
                                streaming: true,
                            };
                            return arr;
                        });
                    } catch (e) {
                        // skip invalid JSON
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
                    text: "เกิดข้อผิดพลาดในการติดต่อกับ Ollama",
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
