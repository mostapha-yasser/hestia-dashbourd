import { NextResponse } from "next/server";
import { OrderModel } from "../../../../models/order";
import { verifyJWT } from "@/lib/session";

export async function GET(
  request: Request,
  { params }: { params:Promise<{id:string}> }
) {

  const id = (await params).id;
  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }

  try {
    const orderModel = await OrderModel.getInstance();
    const order = await orderModel.findById(id);

    if (!order) {
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params:Promise<{id:string}> }
) {

  const id = (await params).id;
  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }

  try {
    const updateData = await request.json();

    const orderModel = await OrderModel.getInstance();
    const updatedOrder = await orderModel.update(id, updateData);

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch  {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params:Promise<{id:string}> }
) {

  const id = (await params).id;
  try {
    
    const orderModel = await OrderModel.getInstance();
    const deleted = await orderModel.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "order deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
