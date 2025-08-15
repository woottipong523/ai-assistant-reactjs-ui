import React, { useState } from "react";

export default function OllamaGenerate() {
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setResult("");

        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama3.2:latest",
                    prompt: "สวัสดีครับ",
                    stream: false
                }),
            });

            const data = await response.json();
            setResult(data.response || "ไม่มีคำตอบ");
        } catch (error) {
            console.error("Error:", error);
            setResult("เกิดข้อผิดพลาด");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Ollama Generate API</h2>
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "กำลังประมวลผล..." : "ส่งคำถาม"}
            </button>
            <pre style={{ marginTop: 20, background: "#f3f3f3", padding: 10 }}>
                {result}
            </pre>
        </div>
    );
}
