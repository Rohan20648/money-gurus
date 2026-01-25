import { NextResponse } from "next/server";
import { store } from "../../_store";

export async function POST(req: Request) {
  const { username, userType } = await req.json();

  if (!username || !userType) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (!store.users[username]) {
    store.users[username] = {
      username,
      userType,
      borrows: [],
      trustScore: 100,
    };
  }

  return NextResponse.json(store.users[username]);
}
