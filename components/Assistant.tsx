import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { ChatMessage, LanguageCode } from '../types';
import { TRANSLATIONS, MOCK_PACKAGES } from '../constants';

interface AssistantProps {
  currentLang?: LanguageCode;
}

export const Assistant: React.FC<AssistantProps> = ({ currentLang = 'fr' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = TRANSLATIONS[currentLang];
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize greeting when language changes or on first load if empty
  useEffect(() => {
    // Only reset/add greeting if the conversation hasn't really started or to update the first message if it was the default one
    setMessages(prev => {
        if (prev.length === 0) {
             return [{ role: 'model', text: t.ai_greeting, timestamp: new Date() }];
        }
        return prev;
    });
  }, [currentLang, t.ai_greeting]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal ChatMessage to the format service expects (simple role/text)
      const historyForAi = messages.map(m => ({ role: m.role, text: m.text }));
      
      // We pass MOCK_PACKAGES as context. In a real app, this would be fetched from user state/API
      // Note: We cast MOCK_PACKAGES to any because of the readonly constraint in constants vs the interface,
      // but the structure matches.
      const responseText = await chatWithAssistant(historyForAi, userMsg.text, [...MOCK_PACKAGES]);
      
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-babbel-800 to-babbel-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-sm">Hermès AI</h3>
                <p className="text-xs text-babbel-100">{t.ai_role}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-babbel-600 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-babbel-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-babbel-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-babbel-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.ai_placeholder}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-babbel-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-babbel-600 text-white p-2 rounded-full hover:bg-babbel-700 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'rotate-90 opacity-0 pointer-events-none absolute' : 'rotate-0 opacity-100'} transition-all duration-300 bg-gradient-to-r from-babbel-600 to-babbel-800 hover:shadow-xl hover:scale-105 text-white p-4 rounded-full shadow-lg flex items-center gap-2`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="font-semibold hidden md:block">{t.ai_help_btn}</span>
      </button>
    </div>
  );
};