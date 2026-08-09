import OnlySetPassword from "../components/onlySetPassword";
import ProfileDashboard from "../components/profileDashboard";
import { checkUserHavePassword, getCustomerProfile } from "../dal/query";

const CustomerProfile = async () => {
  const profile = await getCustomerProfile();
  const userHavePassword = await checkUserHavePassword();

  if (!userHavePassword) {
    return <OnlySetPassword />;
  }

  return <ProfileDashboard profile={profile} />;
};

export default CustomerProfile;
