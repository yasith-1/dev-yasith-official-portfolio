'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle, FaSpinner, FaRocket } from 'react-icons/fa';

export default function WhatsAppAuthPage() {
    const [qr, setQr] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'qr' | 'authenticated' | 'error'>('loading');
    const [message, setMessage] = useState('Establishing connection to Galactic Bridge...');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/whatsapp/auth');
                const data = await res.json();

                if (data.authenticated) {
                    setStatus('authenticated');
                    setMessage('Galactic Bridge is active and ready!');
                } else if (data.qr) {
                    setQr(data.qr);
                    setStatus('qr');
                    setMessage('Scan the QR code below using WhatsApp Linked Devices.');
                } else {
                    setMessage(data.message || 'Waiting for bridge to initialize...');
                }
            } catch (err) {
                setStatus('error');
                setMessage('Failed to reach the Galactic Bridge. Check terminal logs.');
            }
        };

        checkAuth();
        const interval = setInterval(checkAuth, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4 font-sans selection:bg-purple-500/30">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(112,66,248,0.4)]"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 mb-6 shadow-[0_0_30px_rgba(112,66,248,0.5)]">
                        {status === 'authenticated' ? <FaCheckCircle className="text-4xl text-white" /> : <FaWhatsapp className="text-4xl text-white" />}
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                        WhatsApp Galactic Bridge
                    </h1>
                    <p className={`mt-3 text-sm font-medium tracking-wide ${status === 'authenticated' ? 'text-green-400' : 'text-gray-400'}`}>
                        {message}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[250px] bg-black/40 rounded-2xl border border-white/5 transition-all duration-500">
                    {status === 'loading' && (
                        <div className="flex flex-col items-center gap-4">
                            <FaSpinner className="text-4xl text-purple-500 animate-spin" />
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Accessing Hub...</p>
                        </div>
                    )}

                    {status === 'qr' && qr && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        >
                            <QRCodeSVG value={qr} size={200} />
                        </motion.div>
                    )}

                    {status === 'authenticated' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40">
                                <FaRocket className="text-3xl text-green-400 animate-bounce" />
                            </div>
                            <p className="text-sm font-semibold text-green-400 uppercase tracking-widest">Connection Live</p>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <div className="text-center p-6">
                            <p className="text-red-400 text-sm">{message}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs transition-all"
                            >
                                Retry Connection
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Setup Instructions</h4>
                    <ul className="space-y-3">
                        {[
                            "Open WhatsApp on your mobile device.",
                            "Navigate to Settings > Linked Devices.",
                            "Tap on 'Link a Device'.",
                            "Point your camera to the space-grid QR above."
                        ].map((step, i) => (
                            <li key={i} className="flex gap-3 text-xs text-gray-400">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-purple-400 font-bold">
                                    {i + 1}
                                </span>
                                <span className="leading-5">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}
