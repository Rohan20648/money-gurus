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
    if (savingsRate === 0) {
      insights.push(
        `You are currently not saving any part of your income. This leaves you financially vulnerable to emergencies and future goals. 
        Even starting with a small habit like saving 5–10% of income can dramatically improve your stability over time. 
        Consider setting up automatic monthly savings to build discipline.`
      );
    } 
    else if (savingsRate < 10) {
      insights.push(
        `Your current savings rate is only ${savingsRate.toFixed(1)}% of your income, which is very low. 
        Most financial experts recommend saving at least 20% of income. 
        At this rate it will be difficult to achieve major goals such as buying assets, traveling, or building wealth. 
        Try reducing non-essential expenses or increasing income to improve this number.`
      );
    } 
    else if (savingsRate < 20) {
      insights.push(
        `You are saving about ${savingsRate.toFixed(1)}% of your income. 
        This is a good start, but still slightly below the ideal 20% benchmark. 
        Gradually increasing your savings rate will give you more financial freedom and faster progress toward your goals.`
      );
    } 
    else {
      insights.push(
        `Excellent job! You are saving approximately ${savingsRate.toFixed(1)}% of your income. 
        This is a very healthy savings habit and puts you ahead of most people financially. 
        Continuing this approach will help you build wealth and security in the long run.`
      );
    }

    // ---- EMERGENCY FUND ----
    if (emergency === 0) {
      insights.push(
        `You currently do not have an emergency fund. 
        This is risky because any unexpected expense could put you into financial stress or debt. 
        Aim to build at least 3–6 months of essential expenses as soon as possible.`
      );
    }
    else if (emergencyMonths < 1) {
      insights.push(
        `Your emergency savings cover only about ${emergencyMonths.toFixed(1)} months of expenses. 
        This provides very little protection against unexpected situations. 
        Prioritizing this fund should be one of your main financial goals.`
      );
    }
    else if (emergencyMonths < 3) {
      insights.push(
        `You have an emergency fund that can cover roughly ${emergencyMonths.toFixed(1)} months of expenses. 
        This is a good start, but still below the recommended 3–6 month safety net. 
        Try to increase this gradually over the next few months.`
      );
    }
    else {
      insights.push(
        `Great work! Your emergency fund can support you for about ${emergencyMonths.toFixed(1)} months. 
        This gives you strong financial security and peace of mind.`
      );
    }

    // ---- SPENDING BEHAVIOR ----
    if (income > 0) {
      const leisurePercent = (leisure / income) * 100;

      if (leisurePercent > 35) {
        insights.push(
          `You are spending a very high portion of your income (${leisurePercent.toFixed(1)}%) on leisure and non-essential activities. 
          This may be limiting your ability to save and invest. 
          Setting a monthly spending cap for entertainment could greatly improve your finances.`
        );
      } 
      else if (leisurePercent > 20) {
        insights.push(
          `Around ${leisurePercent.toFixed(1)}% of your income goes toward leisure. 
          This is reasonable, but reducing it slightly could help you save more aggressively and reach goals faster.`
        );
      }
    }

    // ---- INVESTMENT INSIGHTS ----
    if (investment === 0) {
      insights.push(
        `You currently have no monthly investments. 
        This means you may be missing out on long-term wealth creation through compound interest. 
        Even small regular investments can grow significantly over time.`
      );
    } else {
      insights.push(
        `You are investing ₹${investment} per month, which is an excellent financial habit. 
        Ensure your investments are diversified and aligned with your long-term goals such as retirement or education.`
      );
    }

    // ---- OVERALL FINANCIAL HEALTH ----
    if (disposableIncome < 0) {
      insights.push(
        `Warning: Your expenses are higher than your income. 
        This means you are living beyond your means and could fall into debt. 
        Immediate budget adjustments are necessary to restore financial balance.`
      );
    } 
    else if (disposableIncome < income * 0.1) {
      insights.push(
        `You are left with very little disposable income after expenses. 
        This limits your financial flexibility. 
        Reducing fixed expenses or increasing income would strengthen your financial position.`
      );
    } 
    else {
      insights.push(
        `Your finances appear to be well balanced with a healthy amount of disposable income left each month. 
        Continue monitoring your budget to maintain this positive situation.`
      );
    }

    return NextResponse.json({
      insights
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
