"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const params = useSearchParams();
  const userType = params.get("type");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        userType,
      }),
    });

    const data = await res.json();

    localStorage.setItem(
      "moneyguruUser",
      JSON.stringify({
        username: data.username,
        userType: data.userType,
      })
    );

    window.location.href = `/dashboard?type=${userType}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
      <div className="bg-white/5 backdrop-blur p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">

        <h1 className="text-3xl font-bold text-center">
          {userType === "student"
            ? "🎓 Student Login"
            : "👔 Professional Login"}
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full bg-black/40 text-white placeholder-gray-400 border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black/40 text-white placeholder-gray-400 border border-white/20 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Sign In →
        </button>

        <p className="text-gray-400 text-sm text-center">
          Demo login • No real authentication
        </p>

      </div>
    </main>
  );
}
