import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createProduk,
  deleteProduk,
  getAllProduk,
  getProdukById,
  getProdukByQuery,
  updateProduk,
} from "../../src/services/apiProduk";
import { CustomError } from "../../src/utils/helpers";
import { CreateProduk, Produk, UpdateProduk } from "../../src/utils/interfaces";

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
 * - fungsi getAllProduk
 * - return semua produk hasil dari fetching
 * - Throw CustomError jika res atau data status false
 *
 * - fungsi getProdukById
 * - return sebuah produk berdasarkan id produk dengan benar
 * - Throw CustomError jika res false atau produk tidak ditemukan
 *
 * - fungsi getProdukByQuery
 * - return sebuah produk berdasarkan query yang diberikan
 * - Throw CustomError jika res false atau produk tidak ditemukan
 *
 * - fungsi createProduk
 * - return sebuah produk jika produk berhasil dibuat
 * - Throw CustomError jika produk gagal dibuat
 *
 * - fungsi updateProduk
 * - return response jika produk berhasil diupdate
 * - Throw CustomError jika produk gagal diupdate
 *
 * - fungsi deleteProduk
 * - return response jika produk berhasil atau gagal dihapus
 */

describe("getAllProduk function", () => {
  it("return semua produk hasil dari fetching", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockData: Produk[] = [
      { id: "1", nama: "Produk A", harga: 1000 },
      { id: "2", nama: "Produk B", harga: 2000 },
    ];
    const fakeGetAllProdukRes = { status: true, data: mockData };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => fakeGetAllProdukRes,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await getAllProduk();

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/produk"),
    );
    expect(result).toEqual(mockData);
  });

  it("Throw CustomError jika res atau data status false", async () => {
    // Fetch gagal (res.ok = false)
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });
    await expect(getAllProduk()).rejects.toThrow(CustomError);

    // Fetch berhasil tetapi status API false
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: false, data: [] }),
    });
    await expect(getAllProduk()).rejects.toThrow("Something went wrong");
  });
});

describe("getProdukById function", () => {
  it("return sebuah produk berdasarkan id produk dengan benar", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockProdukId = "1";
    const mockProduk: Produk = {
      id: mockProdukId,
      nama: "Produk A",
      harga: 1000,
      deskripsi: "test",
      gambar: "http/test",
    };
    const fakeGetProdukByIdRes = { status: true, data: [mockProduk] };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => fakeGetProdukByIdRes,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await getProdukById(1);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`produk_id=${mockProdukId}`),
    );
    expect(result).toEqual(mockProduk);
  });

  it("Throw CustomError jika res false atau produk tidak ditemukan", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ status: false, data: [] }),
    });
    await expect(getProdukById(999)).rejects.toThrow("Produk tidak ditemukan");
  });
});

describe("getProdukByQuery function", () => {
  it("return sebuah produk berdasarkan query yang diberikan", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockSearchQuery = "Kopi";
    const mockData: Produk[] = [{ id: "1", nama: "Kopi Hitam", harga: 5000 }];
    const fakeGetProdukByQueryRes = { status: true, data: mockData };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => fakeGetProdukByQueryRes,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await getProdukByQuery(mockSearchQuery);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`search=${mockSearchQuery}`),
    );
    expect(result).toEqual(mockData);
  });

  it("Throw CustomError jika res false atau produk tidak ditemukan", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const query = "abc";
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ status: false, data: [] }),
    });

    ////////////////
    //  Assert   //
    ////////////////
    await expect(getProdukByQuery(query)).rejects.toThrow(
      `Produk ${query} tidak ditemukan`,
    );
  });
});

describe("createProduk function", () => {
  it("return sebuah produk jika produk berhasil dibuat", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const newProduk: CreateProduk = {
      nama: "new produk",
      deskripsi: "abctest",
      harga: 10000,
      gambar: "img.jpg",
    };
    const mockResponseData = { id: "100", ...newProduk };
    const fakeCreateProdukRes = {
      status: true,
      message: "Produk berhasil dibuat",
      data: mockResponseData,
    };

    mockFetch.mockResolvedValue({
      ok: true, // Fetch API standar mengembalikan ok:true jika status 2xx
      json: async () => fakeCreateProdukRes,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await createProduk(newProduk);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(newProduk),
      }),
    );
    expect(result).toEqual(mockResponseData);
  });

  it("Throw CustomError jika produk gagal dibuat", async () => {
    const newProduk = {} as CreateProduk; // invalid data
    const fakeCreateProdukRes = {
      status: false,
      message: "Invalid input data",
    };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => fakeCreateProdukRes,
    });
    await expect(createProduk(newProduk)).rejects.toThrow("Invalid input data");
  });
});

describe("updateProduk function", () => {
  it("return response jika produk berhasil diupdate", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockUpdateId = 1;
    const updateData: UpdateProduk = {
      nama: "Update",
      deskripsi: "Update Desc",
      harga: 20000,
      gambar: "update.jpg",
    };
    const fakeUpdateProdukRes = {
      status: true,
      message: "Produk berhasil diupdate",
    };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => fakeUpdateProdukRes,
    });

    ////////////////
    //  Action   //
    ////////////////
    const result = await updateProduk(updateData, mockUpdateId);

    ////////////////
    //  Assert   //
    ////////////////
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`/api/produk/${mockUpdateId}`),
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify(updateData),
      }),
    );
    expect(result).toEqual(fakeUpdateProdukRes);
  });

  it("Throw CustomError jika produk gagal diupdate", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockUpdateId = 1;
    const mockData = { nama: "", deskripsi: "", harga: 0, gambar: "" };
    const fakeUpdateProdukRes = { status: false, message: "Gagal" };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => fakeUpdateProdukRes,
    });

    ////////////////
    //  Assert   //
    ////////////////
    await expect(updateProduk(mockData, mockUpdateId)).rejects.toThrow(
      "Gagal mengedit produk",
    );
  });
});

describe("deleteProduk function", () => {
  it("return response jika produk berhasil atau gagal dihapus", async () => {
    ////////////////
    //  Arrange   //
    ////////////////
    const mockSuccessResponse = {
      status: true,
      message: "Product deleted Succefully...",
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessResponse,
    });

    const mockFailResponse = {
      status: false,
      message: "Something went wrong...",
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFailResponse,
    });

    ////////////////
    //  Assert   //
    ////////////////
    await expect(deleteProduk(1)).resolves.toEqual(mockSuccessResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/1"),
      expect.objectContaining({ method: "DELETE" }),
    );

    await expect(deleteProduk(999)).resolves.toEqual(mockFailResponse);
  });
});
