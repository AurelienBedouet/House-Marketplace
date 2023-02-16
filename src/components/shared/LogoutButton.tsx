"use client";

import { auth } from "@/lib/firebase/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Button from "../layout/Button";

const LogoutButton = () => {
  const router = useRouter();
  const logout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <Button
      type="button"
      onClick={logout}
      buttonStyle="max-w-max bg-red-300 text-gray-900"
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
