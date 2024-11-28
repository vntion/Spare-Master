import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Akun, SignUp } from "../../utils/interfaces";
import { createAkun } from "../../services/apiAkun";
import { CustomError } from "../../utils/helpers";
import { useAuth } from "../../contexts/AuthContext";
import { createSession } from "../../utils/session";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [nama, setNama] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { onName, onRole, onAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const signUp: SignUp = {
        nama: nama.trim(),
        email: email.trim(),
        password: password.trim(),
        role: "user",
      };

      const res = await createAkun(signUp);
      const data: Akun = res.data;
      onName(data.nama);
      onRole(data.role);
      onAuth(false);

      await createSession(data);
      navigate("/");
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="basis-[24rem] rounded-md bg-white p-4"
    >
      <h1 className="mb-4 text-center text-3xl font-semibold">Sign up</h1>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      <div className="mb-3 space-y-1">
        <label htmlFor="nama">Nama</label>
        <div className="flex items-center gap-2 rounded bg-[#EEF0F2] p-2">
          <input
            type="text"
            id="nama"
            required
            placeholder="Masukkan nama..."
            className="flex-1 bg-transparent outline-none"
            autoComplete="off"
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="mb-3 space-y-1">
        <label htmlFor="email">Email</label>
        <div className="flex items-center gap-2 rounded bg-[#EEF0F2] p-2">
          <input
            type="email"
            id="email"
            required
            placeholder="Masukkan email..."
            className="flex-1 bg-transparent outline-none"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="password">Password</label>
        <div className="flex items-center gap-2 rounded bg-[#EEF0F2] p-2">
          <input
            type={isShowPass ? "text" : "password"}
            id="password"
            required
            placeholder="Masukkan password..."
            className="flex-1 bg-transparent outline-none"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isShowPass ? (
            <EyeSlashIcon
              className="size-6 cursor-pointer"
              onClick={() => {
                setIsShowPass((isShow) => !isShow);
              }}
            />
          ) : (
            <EyeIcon
              className="size-6 cursor-pointer"
              onClick={() => {
                setIsShowPass((isShow) => !isShow);
              }}
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-12 w-full rounded bg-primary py-2 text-white"
      >
        Sign up
      </button>
    </form>
  );
}

export default SignUpForm;
