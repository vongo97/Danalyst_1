import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth/[...nextauth]/options";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "No active session" }, { status: 401 });
  }

  // Here you can add any server-side logout logic if needed, e.g., revoke tokens

  // Return a response indicating logout success
  return NextResponse.json({ message: "Logged out successfully" });
}
