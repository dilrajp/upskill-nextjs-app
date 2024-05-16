import { NextRequest, NextResponse } from "next/server";

import { productSchema } from "@/utils/types/products";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Success Get", data: [] });
}

export async function PUT(request: NextRequest) {
  try {
    // TODO: Protect this endpoint (admin only)
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as File;
    const category_id = formData.get("category_id") as string;

    const validatedFields = productSchema.safeParse({
      name,
      description,
      price,
      image: image ?? undefined,
      category_id,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Edit transaction failed, please check your input again",
          data: null,
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // TODO: Edit record on database

    if (false) {
      return NextResponse.json(
        {
          message: "Edit transaction failed, data not found",
          reason:
            "The transaction you're trying to update might not have been created yet",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Successfully edited transaction",
      data: [],
      reason: null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Edit transaction failed, please try again later",
        data: null,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
