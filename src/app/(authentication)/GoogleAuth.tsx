import { usePathname, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase.config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "@/components/layout/Button";

const GoogleAuth = () => {
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
      router.push("/profile");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  };

  return (
    <Button
      type="button"
      onClick={onGoogleClick}
      buttonStyle="flex items-center justify-center gap-4 my-4 bg-slate-50 text-slate-800"
    >
      Sign {pathname === "/signup" ? "up" : "in"} with Google <FcGoogle />
    </Button>
  );
};

export default GoogleAuth;
