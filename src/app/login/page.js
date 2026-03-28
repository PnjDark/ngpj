"use client";

import { useState } from "react";
import { useAuth } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white p-6">
      <div className="w-full max-w-md p-8 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
