import UserRow from "../components/akun/UserRow";
import Pagination from "../components/pagination/Pagination";
import Table from "../components/table/Table";
import TableBody from "../components/table/TableBody";
import TableHead from "../components/table/TableHead";
import { useData } from "../contexts/DataContext";
import RouteTitle from "../ui/RouteTitle";

function User() {
  const { user } = useData();

  return (
    <div className="flex h-full flex-col">
      <RouteTitle>User</RouteTitle>

      <Table>
        <TableHead cols="user">
          <div>Id</div>
          <div>Nama</div>
          <div>Email</div>
          <div>Password</div>
          <div></div>
        </TableHead>

        <TableBody>
          <Pagination msg="user">
            {user.map((item) => (
              <UserRow user={item} key={item.id} />
            ))}
          </Pagination>
        </TableBody>
      </Table>
    </div>
  );
}

export default User;
