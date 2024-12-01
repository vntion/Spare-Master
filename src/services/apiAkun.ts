import { CustomError } from "../utils/helpers";
import { SignUp, UpdateAkunProps } from "../utils/interfaces";

export async function getAkun(email: string, password: string) {
  const res = await fetch(
    `http://localhost/SpareMaster/api/akun?email=${email}&password=${password}`,
  );
  const data = await res.json();

  if (!data.status)
    throw new CustomError("Email atau password tidak ditemukan");

  return data.data[0];
}

export async function getAllAkun() {
  const res = await fetch("http://localhost/SpareMaster/api/akun");
  const data = await res.json();
  return data.data;
}

export async function createAkun(newAkun: SignUp) {
  const res = await fetch("http://localhost/SpareMaster/api/akun", {
    method: "POST",
    body: JSON.stringify(newAkun),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.status) throw new CustomError(data.message);
  return data;
}

export async function updateAkun({
  id,
  nama,
  profile,
  password,
}: UpdateAkunProps) {
  const updatedData = {
    nama,
    password,
    profile,
  };

  const res = await fetch(
    `http://localhost/SpareMaster/api/akun?akun_id=${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  if (!data.status) throw new CustomError(data.message);

  return data.message;
}
