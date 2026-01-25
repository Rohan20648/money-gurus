export type User = {
  username: string;
  userType: "student" | "adult";
};

export type Portfolio = {
  income: number;
  recurring: number;
  leisure: number;
  savings: number;
  emergency: number;
  investment: number;
  borrow?: number;
  score: number;
};

export const users = new Map<string, User>();
export const portfolios = new Map<string, Portfolio>();
