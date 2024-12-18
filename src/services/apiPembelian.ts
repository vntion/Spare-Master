import { CustomError } from "../utils/helpers";
import { CreatePembelian, Pembelian } from "../utils/interfaces";

export async function createPembelian(pembelian: CreatePembelian) {
  const res = await fetch("http://localhost/SpareMaster/api/pembelian", {
    method: "POST",
    body: JSON.stringify(pembelian),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (!data.status) throw new CustomError("Gagal membuat pembelian");
}

export async function getAllPembelian() {
  const res = await fetch("http://localhost/SpareMaster/api/pembelian");
  const data = await res.json();
  return data.data as Pembelian[];
}

export async function getPembelianByAkunId(id: string) {
  const res = await fetch(
    `http://localhost/SpareMaster/api/pembelian/?akun_id=${id}`,
  );
  const data = await res.json();
  return data.data as Pembelian[];
}
