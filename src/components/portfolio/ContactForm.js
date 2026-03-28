"use client";

import { useState } from "react";
import { createMessage } from "@/services/messages";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    content: "",
    category: "Inquiry"
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createMessage(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", content: "", category: "Inquiry" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-12 border border-green-500/30 bg-green-500/5 rounded-2xl text-center space-y-4">
        <div className="flex justify-center text-green-500">
          <CheckCircle size={48} />
        </div>
        <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
        <p className="text-neutral-400">Thank you for reaching out. I'll get back to you soon.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold text-white underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-400">Your Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-400">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-neutral-400">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
        >
          <option value="Inquiry">General Inquiry</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Project">New Project</option>
          <option value="Feedback">Feedback</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-neutral-400">Subject</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-neutral-400">Message</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows="5"
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition disabled:opacity-50"
      >
        <Send size={18} /> {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
