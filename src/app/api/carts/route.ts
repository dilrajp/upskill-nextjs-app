import { NextResponse, NextRequest } from "next/server";

import { CartSchema, cartSchema } from "@/utils/types/carts";
import { prisma } from "@/utils/configs/db";

export const POST = async (request: NextRequest) => {
  try {
    // TODO: Protect this endpoint

    const { product_id, quantity } = (await request.json()) as CartSchema;
    const userId = ""; // TODO: Get user ID from auth

    const validatedFields = cartSchema.safeParse({
      product_id,
      quantity,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Add item failed, please check your input again",
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.upsert({
      where: { user_id: userId },
      update: {},
      create: {
        user_id: userId,
      },
    });

    const existingItem = await prisma.cartItem.findFirst({
      where: { cart_id: cart?.id, product_id },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { cart_id: cart?.id, product_id: product_id!, quantity },
      });
    }

    return NextResponse.json({
      message: "Successfully added item to cart",
      data: null,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Add item failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    // TODO: Protect this endpoint

    const data = await prisma.cart.upsert({
      where: {
        user_id: "", // TODO: Get user ID from auth
      },
      update: {},
      create: {
        user_id: "", // TODO: Get user ID from auth
      },
      include: {
        cart_items: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      message: "Successfully get cart",
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Get cart failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
