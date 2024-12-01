import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { createSession, decrypt } from "../../utils/session";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { CustomError } from "../../utils/helpers";
import { updateAkun } from "../../services/apiAkun";
import { SessionAkun } from "../../utils/interfaces";
import { useAuth } from "../../contexts/AuthContext";

function UpdateAdminData() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gambar, setGambar] = useState("");

  const { onProfile, onName } = useAuth();
  const { showSnackBar, onSnackBarMsg, onSnackBarStatus } = useSnackBar();

  const handleSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !fullName || !gambar) return;

    const cookies = new Cookies().get("auth");
    const session = await decrypt(cookies);

    if (!session) return;

    try {
      const res = await updateAkun({
        id: session.akun.id,
        nama: fullName.trim(),
        profile: gambar.trim(),
      });
      onSnackBarStatus("success");
      onSnackBarMsg(res);
      showSnackBar();
      onProfile(gambar.trim());
      onName(fullName.trim());

      const newSession: SessionAkun = {
        id: session.akun.id,
        nama: fullName.trim(),
        email,
        role: session.akun.role,
        profile: gambar.trim(),
      };

      await createSession(newSession);
    } catch (err) {
      if (err instanceof CustomError) {
        onSnackBarStatus("error");
        onSnackBarMsg(err.message);
        showSnackBar();
      }
    }
  };

  useEffect(() => {
    const getData = async function () {
      const cookies = new Cookies().get("auth");
      const session = await decrypt(cookies);

      if (!session) return;

      setEmail(session.akun.email);
      setFullName(session.akun.nama);
      setGambar(session.akun.profile);
    };

    getData();
  }, []);

  return (
    <div className="mb-8">
      <h3 className="mb-2 text-xl dark:text-white">Update data akun</h3>

      <form
        onSubmit={handleSubmit}
        className="divide-y rounded-md bg-white px-8 py-3 dark:divide-[#777]/30 dark:bg-[#161e2a] dark:text-white"
      >
        <div className="flex items-center py-2">
          <label htmlFor="email" className="basis-56">
            Email
          </label>
          <input
            type="email"
            id="email"
            disabled
            value={email}
            className="basis-56 rounded px-3 py-2 disabled:bg-slate-200 dark:disabled:bg-gray-500"
          />
        </div>

        <div className="flex items-center py-3">
          <label htmlFor="fullName" className="basis-56">
            Nama lengkap
          </label>
          <input
            required
            type="text"
            id="fullName"
            placeholder="Nama lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="basis-56 rounded border-2 bg-transparent px-3 py-2 outline-none focus:border-primary dark:border"
          />
        </div>

        <div className="flex items-center py-2">
          <label htmlFor="profile" className="basis-56">
            Gambar profil
          </label>
          <input
            required
            type="url"
            id="profile"
            placeholder="Gambar profil"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
            className="basis-56 rounded border-2 bg-transparent px-3 py-2 outline-none focus:border-primary dark:border"
          />
        </div>

        <div className="flex justify-end gap-2 py-2">
          <button type="reset" className="rounded border-2 px-3 dark:border">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-primary px-3 py-2 text-white"
          >
            Update akun
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateAdminData;
