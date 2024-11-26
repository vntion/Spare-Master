import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

function Profile() {
  const { isAuthenticated, name } = useAuth();

  return (
    <div className={`flex items-center ${name ? "gap-1" : "gap-3"}`}>
      {name && !isAuthenticated ? (
        <>
          <div className="mr-3 flex items-center gap-1">
            <UserCircleIcon className="size-6" />
            <span>{name.split(" ")[0]}</span>
          </div>
          <LogoutButton color="black" />
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
