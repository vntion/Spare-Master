import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSession, encodedKey, encrypt } from "../../src/utils/session";
import { SessionAkun, SessionPayload } from "../../src/utils/interfaces";
import { jwtVerify } from "jose";

/**
 * Skenario tes
 *
 * - fungsi encrypt
 * - return JWT ketika input payload diberikan
 *
 * - fungsi createSession
 * - membuat cookies baru saat payload diberikan dan tidak return apapun
 */

const mockSetCookies = vi.fn();

vi.mock("react-cookie", () => {
  const MockCookies = function () {
    return {
      set: mockSetCookies,
      get: vi.fn(),
      remove: vi.fn(),
    };
  };

  return {
    Cookies: vi.fn().mockImplementation(MockCookies),
  };
});

describe("encrypt function", () => {
  it("return JWT ketika input payload diberikan", async () => {
    //////
    //  Arrange
    //////
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const akun: SessionAkun = {
      id: "1",
      nama: "test",
      email: "test@gmail.com",
      role: "user",
      profile: "abc.com",
    };

    const payload: SessionPayload = { akun, expiresAt };

    //////
    //  Action
    //////
    const token = await encrypt(payload);

    //////
    //  Assert
    //////
    expect(typeof token).toBe("string");
    expect(token).not.toBe("");

    const parts = token.split(".");
    expect(parts).toHaveLength(3);

    const { payload: decoded, protectedHeader } = await jwtVerify(
      token,
      encodedKey,
    );

    expect(decoded).toMatchObject({
      ...payload,
      expiresAt: expiresAt.toISOString(),
    });
    expect(protectedHeader.alg).toBe("HS256");
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });
});

describe("createSession function", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockSetCookies.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("membuat cookies baru saat payload diberikan dan tidak return apapun", async () => {
    //////
    //  Arrange
    //////
    const mockDate = new Date("2024-01-01T00:00:00Z");
    vi.setSystemTime(mockDate);

    const akun: SessionAkun = {
      id: "1",
      nama: "test",
      email: "test@gmail.com",
      role: "user",
      profile: "abc.com",
    };

    const expectedExpires = new Date(
      mockDate.getTime() + 1 * 24 * 60 * 60 * 1000,
    );

    //////
    //  Action
    //////
    await createSession(akun);

    //////
    //  Assert
    //////
    expect(mockSetCookies).toHaveBeenCalledTimes(1);
    expect(mockSetCookies).toHaveBeenCalledWith(
      "auth",
      expect.any(String), // Token JWT
      {
        httpOnly: false,
        secure: false,
        expires: expectedExpires,
        sameSite: "lax",
        path: "/",
      },
    );
  });
});
