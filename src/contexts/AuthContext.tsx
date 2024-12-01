import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Cookies } from "react-cookie";
import { CustomError } from "../utils/helpers";
import { AuthContextType } from "../utils/interfaces";
import { decrypt } from "../utils/session";
import { Role } from "../utils/types";

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(null);
  const [name, setName] = useState<string | null>(null);
  const [profile, setProfile] = useState<string>("");

  const handleProfile = function (profile: string) {
    setProfile(profile);
  };

  const handleIsAuth = function (isAuth: boolean) {
    setIsAuthenticated(isAuth);
  };

  const handleRole = function (role: Role) {
    setRole(role);
  };

  const handleName = function (name: string) {
    setName(name);
  };

  const handleLogout = function () {
    setIsAuthenticated(false);
    setRole(null);
    setName(null);
    setProfile("");
  };

  useEffect(() => {
    const getSession = async function () {
      const cookie = new Cookies().get("auth");
      const session = await decrypt(cookie);

      if (!session) {
        return;
      }
      if (session.akun.role === "admin") setIsAuthenticated(true);

      console.log(session);
      setName(session.akun.nama);
      setRole(session.akun.role);
    };

    getSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        name,
        profile,
        onProfile: handleProfile,
        onAuth: handleIsAuth,
        onRole: handleRole,
        onName: handleName,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined)
    throw new CustomError("Auth context was used outside provider");
  return value;
}

export { AuthProvider, useAuth };
