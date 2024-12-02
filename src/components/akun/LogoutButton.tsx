import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { deleteSession } from "../../utils/session";
import { useAuth } from "../../contexts/AuthContext";
import { LogoutBtnProps } from "../../utils/interfaces";

function LogoutButton({ color }: LogoutBtnProps) {
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async function () {
    await deleteSession();
    onLogout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-full p-1.5 hover:bg-primary/10"
    >
      <ArrowRightStartOnRectangleIcon
        onClick={handleLogout}
        className={`size-5 ${color === "blue" ? "text-primary" : "text-black"}`}
      />
    </button>
  );
}

export default LogoutButton;
