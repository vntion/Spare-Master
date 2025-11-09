import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createPembelian,
  getAllPembelian,
  getPembelianByAkunId,
} from "../../src/services/apiPembelian";
import { CustomError } from "../../src/utils/helpers";
import { CreatePembelian, Pembelian } from "../../src/utils/interfaces";

// --- Setup Global Mock Fetch ---
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
 * - fungsi createPembelian
 * - fetch cretePembelian berhasil saat payload diberikan
 * - throw CustomError saat status respon false
 *
 * - fungsi getAllPembelian
 * - return array semua pembelian dengan benar
 *
 * - fungsi getPembelianByAkunId
 * - return array semua pembelian berdasarkan id akun
 *
 */

describe("createPembelian function", () => {
  it("fetch createPembelian berhasil saat payload diberikan", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockNewPembelian: CreatePembelian = {
      isPaid: false,
      totalHarga: 100000,
      alamat: "Jalan Test No. 1",
      produkId: 1,
      akunId: 1,
      jumlahProduk: "2",
    };
    const fakeNewPembelianRespone = {
      status: true,
      message: "Pembelian berhasil dibuat",
    };

    mockFetch.mockResolvedValue({
      json: async () => fakeNewPembelianRespone,
    });

    ////////////////
    //  Action   //
    ////////////////
    await createPembelian(mockNewPembelian);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/pembelian"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(mockNewPembelian),
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("throw CustomError saat status respon false", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockNewPembelian = {} as CreatePembelian;
    const fakeNewPembelianRespone = {
      status: false,
      message: "Invalid input data",
    };
    mockFetch.mockResolvedValue({
      json: async () => fakeNewPembelianRespone,
    });

    ////////////////
    //  Assert   //
    ////////////////
    await expect(createPembelian(mockNewPembelian)).rejects.toThrow(
      CustomError,
    );
    await expect(createPembelian(mockNewPembelian)).rejects.toThrow(
      "Gagal membuat pembelian",
    );
  });
});

describe("getAllPembelian function", () => {
  it("return array semua pembelian dengan benar", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockData: Pembelian[] = [
      {
        id: "1",
        isPaid: "0",
        alamat: "Alamat 1",
        totalHarga: "50000",
        produkId: "10",
        hargaProduk: "50000",
        jumlahProduk: "1",
        gambarProduk: "img1.jpg",
        produk: "Produk A",
        pembeli: "User A",
        email: "a@test.com",
        tanggalBeli: "2024-01-01",
      },
      {
        id: "1",
        isPaid: "0",
        alamat: "Alamat 1",
        totalHarga: "50000",
        produkId: "10",
        hargaProduk: "50000",
        jumlahProduk: "1",
        gambarProduk: "img1.jpg",
        produk: "Produk A",
        pembeli: "User A",
        email: "a@test.com",
        tanggalBeli: "2024-01-01",
      },
    ];
    const fakeGetAllPembelianResponse = { status: true, data: mockData };
    mockFetch.mockResolvedValue({
      json: async () => fakeGetAllPembelianResponse,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await getAllPembelian();

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/pembelian"),
    );
    expect(result).toEqual(mockData);
  });
});

describe("getPembelianByAkunId function", () => {
  it("return array semua pembelian berdasarkan id akun", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const akunId = "123";
    const mockData: Pembelian[] = [
      {
        id: "2",
        isPaid: "1",
        alamat: "Alamat 2",
        totalHarga: "75000",
        produkId: "11",
        hargaProduk: "75000",
        jumlahProduk: "1",
        gambarProduk: "img2.jpg",
        produk: "Produk B",
        pembeli: "User B",
        email: "b@test.com",
        tanggalBeli: "2024-01-02",
      },
      {
        id: "2",
        isPaid: "1",
        alamat: "Alamat 2",
        totalHarga: "75000",
        produkId: "11",
        hargaProduk: "75000",
        jumlahProduk: "1",
        gambarProduk: "img2.jpg",
        produk: "Produk B",
        pembeli: "User B",
        email: "b@test.com",
        tanggalBeli: "2024-01-02",
      },
    ];
    const fakeGetPembelianByAkunIdRes = { status: true, data: mockData };
    mockFetch.mockResolvedValue({
      json: async () => fakeGetPembelianByAkunIdRes,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await getPembelianByAkunId(akunId);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`/api/pembelian/?akun_id=${akunId}`),
    );
    expect(result).toEqual(mockData);
  });
});
