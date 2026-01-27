"use client";

import { useSearchParams } from "next/navigation";

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User: {username}</p>
    </div>
  );
}
