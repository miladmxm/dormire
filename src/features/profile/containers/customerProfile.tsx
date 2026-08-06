import ProfileDashboard from "../components/profileDashboard";
import { getCustomerProfile } from "../dal/query";

const CustomerProfile = async () => {
  const profile = await getCustomerProfile();

  return <ProfileDashboard profile={profile} />;
};

export default CustomerProfile;
