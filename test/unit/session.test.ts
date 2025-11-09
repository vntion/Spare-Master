import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSession,
  decrypt,
  deleteSession,
  encodedKey,
  encrypt,
} from "../../src/utils/session";
import { SessionAkun, SessionPayload } from "../../src/utils/interfaces";
import { jwtVerify } from "jose";

/**
 * Skenario tes
 *
 * - fungsi encrypt
 * - return JWT ketika input payload diberikan
 *
 * - fungsi decrypt
 * - return payload cookie yang sudah didekripsi dengan benar
 * - return false saat cookie JWT tidak ada, kosong, atau invalid
 *
 * - fungsi createSession
 * - membuat cookies baru saat payload diberikan dan tidak return apapun
 *
 * - fungsi deleteSession
 * - menghapus session cookie 'auth' dengan benar
 */

const mockSetCookies = vi.fn();
const mockRemoveCookies = vi.fn();
const mockGetCookies = vi.fn();

vi.mock("react-cookie", () => {
  const MockCookies = function () {
    return {
      set: mockSetCookies,
      get: mockGetCookies,
      remove: mockRemoveCookies,
    };
  };

  return {
    Cookies: vi.fn().mockImplementation(MockCookies),
  };
});

const fakeAkun: SessionAkun = {
  id: "1",
  nama: "test",
  email: "test@gmail.com",
  role: "user",
  profile: "abc.com",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("encrypt function", () => {
  it("return JWT ketika input payload diberikan", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const payload: SessionPayload = { akun: fakeAkun, expiresAt };

    ////////////////
    //  Action   //
    ////////////////
    const token = await encrypt(payload);

    ////////////////
    //  Assert   //
    ////////////////
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

describe("decrypt function", () => {
  it("return payload cookie yang sudah didekripsi dengan benar", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 jam
    const payload = { akun: fakeAkun, expiresAt };
    const validToken = await encrypt(payload);

    ////////////////
    //  Action   //
    ///////////////
    const result = await decrypt(validToken);

    ////////////////
    //  Assert   //
    ////////////////
    expect(result).not.toBe(false);
    if (result) {
      expect(result.akun).toEqual(fakeAkun);
      expect(new Date(result.expiresAt)).toEqual(expiresAt);
      expect(result.exp).toEqual(expect.any(Number));
      expect(result.iat).toEqual(expect.any(Number));
    }
  });

  it("return false saat cookie JWT tidak ada, kosong, atau invalid", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const emptyToken = "";
    const formatIncorrectToken = "hello";
    const incorrectToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJha3VuIjp7ImlkIjoxfX0.invalid_signature";

    ////////////////
    //  Action   //
    ////////////////
    const emptyResult = await decrypt(emptyToken);
    const formatIncorrectResult = await decrypt(formatIncorrectToken);
    const incorrectResult = await decrypt(incorrectToken);

    ////////////////
    //  Assert   //
    ///////////////
    expect(emptyResult).toBe(false);
    expect(formatIncorrectResult).toBe(false);
    expect(incorrectResult).toBe(false);
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
    ////////////////
    //  Arrange   //
    ////////////////
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

    ////////////////
    //  Action   //
    ///////////////
    await createSession(akun);

    ////////////////
    //  Assert   //
    ////////////////
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

describe("deleteSession function", () => {
  it("menghapus session cookie 'auth' dengan benar", async () => {
    ////////////////
    //  Action   //
    ////////////////
    await deleteSession();

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockRemoveCookies).toHaveBeenCalledTimes(1);
    expect(mockRemoveCookies).toBeCalledWith("auth");
  });
});
