import { CustomError } from "../utils/helpers";

export async function createCart(newCart) {
  const res = await fetch("http://localhost/SpareMaster/api/cart", {
    method: "POST",
    body: JSON.stringify(newCart),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!data.status) throw new CustomError(data.message);

  return data;
}

export async function getCartByAkunId(akunId: string) {
  const res = await fetch(
    `http://localhost/SpareMaster/api/cart?akun_id=${akunId}`,
  );
  const data = await res.json();
  return data.data;
}

export async function deleteCartById(akunId: string, cartId: string) {
  const res = await fetch(
    `http://localhost/SpareMaster/api/cart?akun_id=${akunId}&cart_id=${cartId}`,
    {
      method: "DELETE",
    },
  );
  const data = await res.json();
  if (!data.status) throw new CustomError(data.message);

  return data;
}

export async function deleteAllCart(akunId: string) {
  const res = await fetch(
    `http://localhost/SpareMaster/api/cart?akun_id=${akunId}`,
    {
      method: "DELETE",
    },
  );
  const data = await res.json();
  if (!data.status) throw new CustomError(data.message);

  return data;
}
