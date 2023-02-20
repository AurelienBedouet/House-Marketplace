"use client";

import { auth } from "@/lib/firebase/firebase.config";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-slate-800 text-yellow-500 shadow-lg fixed top-0 left-0 w-full z-[9999] h-[60px] flex items-center">
      <div className="mx-auto w-full px-4 max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Prestige Properties
        </Link>

        {!user ? (
          <Link href="/signin" className="text-lg font-semibold">
            Login
          </Link>
        ) : (
          <Link href="/profile" className="text-lg font-semibold">
            <FaUserCircle size={28} color="rgb(234 179 8)" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
