import { NextRequest, NextResponse } from "next/server";

import { CategorySchema, categorySchema } from "@/utils/types/categories";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Success Get", data: [] });
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Protect this endpoint (admin only)
    const { name } = (await request.json()) as CategorySchema;

    const validatedFields = categorySchema.safeParse({
      name,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Add category failed, please check your input again",
          data: null,
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // TODO: Create new record on database

    return NextResponse.json(
      {
        message: "Successfully added category to database",
        data: [],
        reason: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Add category failed, please try again later",
        data: null,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
