import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
const SECRETKEY = process.env.JWT_SECRET;
const encodeKey = new TextEncoder().encode(SECRETKEY);
type sessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: sessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodeKey);
}
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}
export async function createSession(userId: ObjectId ) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: userId.toString(), expiresAt });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}
export async function deleteSession() {
  (await cookies()).delete("session");
}

export const verifyJWT = async (request: Request) => {
  try {
    let token;
    const authHeader = request.headers.get("Authorization");
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      const cookieHeader = request.headers.get("cookie");
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        
        token = cookies.session;
      }
    }

    if (!token) {
      return { verified: false, error: "No token provided" };
    }

    const payload = await decrypt(token);
    if (!payload) {
      return { verified: false, error: "Invalid token" };
    }
    
    return { verified: true, user: payload };
  } catch  {
    return { verified: false, error: "Invalid token" };
  }
};