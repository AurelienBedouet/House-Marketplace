import LogoutButton from "@/components/shared/LogoutButton";
import PersonalDetails from "./PersonalDetails";
import UserListings from "./UserListings";
import Actions from "./Actions";

const Profile = () => {
  return (
    <>
      <header className="flex items-center justify-between mb-8">
        <h1>My Profile</h1>
        <LogoutButton />
      </header>

      <main className="flex flex-col gap-8">
        <PersonalDetails />

        <Actions />

        <UserListings />
      </main>
    </>
  );
};

export default Profile;
