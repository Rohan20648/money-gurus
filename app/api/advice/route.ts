import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    income = 0,
    recurring = 0,
    leisure = 0,
    savings = 0,
    emergency = 0,
    investment = 0,
  } = await req.json();

  const advice: string[] = [];

  const savingsRate = income > 0 ? savings / income : 0;
  const leisureRate = income > 0 ? leisure / income : 0;
  const emergencyMonths = recurring > 0 ? emergency / recurring : 0;

  // 1️⃣ Savings discipline
  if (savingsRate < 0.1) {
    advice.push(
      "Your savings rate is very low. Try to save at least 10–20% of your monthly income."
    );
  } else if (savingsRate >= 0.2) {
    advice.push(
      "Great job maintaining a strong savings habit. Consistency here builds long-term stability."
    );
  }

}
