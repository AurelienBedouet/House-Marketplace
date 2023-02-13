"use client";

import { auth } from "@/utils/firebase.config";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-10 py-4">
      <div className="mx-auto w-full px-4 max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          Property Portal
        </Link>

        {!user ? (
          <Link href="/signin" className="text-lg font-semibold">
            Login
          </Link>
        ) : (
          <Link href="/profile" className="text-lg font-semibold">
            <FaUserCircle size={24} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
