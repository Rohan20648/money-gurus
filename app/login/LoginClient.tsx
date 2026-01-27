"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState<"student" | "adult">("student");

  function handleLogin() {
    localStorage.setItem(
      "moneyguruUser",
      JSON.stringify({ username, userType })
    );

    window.location.href = redirect;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/5 p-8 rounded-2xl space-y-4 w-96">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 rounded bg-black/40"
        />

        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as any)}
          className="w-full p-3 rounded bg-black/40"
        >
          <option value="student">Student</option>
          <option value="adult">Working Adult</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-black py-3 rounded-xl font-semibold"
        >
          Login →
        </button>
      </div>
    </main>
  );
}

