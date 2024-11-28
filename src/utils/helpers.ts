import { format } from "date-fns";
import { Pembelian } from "./interfaces";

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export function formatRupiah(nominal: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(nominal);
}

export function formatString(text: string, length: number) {
  return text.length > length ? `${text.slice(0, length)}...` : text;
}

export function calcTotalPembelian(
  pembelian: Pembelian[],
  from: string,
  to: string,
) {
  return pembelian
    .filter(
      (item) =>
        format(item.tanggalBeli, "MMM") === from ||
        format(item.tanggalBeli, "MMM") === to,
    )
    .reduce((acc: number, pembelian) => acc + Number(pembelian.totalHarga), 0);
}
