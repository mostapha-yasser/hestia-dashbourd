import { NextResponse } from "next/server";
import { UsersModel } from "@/models/users";
import { UserInput } from "@/types/user";



export async function POST(request: Request) {
  try {
    const userData: UserInput = await request.json();

    if (
      !userData.fullName ||
      !userData.address ||
      !userData.password ||
      !userData.address ||
      !userData.city ||
      !userData.address ||
      !userData.whatsApp
    ) {
      return NextResponse.json({ error: "missing filed" }, { status: 400 });
    }

    const userModel = await UsersModel.getInstance();
    const user = await userModel.create(userData);

    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create User" },
      { status: 500 }
    );
  }
}
