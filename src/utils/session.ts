import { jwtVerify, SignJWT } from "jose";
import { Cookies } from "react-cookie";
import { Session, SessionAkun, SessionPayload } from "./interfaces";

const secretKey: string = import.meta.env.VITE_SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  const parsedPayload = { ...payload };
  return new SignJWT(parsedPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = "",
): Promise<Session | false> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    if (
      typeof payload.akun === "object" &&
      typeof payload.expiresAt === "string" &&
      typeof payload.exp === "number" &&
      typeof payload.iat === "number"
    ) {
      return {
        akun: payload.akun as SessionAkun,
        expiresAt: new Date(payload.expiresAt),
        exp: payload.exp,
        iat: payload.iat,
      };
    }

    return false;
  } catch {
    return false;
  }
}

export async function createSession(akun: SessionAkun) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ akun, expiresAt });
  const cookies = new Cookies();
  cookies.set("auth", session, {
    httpOnly: false,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const cookies = new Cookies();
  const session = cookies.get("auth");
  const payload = await decrypt(session);

  if (!session || !payload) return null;

  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

  cookies.set("auth", session, {
    httpOnly: false,
    secure: false,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  await new Cookies().remove("auth");
}
