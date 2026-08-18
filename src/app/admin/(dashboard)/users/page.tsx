import { Suspense } from "react";

import UsersLists from "@/features/users/containers/lists";

const UsersPage = () => {
  return (
    <Suspense>
      <UsersLists />
    </Suspense>
  );
};

export default UsersPage;
