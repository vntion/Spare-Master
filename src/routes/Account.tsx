import UpdateAdminData from "../components/akun/UpdateAdminData";
import UpdateAdminPass from "../components/akun/UpdateAdminPass";
import RouteTitle from "../ui/RouteTitle";

function Account() {
  return (
    <>
      <RouteTitle>Update akun kamu</RouteTitle>
      <UpdateAdminData />
      <UpdateAdminPass />
    </>
  );
}

export default Account;
