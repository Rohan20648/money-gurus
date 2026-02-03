import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      income = 0,
      recurring = 0,
      leisure = 0,
      savings = 0,
      emergency = 0,
      investment = 0,
    } = await req.json();

    const insights: string[] = [];

    const totalExpenses = recurring + leisure + investment;
    const disposableIncome = income - totalExpenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const emergencyMonths = recurring > 0 ? emergency / recurring : 0;

    // ---- SAVINGS INSIGHTS ----
    if (savingsRate < 10) {
      insights.push(
        `Your current savings rate is ${savingsRate.toFixed(1)}% of your income. 
        This is lower than the recommended 20%. Increasing savings even gradually will greatly improve your financial security and future planning.`
      );
    } else if (savingsRate < 20) {
      insights.push(
        `You are saving ${savingsRate.toFixed(1)}% of your income. 
        This is a good habit, but slightly below the ideal benchmark of 20%. 
        Try reducing small unnecessary expenses to boost this number.`
      );
    } else {
      insights.push(
        `Excellent! You are saving ${savingsRate.toFixed(1)}% of your income. 
        This is a strong financial habit that will help you build long-term wealth.`
      );
    }

    // ---- EMERGENCY FUND ----
    if (emergencyMonths < 1) {
      insights.push(
        `Your emergency fund covers only about ${emergencyMonths.toFixed(1)} months of expenses. 
        This is risky. Aim to build at least 3–6 months of essential

