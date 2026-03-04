'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPaperPlane, FaTimes, FaCircle } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";

interface WhatsAppWidgetProps {
    phoneNumber: string;
    assistantName?: string;
}

const WhatsAppWidget = ({ phoneNumber, assistantName = "Yashith" }: WhatsAppWidgetProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [botStatus, setBotStatus] = useState<'loading' | 'online' | 'offline'>('loading');
    const [error, setError] = useState<string | null>(null);

    // Check bot status on mount and when opened
    const checkStatus = async () => {
        try {
            const response = await fetch("/api/whatsapp/auth");
            const data = await response.json();
            if (data.authenticated) {
                setBotStatus('online');
            } else {
                setBotStatus('offline');
            }
        } catch (err) {
            setBotStatus('offline');
        }
    };

    useEffect(() => {
        checkStatus();
        // Poll status every 30 seconds if open
        const interval = setInterval(() => {
            if (isOpen) checkStatus();
        }, 30000);
        return () => clearInterval(interval);
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setError(null);
        try {
            const response = await fetch("/api/whatsapp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, to: phoneNumber }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSent(true);
                setMessage("");
                setTimeout(() => setIsSent(false), 5000);
            } else {
                // Instead of opening a new tab, show the error in the UI
                setError(data.error || "Failed to transmit message.");

                // Only if the user EXPLICITLY wants to use the old way, they can click a link
                // But per request, we avoid automatic new tabs.
            }
        } catch (err) {
            setError("Network error. Could not reach the Hub.");
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-[100] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 md:w-96 overflow-hidden rounded-2xl border border-white/10 bg-[#030014]/80 shadow-[0_0_50px_-12px_rgba(112,66,248,0.5)] backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 p-4 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                                        <FaWhatsapp className={`text-2xl drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] ${botStatus === 'online' ? 'text-green-400' : 'text-gray-500'}`} />
                                    </div>
                                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#030014] ${botStatus === 'online' ? 'bg-green-500 animate-pulse' :
                                            botStatus === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                                        }`}></span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white tracking-wide">
                                        {assistantName} <span className="text-gray-400 font-normal">| Space Hub</span>
                                    </h3>
                                    <p className={`text-[10px] font-medium uppercase tracking-widest ${botStatus === 'online' ? 'text-green-400/80' : 'text-red-400/80'
                                        }`}>
                                        {botStatus === 'online' ? 'Direct Link Active' : 'Link Offline'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="p-5 min-h-[150px] flex flex-col justify-end gap-4 overflow-y-auto max-h-[400px]">
                            {botStatus === 'offline' && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-2">
                                    <p className="text-[11px] text-red-400">
                                        ⚠️ The transmission bridge is offline. If you are the owner, please link your device at <code className="bg-black/40 px-1 rounded">/api/whatsapp/auth</code>.
                                    </p>
                                </div>
                            )}

                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-3 self-start max-w-[85%]">
                                <p className="text-sm text-gray-200">
                                    Greetings! 🚀 Send a message and it will be delivered directly to my device. No browser redirects!
                                </p>
                                <span className="text-[9px] text-gray-500 mt-1 block">Space Assistant • Just now</span>
                            </div>

                            {isSent && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-500/10 border border-green-500/30 rounded-2xl rounded-br-none p-3 self-end max-w-[85%]"
                                >
                                    <p className="text-xs text-green-400 flex items-center gap-2">
                                        <FaPaperPlane className="text-[10px]" /> Message transmitted successfully!
                                    </p>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3 self-center w-full"
                                >
                                    <p className="text-xs text-red-400 text-center">
                                        {error}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer / Input */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/10">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={botStatus === 'online' ? "Type your transmission..." : "Bridge offline..."}
                                    disabled={botStatus !== 'online'}
                                    className="w-full rounded-full bg-[#030014] border border-white/10 py-2.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all shadow-inner disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!message.trim() || botStatus !== 'online'}
                                    className="absolute right-1 p-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100"
                                >
                                    <FaPaperPlane className="text-xs" />
                                </button>
                            </div>
                            {botStatus !== 'online' && (
                                <p className="text-[9px] text-gray-500 mt-2 text-center">
                                    Link your WhatsApp at <span className="underline">/api/whatsapp/auth</span> to enable sending.
                                </p>
                            )}
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_20px_rgba(112,66,248,0.4)] transition-all duration-300 ${isOpen
                        ? "bg-red-500/20 border border-red-500/50 text-red-400 rotate-90"
                        : "bg-gradient-to-br from-[#2A0E61] to-[#030014] border border-purple-500/30 text-white"
                    }`}
            >
                {isOpen ? (
                    <FaTimes className="text-2xl" />
                ) : (
                    <div className="relative">
                        <HiOutlineChatAlt2 className="text-3xl" />
                        {botStatus === 'online' && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border border-[#030014] text-[8px] items-center justify-center font-bold text-white">1</span>
                            </span>
                        )}
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default WhatsAppWidget;
