import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Success Get", data: [] });
}

export async function POST() {
  return NextResponse.json({ message: "Success Post", data: [] });
}
