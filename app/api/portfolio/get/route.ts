import { NextResponse } from "next/server";
import { store } from "../../_store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  const user = store.users[username!];
  if (!user || !user.portfolio) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json({
    userType: user.userType,
    ...user.portfolio,
  });
}
