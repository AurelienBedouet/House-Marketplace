import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import LogoutButton from "@/components/shared/LogoutButton";
import PersonalDetails from "./PersonalDetails";
import UserListings from "./UserListings";

const Profile = () => {
  return (
    <>
      <header className="flex items-center justify-between mb-8">
        <h1>My Profile</h1>
        <LogoutButton />
      </header>

      <main className="flex flex-col gap-4">
        <PersonalDetails />

        <Link
          href="/create-listing"
          className="flex items-center gap-4 py-3 px-5 my-8 rounded-lg shadow-lg max-w-max bg-green-400 text-gray-900 font-semibold"
        >
          Sell or Rent your property <BsFillArrowRightCircleFill size={24} />
        </Link>

        <UserListings />
      </main>
    </>
  );
};

export default Profile;
