import { useNavigate } from "react-router-dom";
import CartList from "../components/cart/CartList";
import BackButton from "../ui/BackButton";
import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { decrypt } from "../utils/session";

function Cart() {
  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async function () {
      const cookie = new Cookies().get("auth");
      const session = await decrypt(cookie);

      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      if (session.akun.role === "admin") {
        navigate("/login", { replace: true });
        return;
      }
    };

    getAuth();
  }, [navigate]);

  return (
    <>
      <NavBar />
      <main className="mb-8 flex-1 px-[2vw] py-5">
        <div className="mx-auto max-w-[80rem]">
          <BackButton />
          <CartList />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
