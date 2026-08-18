import UserTable from "../components/table";
import { getUsersList } from "../dal/query";

const UsersLists = async () => {
  const { users } = await getUsersList();
  return <UserTable data={users} />;
};

export default UsersLists;
