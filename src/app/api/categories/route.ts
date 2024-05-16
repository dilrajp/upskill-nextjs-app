import { NextRequest, NextResponse } from "next/server";

import { CategorySchema, categorySchema } from "@/utils/types/categories";
import { prisma } from "@/utils/configs/db";

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.category.findMany({
      cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json({ message: "Successfully get categories", data });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Get categories failed, please try again later",
        data: null,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
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

    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      {
        message: "Successfully added category to database",
        data,
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
