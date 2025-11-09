import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createAkun,
  getAkun,
  getAllAkun,
  updateAkun,
} from "../../src/services/apiAkun";
import { CustomError } from "../../src/utils/helpers";
import { SignUp, UpdateAkunProps } from "../../src/utils/interfaces";

// --- Setup Global Mock untuk Fetch ---
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});
// ------------------------------------

/**
 * Skenario tes
 *
 * - fungsi getAkun
 * - return akun jika email dan password yang diberikan benar
 * - throw CustomError jika email atau password yang diberikan salah
 *
 * - fungsi getAllAkun
 * - return semua akun yang ada
 *
 * - fungsi createAkun
 * - return hasil respon jika akun berhasil dibuat
 * - trow CustomError jika akun gagal dibuat
 *
 * - fungsi updateAkun
 * - return message jika akun berhasil diperbarui
 * - throw CustomError jika akun gagal diperbarui
 */

describe("getAkun function", () => {
  it("return akun jika email dan password yang diberikan benar", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockData = {
      id: "1",
      nama: "test",
      email: "test@gmail.com",
      password: "test",
      role: "test",
      profile: "https://i.pravatar.cc/1000?u=15",
    };
    const fakeGetAkunResponse = {
      status: true,
      data: [mockData],
    };

    mockFetch.mockResolvedValue({
      json: async () => fakeGetAkunResponse,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await getAkun("test@example.com", "password123");

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("email=test@example.com"),
    );
    expect(result).toEqual(mockData);
  });

  it("throw CustomError jika email atau password yang diberikan salah", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const fakeFailedResponse = { status: false, data: [] };
    mockFetch.mockResolvedValue({
      json: async () => fakeFailedResponse,
    });

    ////////////////
    //  Assert   //
    ////////////////
    await expect(getAkun("wrong@example.com", "wrongpass")).rejects.toThrow(
      CustomError,
    );
  });
});

describe("getAllAkun function", () => {
  it("return semua akun yang ada", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockData = [
      {
        id: "2",
        nama: "John Doe",
        email: "johndoe@gmail.com",
        password: "johndoe123",
        role: "user",
        profile: "https://i.pravatar.cc/1000?u=1",
      },
      {
        id: "3",
        nama: "Jane Smith",
        email: "janesmith@gmail.com",
        password: "janesmith123",
        role: "user",
        profile: "https://i.pravatar.cc/1000?u=2",
      },
      {
        id: "4",
        nama: "Robert Brown",
        email: "robertbrown@gmail.com",
        password: "robertbrown123",
        role: "user",
        profile: "https://i.pravatar.cc/1000?u=3",
      },
    ];

    const fakeGetAllAkunResponse = { status: true, data: mockData };
    mockFetch.mockResolvedValue({
      json: async () => fakeGetAllAkunResponse,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await getAllAkun();

    ////////////////
    //  Assert   //
    ////////////////
    expect(result).toEqual(mockData);
  });
});

describe("createAkun function", () => {
  it("return hasil respon jika akun berhasil dibuat", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockNewAkun: SignUp = {
      nama: "New User",
      email: "new@example.com",
      password: "123",
      role: "user",
      profile: "img.jpg",
    };
    const fakeCreateAkunResponse = {
      status: true,
      message: "Akun berhasil dibuat",
      data: { id: "99", ...mockNewAkun },
    };

    mockFetch.mockResolvedValue({
      json: async () => fakeCreateAkunResponse,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await createAkun(mockNewAkun);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(mockNewAkun),
      }),
    );
    expect(result).toEqual(fakeCreateAkunResponse);
  });

  it("throw CustomError jika akun gagal dibuat", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockNewAkun = {} as SignUp;
    const fakeFailedNewAkunRes = {
      status: false,
      message: "Invalid input data",
    };
    mockFetch.mockResolvedValue({
      json: async () => fakeFailedNewAkunRes,
    });

    ////////////////
    //  Assert   //
    ////////////////
    await expect(createAkun(mockNewAkun)).rejects.toThrow(CustomError);
    await expect(createAkun(mockNewAkun)).rejects.toThrow("Invalid input data");
  });
});

describe("updateAkun function", () => {
  it("return message jika akun berhasil diperbarui", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const updateData: UpdateAkunProps = { id: "1", nama: "Updated Name" };
    mockFetch.mockResolvedValue({
      json: async () => ({
        status: true,
        message: "Akun berhasil diperbarui.",
      }),
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await updateAkun(updateData);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("akun_id=1"),
      expect.objectContaining({ method: "PATCH" }),
    );
    expect(result).toBe("Akun berhasil diperbarui.");
  });

  it("throw CustomError jika akun gagal diperbarui", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const updateData: UpdateAkunProps = { id: "99" };
    mockFetch.mockResolvedValue({
      json: async () => ({
        status: false,
        message: "Gagal memperbarui akun.",
      }),
    });

    ////////////////
    //  Assert   //
    ////////////////
    await expect(updateAkun(updateData)).rejects.toThrow(CustomError);
  });
});
