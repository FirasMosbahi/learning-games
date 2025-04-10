"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Message } from "@learning-game/types/message";
import ChatMessage from "@learning-game/components/chat/ChatMessage";

export default function Chat() {
  const [name, setName] = useState<string | undefined>(undefined);
  const [inputName, setInputName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    pollingIntervalRef.current = setInterval(fetchMessages, 2000);
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { text: message, sender: name };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setMessage(""); // Clear input
      await fetchMessages(); // Fetch updated messages immediately
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Image
        className="absolute z-10 top-10 right-28 cursor-pointer size-12 border border-transparent rounded-full bg-blue-300 flex flex-row items-center justify-center"
        src="/chat.png"
        alt="chat icon"
        width={500}
        height={500}
        onClick={() => setIsOpen((value) => !value)}
      />
      {isOpen && (
        <div className="w-[320px] h-[360px] mx-auto p-4 z-50 fixed bottom-8 right-8 bg-white border-2 rounded-xl border-blue-300">
          {name || (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setName(inputName);
              }}
              className="flex flex-col justify-center items-center h-full gap-8"
            >
              <p className="text-xl text-black text-center">
                أدخل إسمك لتدخل المحادثة
              </p>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="border placeholder-gray-200 text-black p-2"
              />
              <button type="submit" className="bg-blue-500 text-black p-2">
                إبدأ المحادثة
              </button>
            </form>
          )}
          {name && (
            <div className="h-64 flex flex-col gap-y-4 border rounded p-2 mb-2 overflow-y-auto">
              {messages.map((msg, i) => (
                <ChatMessage user={name} message={msg} key={i} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
          {name && (
            <form onSubmit={sendMessage} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border placeholder-gray-200 text-black p-2"
                placeholder="أكتب رسالة"
              />
              <button type="submit" className="bg-blue-500 text-black p-2">
                أرسل
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
