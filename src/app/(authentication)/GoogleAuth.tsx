import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/utils/firebase.config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

type Props = {};

const GoogleAuth = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // If user does not exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Successfully logged in!");
      router.push("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onGoogleClick}
        className="w-full mb-4 py-3 px-5 rounded-lg shadow-lg flex items-center justify-center gap-4"
      >
        Sign {pathname === "/signup" ? "up" : "in"} with <FcGoogle />
      </button>
    </div>
  );
};

export default GoogleAuth;
