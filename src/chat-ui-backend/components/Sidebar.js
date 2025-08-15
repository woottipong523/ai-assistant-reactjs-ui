export default function Sidebar() {
    return (
        <aside className="fixed z-40 top-0 left-0 h-full w-64 pt-16 bg-[#171930] border-r border-[#282e5e] flex flex-col">
            <div className="p-4">
                <input
                    className="w-full py-2 px-4 rounded-full bg-[#232554] border border-[#22264c] text-sm text-slate-200 focus:outline-none mb-5"
                    placeholder="ค้นหาการสนทนา"
                />
                <div className="text-xs text-slate-400 font-semibold mb-2">การสนทนาโปรแกรมมิ่งล่าสุด</div>
                <div className="space-y-1">

                    {/* Chat: Coding Assistant */}
                    <div className="flex items-center p-2 rounded-lg bg-[#322d8f]/40 border border-indigo-500/20 mb-1 cursor-pointer hover:bg-[#39369a] transition">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <div className="ml-3 flex-1">
                            <div className="text-sm font-medium text-white">AI Coding Assistant</div>
                            <div className="text-xs text-slate-300 truncate">แนะนำวิธีเขียนโค้ด, debug</div>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-indigo-500 ml-1"></div>
                    </div>

                    {/* Chat: Node.js Tips */}
                    <div className="flex items-center p-2 rounded-lg hover:bg-[#22264c] cursor-pointer transition">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <div className="ml-3 flex-1">
                            <div className="text-sm font-medium text-slate-200">Node.js Tricks</div>
                            <div className="text-xs text-slate-400 truncate">Best practice, async</div>
                        </div>
                        <span className="text-xs text-slate-500">13:12</span>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="text-xs text-slate-400 font-semibold mb-2">AI ผู้ช่วยเขียนโปรแกรม</div>
                    <div className="space-y-2">

                        {/* สร้างโค้ดตัวอย่าง */}
                        <div className="flex items-center p-3 rounded-lg bg-[#232554]/60 hover:bg-[#22264c] cursor-pointer transition">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l-4-4-4 4m8-8l-4 4-4-4" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <div className="text-sm font-medium text-slate-200">สร้างโค้ดตัวอย่าง</div>
                                <div className="text-xs text-slate-400">Python, JS, PHP ฯลฯ</div>
                            </div>
                        </div>

                        {/* ถามคำสั่ง Git */}
                        <div className="flex items-center p-3 rounded-lg bg-[#232554]/60 hover:bg-[#22264c] cursor-pointer transition">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2M12 13v-2m0 0V7m0 4h.01" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <div className="text-sm font-medium text-slate-200">ถามคำสั่ง Git</div>
                                <div className="text-xs text-slate-400">branch, merge, conflict, remote</div>
                            </div>
                        </div>

                        {/* ถาม Regex & Automation */}
                        <div className="flex items-center p-3 rounded-lg bg-[#232554]/60 hover:bg-[#22264c] cursor-pointer transition">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l5-5 5 5" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <div className="text-sm font-medium text-slate-200">Regex & Automation</div>
                                <div className="text-xs text-slate-400">Regular expression, bash, cron</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
