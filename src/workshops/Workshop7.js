import React, { useState } from "react";

export default function OllamaChatStream() {
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
                    stream: true, // ✅ เปิด stream
                    messages: [
                        { role: "user", content: "แนะนำอาหารภาคเหนือ" },
                        { role: "assistant", content: "ข้าวซอย, แกงฮังเล, น้ำพริกอ่อง" },
                        { role: "user", content: "ข้าวซอยทำอย่างไร ขอแสดงเป็นตารางหน่อย?" },
                    ],
                }),
            });

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // ✅ stream แบบ JSON per line: {"message": { "content": "..." }}
                chunk
                    .split("\n")
                    .filter(Boolean)
                    .forEach((line) => {
                        try {
                            const json = JSON.parse(line);
                            const content = json.message?.content || "";
                            setResponse((prev) => prev + content);
                        } catch (e) {
                            // ข้ามกรณี parse ไม่ได้ เช่น empty line
                        }
                    });
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            setResponse("เกิดข้อผิดพลาดในการติดต่อกับ Ollama");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Ollama Chat (stream: true)</h2>
            <button onClick={handleChat} disabled={loading}>
                {loading ? "กำลังตอบ..." : "ส่งคำถาม"}
            </button>

            <pre style={{ marginTop: 20, background: "#f3f3f3", padding: 10 }}>
                {response}
            </pre>
        </div>
    );
}
