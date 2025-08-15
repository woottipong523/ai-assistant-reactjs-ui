// components/ChatMessages.js
import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export default function ChatMessages({ messages, loading }) {
    const bottomRef = useRef();

    // Auto scroll to bottom ทุกครั้งที่ข้อความเปลี่ยนหรือกำลัง stream
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    return (
        <div
            className="flex-1 overflow-y-auto pb-40 space-y-4"
            style={{ minHeight: 0 }}
        >
            {messages.map((msg, idx) =>
                msg.type === "user" ? (
                    <div key={idx} className="flex items-end justify-end">
                        <div className="flex items-end space-x-3">
                            <div
                                className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white px-4 py-2 max-w-xl break-words font-medium"
                                style={{ borderBottomRightRadius: 4 }}
                            >
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                <div className="text-xs text-purple-200 text-right mt-1">{msg.time}</div>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center ml-2">
                                <span className="text-white font-bold">T</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div key={idx} className="flex items-end">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2">
                            <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <div
                            className="rounded-2xl bg-[#22264c]/80 text-white px-4 py-2 max-w-2xl break-words font-medium"
                            style={{ borderBottomLeftRadius: 4 }}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    table: ({ node, ...props }) => (
                                        <table className="markdown-table w-full my-2 border border-slate-500" {...props} />
                                    ),
                                    th: ({ node, ...props }) => (
                                        <th className="text-black bg-white font-bold py-2 px-3 border border-slate-400" {...props} />
                                    ),
                                    code({ node, inline, className, children, ...props }) {
                                        return !inline ? (
                                            <pre className={className + " rounded-md p-3 bg-[#181b32]"} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                        ) : (
                                            <code className={className + " bg-[#232554] px-1 py-0.5 rounded"} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {msg.text}
                            </ReactMarkdown>
                            {msg.streaming && (
                                <span className="inline-block w-3 h-3 align-middle bg-slate-400 rounded-full animate-pulse ml-2"></span>
                            )}
                            <div className="text-xs text-slate-300 text-right mt-1">{msg.time}</div>
                        </div>
                    </div>
                )
            )}
            <div ref={bottomRef} />
        </div>
    );
}