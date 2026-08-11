import ProfileDashboard from "../components/profileDashboard";
import { checkUserHavePassword, getCustomerProfile } from "../dal/query";

const CustomerProfile = async () => {
  const userHavePassword = await checkUserHavePassword();

  if (!userHavePassword) {
    return null;
  }

  const profile = await getCustomerProfile();

  return <ProfileDashboard profile={profile} />;
};

export default CustomerProfile;
