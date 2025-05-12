import { NextResponse } from "next/server";
import { DBOrder, OrderInput } from "../../../types/order";
import { OrderModel } from "../../../models/order";
import { Filter } from "mongodb";
import { verifyJWT } from "@/lib/session";

export async function GET(request: Request) {
  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }
  

  try {
    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ] as const;
    type ValidOrderStatus = (typeof validStatuses)[number];
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const orderStatus = searchParams.get("orderStatus");

    const filter: Filter<DBOrder> = {};

    if (status) {
      filter.status = status;
    }

    if (minPrice && maxPrice) {
      filter.totalPrice = {};
      filter.totalPrice.$gte = +minPrice;
      filter.totalPrice.$lte = +maxPrice;
    }

    if (
      orderStatus &&
      validStatuses.includes(orderStatus as ValidOrderStatus)
    ) {
      filter.orderStatus = orderStatus as ValidOrderStatus;
    }

    const orderModel = await OrderModel.getInstance();

    const orders = Object.keys(filter).length
      ? await orderModel.filterOrders(filter)
      : await orderModel.findAll();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }

  try {
    const orderData: OrderInput = await request.json();

    if (!orderData.items) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const orderModel = await OrderModel.getInstance();
    const newOrder = await orderModel.create(orderData);

    return NextResponse.json(newOrder, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
