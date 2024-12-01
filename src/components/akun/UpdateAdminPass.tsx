import { useState } from "react";
import { CustomError } from "../../utils/helpers";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { updateAkun } from "../../services/apiAkun";
import { Cookies } from "react-cookie";
import { decrypt } from "../../utils/session";

function UpdateAdminPass() {
  const [password, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const { showSnackBar, onSnackBarMsg, onSnackBarStatus } = useSnackBar();

  const handleSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password || !confirmPass) return;

    const cookies = new Cookies().get("auth");
    const session = await decrypt(cookies);

    if (!session) return;

    try {
      await updateAkun({ id: session.akun.id, password });
      onSnackBarMsg("Password berhasil diperbarui");
      onSnackBarStatus("success");
      showSnackBar();

      setPass("");
      setConfirmPass("");
    } catch (err) {
      if (err instanceof CustomError) {
        onSnackBarMsg("Password gagal diperbarui");
        onSnackBarStatus("error");
        showSnackBar();
      }
    }
  };

  return (
    <div>
      <h3 className="mb-2 text-xl dark:text-white">Update password</h3>

      <form
        onSubmit={handleSubmit}
        className="divide-y rounded-md bg-white px-8 py-3 dark:divide-[#777]/30 dark:bg-[#161e2a] dark:text-white"
      >
        <div className="flex items-center py-2">
          <label htmlFor="password" className="basis-56">
            Password baru
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password baru"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="basis-56 rounded border-2 bg-transparent px-3 py-2 outline-none focus:border-primary dark:border"
          />
        </div>

        <div className="flex flex-wrap items-center py-3">
          <label htmlFor="confirm" className="basis-56">
            Konfirm password
          </label>
          <div className="basis-56">
            <input
              type="password"
              id="confirm"
              placeholder="Konfirm password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className={
                `mb-1 w-full rounded border-2 bg-transparent px-3 py-2 outline-none dark:border ` +
                ` ${password !== confirmPass ? "border-red-500" : "focus:border-primary"}`
              }
            />
            {password !== confirmPass && (
              <span className="text-sm text-red-500">Password berbeda!</span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 py-2">
          <button type="reset" className="rounded border-2 px-3 dark:border">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-primary px-3 py-2 text-white"
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateAdminPass;
