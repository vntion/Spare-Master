import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomError } from "../../utils/helpers";
import { getAkun } from "../../services/apiAkun";
import { Akun, SessionAkun } from "../../utils/interfaces";
import { createSession } from "../../utils/session";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { onAuth, onName, onRole, onProfile } = useAuth();

  const handleSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) return;

    try {
      const data: Akun = await getAkun(email, password);
      const sessionData: SessionAkun = {
        id: data.id,
        nama: data.nama,
        email: data.email,
        role: data.role,
        profile: data.profile,
      };
      await createSession(sessionData);
      onName(data.nama);
      onRole(data.role);
      onProfile(data.profile);
      if (data.role === "admin") {
        onAuth(true);
        navigate("/admin");
      }

      if (data.role === "user") {
        onAuth(false);
        navigate("/");
      }
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
      <h1 className="mb-4 text-center text-3xl font-semibold">Login</h1>

      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="mb-3 space-y-1">
        <label htmlFor="email">Email</label>
        <div className="flex items-center gap-2 rounded bg-[#EEF0F2] p-2">
          <label htmlFor="email">
            <EnvelopeIcon className="size-6" />
          </label>
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
          <label htmlFor="password">
            <LockClosedIcon className="size-6" />
          </label>
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
        className="mt-16 w-full rounded bg-primary py-2 text-white"
      >
        Login
      </button>

      <p className="mt-2 text-center text-[0.78rem]">
        Belum punya akun?
        <Link to="/signup" className="text-blue-600">
          Buat akun
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
