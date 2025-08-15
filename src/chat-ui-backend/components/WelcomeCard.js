export default function WelcomeCard() {
    return (
        <div className="bg-[#1c1f37]/80 rounded-lg p-5 max-w-xl mx-auto text-center border border-[#282e5e] mb-6 mt-2">
            <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-300 mb-2">ยินดีต้อนรับสู่ AI Assistant</h2>
            <p className="text-slate-300 text-sm mb-4">ผู้ช่วยอัจฉริยะที่พร้อมตอบทุกคำถามและช่วยเหลือคุณในทุกด้าน</p>
            <div className="flex flex-wrap justify-center gap-2">
                <button className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-sm py-1.5 px-3 rounded-full border border-indigo-500/30 transition-all">ถามคำถาม</button>
                <button className="bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 text-sm py-1.5 px-3 rounded-full border border-slate-600/30 transition-all">สร้างเนื้อหา</button>
                <button className="bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 text-sm py-1.5 px-3 rounded-full border border-slate-600/30 transition-all">วิเคราะห์ข้อมูล</button>
            </div>
        </div>
    );
}
