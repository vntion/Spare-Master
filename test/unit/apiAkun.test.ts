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
    // Arrange
    const mockData = { id: "1", email: "test@example.com", nama: "Tester" };
    mockFetch.mockResolvedValue({
      json: async () => ({ status: true, data: [mockData] }),
    });

    // Act
    const result = await getAkun("test@example.com", "password123");

    // Assert
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("email=test@example.com"),
    );
    expect(result).toEqual(mockData);
  });

  it("throw CustomError jika email atau password yang diberikan salah", async () => {
    // Arrange
    mockFetch.mockResolvedValue({
      json: async () => ({ status: false, data: [] }),
    });

    // Act & Assert
    await expect(getAkun("wrong@example.com", "wrongpass")).rejects.toThrow(
      CustomError,
    );
  });
});

describe("getAllAkun function", () => {
  it("return semua akun yang ada", async () => {
    // Arrange
    const mockData = [
      { id: "1", nama: "User 1" },
      { id: "2", nama: "User 2" },
    ];
    mockFetch.mockResolvedValue({
      json: async () => ({ status: true, data: mockData }),
    });

    // Act
    const result = await getAllAkun();
    console.log(result);

    // Assert
    expect(result).toEqual(mockData);
    expect(result).toHaveLength(2);
  });
});

describe("createAkun function", () => {
  it("return hasil respon jika akun berhasil dibuat", async () => {
    // Arrange
    const newAkun: SignUp = {
      nama: "New User",
      email: "new@example.com",
      password: "123",
      role: "user",
      profile: "img.jpg",
    };
    const mockResponse = {
      status: true,
      message: "Akun berhasil dibuat",
      data: { id: "99", ...newAkun },
    };

    mockFetch.mockResolvedValue({
      json: async () => mockResponse,
    });

    // Act
    const result = await createAkun(newAkun);

    // Assert
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(newAkun),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it("trow CustomError jika akun gagal dibuat", async () => {
    // Arrange
    const newAkun = {} as SignUp; // Data dummy
    mockFetch.mockResolvedValue({
      json: async () => ({
        status: false,
        message: "Invalid input data",
      }),
    });

    // Act & Assert
    await expect(createAkun(newAkun)).rejects.toThrow(CustomError);
    await expect(createAkun(newAkun)).rejects.toThrow("Invalid input data");
  });
});

describe("updateAkun function", () => {
  it("return message jika akun berhasil diperbarui", async () => {
    // Arrange
    const updateData: UpdateAkunProps = { id: "1", nama: "Updated Name" };
    mockFetch.mockResolvedValue({
      json: async () => ({
        status: true,
        message: "Akun berhasil diperbarui.",
      }),
    });

    // Act
    const result = await updateAkun(updateData);

    // Assert
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("akun_id=1"),
      expect.objectContaining({ method: "PATCH" }),
    );
    expect(result).toBe("Akun berhasil diperbarui.");
  });

  it("throw CustomError jika akun gagal diperbarui", async () => {
    // Arrange
    const updateData: UpdateAkunProps = { id: "99" };
    mockFetch.mockResolvedValue({
      json: async () => ({
        status: false,
        message: "Gagal memperbarui akun.",
      }),
    });

    // Act & Assert
    await expect(updateAkun(updateData)).rejects.toThrow(CustomError);
  });
});
