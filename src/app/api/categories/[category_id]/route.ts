import { NextRequest, NextResponse } from "next/server";

import { CategorySchema, categorySchema } from "@/utils/types/categories";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Success Get", data: [] });
}

export async function PUT(request: NextRequest) {
  try {
    // TODO: Protect this endpoint (admin only)
    const { name } = (await request.json()) as CategorySchema;

    const validatedFields = categorySchema.safeParse({
      name,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Edit category failed, please check your input again",
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
          message: "Edit category failed, data not found",
          reason:
            "The category you're trying to update might not have been created yet",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Successfully edited category",
      data: [],
      reason: null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Edit category failed, please try again later",
        data: null,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // TODO: Protect this endpoint (admin only)

    // TODO: Delete record by id on database

    if (false) {
      return NextResponse.json(
        {
          message: "Delete category failed, data not found",
          reason:
            "The category you're trying to delete might not have been created yet",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Successfully deleted category",
      data: [],
      reason: null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Delete category failed, please try again later",
        data: null,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
