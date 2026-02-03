export function calculateScore(data: any) {
  const { income, recurring, leisure, savings, emergency, investment } = data;

  let savingsScore = 0;
  let emergencyScore = 0;
  let leisureScore = 0;
  let investmentScore = 0;
  let balanceScore = 0;

  const savingsRate = income > 0 ? savings / income : 0;
  const emergencyMonths = recurring > 0 ? emergency / recurring : 0;
  const leisureRate = income > 0 ? leisure / income : 0;
  const investmentRate = income > 0 ? investment / income : 0;

  // ---- SAVINGS SCORE (MAX 3) ----
  if (savingsRate >= 0.25) savingsScore = 3;
  else if (savingsRate >= 0.20) savingsScore = 2.5;
  else if (savingsRate >= 0.15) savingsScore = 2;
  else if (savingsRate >= 0.10) savingsScore = 1.5;
  else if (savingsRate > 0) savingsScore = 1;
  else savingsScore = 0;

  // ---- EMERGENCY FUND SCORE (MAX 2) ----
  if (emergencyMonths >= 6) emergencyScore = 2;
  else if (emergencyMonths >= 3) emergencyScore = 1.5;
  else if (emergencyMonths >= 1) emergencyScore = 1;
  else emergencyScore = 0;

  // ---- LEISURE SPENDING SCORE (MAX 2) ----
  if (leisureRate <= 0.15) leisureScore = 2;
  else if (leisureRate <= 0.25) leisureScore = 1.5;
  else if (leisureRate <= 0.35) leisureScore = 1;
  else leisureScore = 0;

  // ---- INVESTMENT SCORE (MAX 2) ----
  if (investmentRate >= 0.20) investmentScore = 2;
  else if (investmentRate >= 0.10) investmentScore = 1.5;
  else if (investmentRate > 0) investmentScore = 1;
  else investmentScore = 0;

  // ---- BALANCE SCORE (MAX 1) ----
  if (income >= recurring + leisure + investment) {
    balanceScore = 1;
  } else {
    balanceScore = 0;
  }

  const finalScore =
    savingsScore +
    emergencyScore +
    leisureScore +
    investmentScore +
    balanceScore;

  return Math.round(finalScore);
}

