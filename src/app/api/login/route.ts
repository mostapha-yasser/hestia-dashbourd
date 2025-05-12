import { NextResponse } from "next/server";
import { UsersModel } from "@/models/users";



export async function POST(request: Request) {
    try {
        const userModel = await UsersModel.getInstance();
        await userModel.initIndexes?.();
        const payload = await request.json();
        const response = userModel.verifyUser(payload);
        return NextResponse.json(response);
      } catch {
        return NextResponse.json(
          { error: "Failed to fetch user" },
          { status: 500 }
        );
      }
}
