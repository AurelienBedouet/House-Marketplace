"use client";

import { auth } from "@/lib/firebase/firebase.config";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-10 h-[60px] flex items-center">
      <div className="mx-auto w-full px-4 max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-500">
          Property Portal
        </Link>

        {!user ? (
          <Link href="/signin" className="text-lg font-semibold text-blue-500">
            Login
          </Link>
        ) : (
          <Link href="/profile" className="text-lg font-semibold">
            <FaUserCircle size={28} color="rgb(37 99 235)" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
