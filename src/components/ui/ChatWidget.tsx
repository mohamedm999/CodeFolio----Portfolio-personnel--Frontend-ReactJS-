import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../../services/gemini.service';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! 👋 I'm the AI assistant for M2Dev's portfolio. Ask me about Mohamed's skills, projects, or how to get in touch!" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');
        const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Call Gemini API
            const response = await sendMessageToGemini(userMessage, newMessages);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "Sorry, I'm having trouble right now. Please try the contact form to reach Mohamed!" 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] sm:w-[380px] h-[500px] bg-[#0c0c14] border border-gray-800 rounded-2xl shadow-2xl shadow-purple-900/20 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-gray-400 text-xs">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-purple-600 text-white rounded-br-none'
                                                : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-700 flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-purple-400" />
                                        <span className="text-gray-400 text-xs">Thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[#0a0a10] border-t border-white/5">
                            <div className="flex items-center gap-2 bg-gray-900/50 rounded-full border border-gray-800 px-4 py-2 focus-within:border-purple-500/50 transition-colors">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !inputValue.trim()}
                                    className="p-1.5 bg-purple-600 rounded-full text-white hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-600 text-center mt-2">
                                Powered by Gemini AI
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 flex items-center justify-center border-2 border-white/10"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>
        </div>
    );
};
