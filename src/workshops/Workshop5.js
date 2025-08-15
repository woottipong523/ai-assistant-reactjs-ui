import React, { useState } from "react";

export default function OllamaChatSimple() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChat = async () => {
        setLoading(true);
        setResponse("");

        try {
            const res = await fetch("http://localhost:11434/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama3.2:latest",
                    stream: false,
                    messages: [
                        { role: "user", content: "แนะนำอาหารภาคเหนือ" },
                        { role: "assistant", content: "ข้าวซอย, แกงฮังเล, น้ำพริกอ่อง" },
                        { role: "user", content: "ข้าวซอยทำอย่างไร?" },
                    ],
                }),
            });

            const data = await res.json();
            setResponse(data.message?.content || "ไม่มีคำตอบ");
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            setResponse("เกิดข้อผิดพลาดในการติดต่อกับ Ollama");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Ollama Chat API</h2>
            <button onClick={handleChat} disabled={loading}>
                {loading ? "กำลังถาม..." : "ส่งคำถาม"}
            </button>

            <pre style={{ marginTop: 20, background: "#f3f3f3", padding: 10 }}>
                {response}
            </pre>
        </div>
    );
}
