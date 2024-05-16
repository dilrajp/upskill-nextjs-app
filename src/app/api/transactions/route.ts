import { NextRequest, NextResponse } from "next/server";

import { productSchema } from "@/utils/types/products";

export async function GET(request: NextRequest) {
  // TODO: Create reusable function to handle query params
  const searchParams = request.nextUrl.searchParams;

  console.log(searchParams.get("page"));
  return NextResponse.json({ message: "Success Get", data: [] });
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Protect this endpoint (admin only)

    // TODO: Handle transaction using midtrans

    return NextResponse.json(
      {
        message: "Successfully check out",
        data: [],
        reason: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Create transaction failed, please try again later",
        data: null,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
