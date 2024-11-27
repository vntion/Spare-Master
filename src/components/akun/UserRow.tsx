import { formatString } from "../../utils/helpers";
import { Akun } from "../../utils/interfaces";

interface Props {
  user: Akun;
}

function UserRow({ user }: Props) {
  const formattedNama = formatString(user.nama, 25);
  const formattedEmail = formatString(user.email, 40);

  return (
    <div className="grid grid-cols-[1fr_3fr_5fr_3fr_1fr] items-center p-3 dark:text-white">
      <div>{user.id}</div>
      <div>{formattedNama}</div>
      <div>{formattedEmail}</div>
      <div>{user.password}</div>
      <div></div>
    </div>
  );
}

export default UserRow;
