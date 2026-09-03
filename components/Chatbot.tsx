"use client";

import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What projects have you built?",
  "What's your experience with React?",
  "Are you open to new opportunities?",
  "How can I contact you?",
];

function MarkdownText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) {
          return <p key={i} className="font-bold text-sm mt-2">{line.replace("### ", "")}</p>;
        }
        if (line.startsWith("## ")) {
          return <p key={i} className="font-bold mt-2">{line.replace("## ", "")}</p>;
        }
        if (line.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-1" style={{ color: "#d97706" }}>•</span>
              <span>{renderInline(line.replace("- ", ""))}</span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! 👋 I'm ${portfolioData.name}'s AI assistant. Ask me anything about their experience, projects, or skills!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please check your internet and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 text-black rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: "#d97706",
          boxShadow: "0 0 30px rgba(217,119,6,0.55)",
        }}
        aria-label="Open AI chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl flex flex-col overflow-hidden"
          style={{
            height: "500px",
            background: "rgba(10,10,14,0.97)",
            border: "1px solid rgba(217,119,6,0.25)",
            boxShadow: "0 25px 80px rgba(217,119,6,0.2)",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #b45309, #d97706)" }}
          >
            <div className="w-9 h-9 bg-black/20 rounded-full flex items-center justify-center text-lg font-bold text-black">
              {portfolioData.name.charAt(0)}
            </div>
            <div>
              <p className="text-black font-semibold text-sm">{portfolioData.name}</p>
              <p className="text-black/60 text-xs">AI Portfolio Assistant • Online</p>
            </div>
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm text-gray-100">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed`}
                  style={
                    msg.role === "user"
                      ? { background: "#d97706", color: "#000", borderBottomRightRadius: "4px" }
                      : { background: "rgba(255,255,255,0.06)", color: "#f5f5f5", borderBottomLeftRadius: "4px" }
                  }
                >
                  {msg.role === "assistant" ? (
                    <MarkdownText text={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#d97706", animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#d97706", animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#d97706", animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="text-xs" style={{ color: "rgba(217,119,6,0.6)" }}>Try asking:</p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="block w-full text-left px-3 py-2 text-xs rounded-xl transition-colors"
                    style={{
                      background: "rgba(217,119,6,0.08)",
                      border: "1px solid rgba(217,119,6,0.2)",
                      color: "#d4d4d4",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(217,119,6,0.16)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(217,119,6,0.08)")}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 flex gap-2" style={{ borderTop: "1px solid rgba(217,119,6,0.15)" }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 text-gray-100 placeholder-gray-500 text-sm px-3 py-2 rounded-xl focus:outline-none disabled:opacity-50"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(217,119,6,0.2)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(217,119,6,0.6)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(217,119,6,0.2)")}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 text-black rounded-xl flex items-center justify-center transition-colors disabled:opacity-40"
              style={{ background: "#d97706" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#b45309")}
              onMouseLeave={e => (e.currentTarget.style.background = "#d97706")}
            >
              <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
