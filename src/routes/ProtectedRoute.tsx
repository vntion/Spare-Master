import { ReactNode, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { decrypt } from "../utils/session";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async function () {
      const cookie = new Cookies().get("auth");
      const session = await decrypt(cookie);

      if (!session) {
        navigate("/login");
        return;
      }

      if (session.akun.role !== "admin") {
        navigate("/login");
        return;
      }

      setIsLoading(false);
    };

    getAuth();
  }, [navigate]);

  if (isLoading) return <Spinner />;

  return children;
}

export default ProtectedRoute;
