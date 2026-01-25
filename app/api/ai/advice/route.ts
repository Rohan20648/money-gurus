import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const raw = await req.json();

  // ✅ FORCE numbers + defaults (THIS IS THE FIX)
  const income = Number(raw.income) || 0;
  const savings = Number(raw.savings) || 0;
  const emergency = Number(raw.emergency) || 0;
  const recurring = Number(raw.recurring) || 0;
  const investment = Number(raw.investment) || 0;
  const leisure = Number(raw.leisure) || 0;

  const advice: string[] = [];

  // Savings logic
  if (income > 0 && savings < income * 0.1) {
    advice.push("Increase savings to at least 10–20% of your income.");
  } else if (savings >= income * 0.25) {
    advice.push("Great savings discipline. You're ahead of most people.");
  }

  // Emergency fund logic
  if (recurring > 0 && emergency < recurring * 3) {
    advice.push("Build an emergency fund covering 3–6 months of expenses.");
  } else if (emergency >= recurring * 6) {
    advice.push("Your emergency fund is very strong. Well done.");
  }

  // Investment logic
  if (investment <= 0) {
    advice.push("Start investing small amounts consistently to benefit from compounding.");
  } else if (investment >= income * 0.15) {
    advice.push("Excellent investment habit. Long-term wealth building is on track.");
  }

  // Leisure spending logic
  if (income > 0 && leisure > income * 0.4) {
    advice.push("Leisure spending is high. Cutting it slightly can boost savings.");
  } else if (leisure <= income * 0.2) {
    advice.push("You maintain good control over discretionary spending.");
  }

  // Fallback
  if (advice.length === 0) {
    advice.push("Excellent financial balance. Keep monitoring your monthly trends.");
  }

  return NextResponse.json({
    advice: advice.join(" "),
  });
}
