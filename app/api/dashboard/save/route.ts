import { NextResponse } from "next/server";
import { store } from "../../_store";

export async function POST(req: Request) {
  const { username, portfolio } = await req.json();

  if (!store.users[username]) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  store.users[username].portfolio = portfolio;

  return NextResponse.json({ success: true });
}
