"use client";

import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SelectUser() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center`}
    >
      <section className="bg-white/5 backdrop-blur p-10 rounded-2xl shadow-lg space-y-6 text-center max-w-md w-full animate-fade-in">

        <h2 className="text-4xl font-bold">Who are you?</h2>
        <p className="text-gray-300 text-lg">
          Choose a profile to personalize your financial journey.
        </p>

        <Link href="/login?type=student">
          <button className="w-full bg-green-500 text-black py-3 rounded-xl text-lg font-semibold hover:scale-105 transition-transform">
            🎓 Student
          </button>
        </Link>

        <Link href="/login?type=adult">
          <button className="w-full bg-blue-500 text-black py-3 rounded-xl text-lg font-semibold hover:scale-105 transition-transform">
            👔 Working Professional
          </button>
        </Link>

      </section>

      {/* same animation as home */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
