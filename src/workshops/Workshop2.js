import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";



export default function Workshop1() {
    const [messages, setMessages] = useState([
        { role: "user", content: "ข้าวซอยคืออะไร?" },
        {
            role: "assistant",
            content: `
## ข้าวซอย
ข้าวซอยเป็นอาหารพื้นเมืองของภาคเหนือ

### ตารางวัตถุดิบ

| วัตถุดิบ | ปริมาณ |
|----------|---------|
| ไก่       | 1 ตัว   |
| กะทิ     | 500 ml  |
| เส้นบะหมี่ | 1 ห่อ  |

### วิธีทำ

1. ต้มไก่กับกะทิ
2. ใส่เครื่องแกง

\`\`\`bash
npm install curry
\`\`\`
      `,
        },
    ]);

    return (
        <div style={{ padding: 20 }}>
            {messages.map((msg, i) => (
                <div
                    key={i}
                    style={{
                        maxWidth: "75%",
                        marginBottom: 10,
                        alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                        background: msg.role === "user" ? "#d1e7dd" : "#f8f9fa",
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                            table: ({ node, ...props }) => <table {...props} className="markdown-table" />,
                        }}
                    >
                        {msg.content}
                    </ReactMarkdown>
                </div>
            ))}
        </div>
    );
}
