import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { decrypt } from "../../utils/session";
import DarkModeToggle from "../theme/DarkModeToggle";
import LogoutButton from "./LogoutButton";

function AdminHeader() {
  const { name, profile, onProfile } = useAuth();

  useEffect(() => {
    const getProfile = async function () {
      const cookies = new Cookies().get("auth");
      const session = await decrypt(cookies);

      if (!session) return;
      onProfile(session.akun.profile);
    };

    getProfile();
  }, [onProfile]);

  return (
    <header className="flex items-center justify-end border-b border-b-[#999]/30 bg-white px-12 py-2 dark:border-b-[#777]/10 dark:bg-[#161e2a]">
      <Link
        to="account"
        className="mr-2 flex items-center gap-2 dark:text-white"
      >
        <img
          src={profile}
          alt={name ?? "admin"}
          className="size-8 rounded-full"
        />
        <span className="text-sm">
          {name!.length > 20 ? name!.slice(0, 20) : name}
        </span>
      </Link>
      <Link to="account" className="rounded-full p-1.5 hover:bg-primary/10">
        <UserIcon className="size-5 text-primary" />
      </Link>
      <DarkModeToggle />
      <LogoutButton color="blue" />
    </header>
  );
}

export default AdminHeader;
