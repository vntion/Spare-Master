import { Akun } from "../../utils/interfaces";

interface Props {
  user: Akun;
}

function UserRow({ user }: Props) {
  return (
    <div className="grid grid-cols-[1fr_3fr_5fr_3fr_1fr] items-center p-3 dark:text-white">
      <div>{user.id}</div>
      <div>{user.nama}</div>
      <div>{user.email}</div>
      <div>{user.password}</div>
      <div></div>
    </div>
  );
}

export default UserRow;
