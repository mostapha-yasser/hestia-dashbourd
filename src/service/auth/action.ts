"use server"
import { z } from "zod";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "./adminService";

const adminSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(10, { message: "Password must be at least 10 characters" })
    .trim(),
});
export async function login(prevState: unknown, formData: FormData) {
  const validation = adminSchema.safeParse(Object.fromEntries(formData));
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validation.data;

  const admin = await verifyAdminCredentials(email, password);
  if (!admin) {
    return { error: "Invalid email or password" };
  }

  await createSession(admin._id);
  return { success: true, message: "successful login in" };
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
