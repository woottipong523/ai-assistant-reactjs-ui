import React, { useState } from "react";

export default function OllamaGenerateChatStyle() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setResponse("");

        const fullPrompt = `
ผู้ใช้: แนะนำอาหารภาคเหนือ
ผู้ช่วย: ข้าวซอย, แกงฮังเล, น้ำพริกอ่อง
ผู้ใช้: ข้าวซอยทำอย่างไร?
ผู้ช่วย:
    `.trim();

        try {
            const res = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama3.2:latest",
                    prompt: fullPrompt,
                    stream: false,
                }),
            });

            const data = await res.json();
            setResponse(data.response || "ไม่มีคำตอบ");
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            setResponse("เกิดข้อผิดพลาด");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Ollama Chat-style via /api/generate</h2>
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "กำลังถาม..." : "ส่งคำถาม"}
            </button>

            <pre style={{ marginTop: 20, background: "#f3f3f3", padding: 10 }}>
                {response}
            </pre>
        </div>
    );
}
