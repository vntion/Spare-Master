import { CustomError } from "../utils/helpers";
import { CreateProduk, Produk, UpdateProduk } from "../utils/interfaces";

/*
 * Get Produk
 */
export async function getAllProduk() {
  const res = await fetch("http://localhost/SpareMaster/api/produk");
  if (!res.ok) throw new CustomError("Failed to fetch");

  const data = await res.json();
  if (!data.status) throw new CustomError("Something went wrong");

  return data.data;
}

export async function getProdukById(id: number): Promise<Produk> {
  const res = await fetch(
    `http://localhost/SpareMaster/api/produk?produk_id=${id}`,
  );
  if (!res.ok) throw new CustomError("Failed to fetch");
  const data = await res.json();

  if (!data.status) throw new CustomError("Produk tidak ditemukan");

  return data.data[0];
}

export async function getProdukByQuery(query: string) {
  const res = await fetch(
    `http://localhost/SpareMaster/api/produk/?search=${query}`,
  );
  if (!res.ok) throw new CustomError("Failed to fetch");

  const data = await res.json();
  if (!data.status) throw new CustomError(`Produk ${query} tidak ditemukan`);

  return data.data;
}

/*
 * Create Produk
 */
export async function createProduk(produk: CreateProduk): Promise<Produk> {
  const res = await fetch("http://localhost/SpareMaster/api/produk", {
    method: "POST",
    body: JSON.stringify(produk),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (!data.status) throw new CustomError(data.message);

  return data.data as Produk;
}

/**
 * Edit produk
 */

export async function updateProduk(updateProduk: UpdateProduk, id: number) {
  const res = await fetch(`http://localhost/SpareMaster/api/produk/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateProduk),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.status) throw new CustomError("Gagal mengedit produk");
  return data;
}

/*
 * Delete Produk
 */
export async function deleteProduk(id: number) {
  const res = await fetch(`http://localhost/SpareMaster/api/produk/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
}
