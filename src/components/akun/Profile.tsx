import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { formatString } from "../../utils/helpers";
import { decrypt } from "../../utils/session";
import LogoutButton from "./LogoutButton";
import { DocumentTextIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

function Profile() {
  const { isAuthenticated, name, profile, onProfile } = useAuth();
  const formattedName = formatString(name ?? "", 20);

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
    <div className={`flex items-center ${name ? "gap-1" : "gap-3"}`}>
      {name && !isAuthenticated ? (
        <>
          <div className="mr-3 flex items-center gap-1">
            {/* <UserCircleIcon className="size-6" /> */}
            <img src={profile} alt={name} className="size-8 rounded-full" />
            <span>{formattedName}</span>
          </div>

          <nav className="flex items-center">
            <Link to="/cart" className="rounded-full p-1.5 hover:bg-primary/10">
              <ShoppingBagIcon className="size-5 text-primary" />
            </Link>

            <Link
              to="/riwayat"
              className="rounded-full p-1.5 hover:bg-primary/10"
            >
              <DocumentTextIcon className="size-5 text-primary" />
            </Link>

            <LogoutButton color="blue" />
          </nav>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="rounded-md border border-[#999] px-4 py-[6px] text-primary"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-primary px-4 py-[6px] text-white"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
