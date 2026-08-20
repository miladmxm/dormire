import { getSession } from "@/lib/auth";

import UserTable from "../components/table";
import { getUsersList } from "../dal/query";

const UsersLists = async () => {
  const users = await getUsersList();
  const user = await getSession();

  return <UserTable data={users} adminId={user?.user.id || ""} />;
};

export default UsersLists;
