"use client";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white`}>

      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-7xl font-extrabold tracking-tight animate-fade-in">
          Money<span className="text-green-400">Guru</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-3xl mt-6 leading-relaxed">
          Intelligent financial guidance that turns daily money decisions  
          into structured, long-term financial discipline.
        </p>

        <Link href="/select-user">
          <button className="mt-10 px-12 py-4 rounded-full bg-green-500 text-black font-semibold text-lg hover:scale-105 transition-transform">
            Launch Application →
          </button>
        </Link>
      </section>

      {/* SUBTLE DIVIDER */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

      {/* VALUE PROPOSITION */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center space-y-6">
        <h2 className="text-4xl font-bold">Beyond Basic Tracking</h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          Traditional finance apps only display transactions.  
          MoneyGuru evaluates the <span className="text-white">quality of financial behavior</span>—  
          helping you understand whether your habits are moving you toward security and growth.
        </p>
      </section>

      {/* HOW IT WORKS – CLEAN STRUCTURE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">How MoneyGuru Works</h2>

        <div className="grid md:grid-cols-3 gap-12 text-center">

          <div>
            <h3 className="text-2xl font-semibold mb-2">Capture Data</h3>
            <p className="text-gray-400">
              Enter income, expenses, savings, and investment details to create a clear monthly snapshot.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Analyze Discipline</h3>
            <p className="text-gray-400">
              Our engine measures financial behavior rather than just account balances.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Receive Guidance</h3>
            <p className="text-gray-400">
              A monthly Guru Score and tailored insights help you improve intelligently over time.
            </p>
          </div>

        </div>
      </section>

      {/* USER TYPES – ELEGANT STYLE */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-16">

        <div>
          <h3 className="text-3xl font-bold mb-3">Student Profile</h3>
          <p className="text-gray-400 leading-relaxed">
            Designed to build responsible financial habits early.  
            Smart borrowing rules and structured limits encourage accountability without risk.
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-3">Working Professional Profile</h3>
          <p className="text-gray-400 leading-relaxed">
            Gain clarity on expense quality, savings discipline, and investment consistency  
            to maintain long-term financial health.
          </p>
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24">
        <h2 className="text-4xl font-bold mb-4">Take Control of Your Finances</h2>
        <p className="text-gray-400 mb-8">
          Simple inputs. Smart analysis. Clear direction.
        </p>

        <Link href="/select-user">
          <button className="px-12 py-4 rounded-full bg-green-500 text-black font-semibold hover:scale-105 transition">
            Get Started →
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-sm pb-10">
        MoneyGuru • Financial discipline powered by intelligent insights
      </footer>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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

