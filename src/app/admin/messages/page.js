"use client";

import { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "@/services/messages";
import { Trash2, Mail, User, Tag, Calendar } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const fetchedMessages = await getMessages();
    setMessages(fetchedMessages.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this message?")) {
      await deleteMessage(id);
      fetchMessages();
    }
  };

  if (loading) return <div className="text-white">Loading messages...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold mb-2">Messages</h1>
        <p className="text-neutral-500">View and manage inquiries from your portfolio visitors.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {messages.map((message) => (
          <div key={message.id} className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900 group relative">
            <button
              onClick={() => handleDelete(message.id)}
              className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={20} />
            </button>

            <div className="flex flex-wrap gap-6 mb-8 text-sm font-semibold uppercase tracking-widest text-neutral-500">
              <div className="flex items-center gap-2"><User size={14} /> {message.name}</div>
              <div className="flex items-center gap-2"><Mail size={14} /> {message.email}</div>
              <div className="flex items-center gap-2"><Tag size={14} /> {message.category}</div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {message.createdAt?.seconds ? new Date(message.createdAt.seconds * 1000).toLocaleDateString() : "Recently"}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">{message.subject}</h3>
            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="p-12 border border-dashed border-neutral-800 rounded-2xl text-center text-neutral-500">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
