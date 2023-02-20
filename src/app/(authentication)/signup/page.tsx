"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase.config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import GoogleAuth from "../GoogleAuth";
import { MyTimestamp } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@/components/layout/Button";
import InputField from "@/components/layout/InputField";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    createdAt: {} as MyTimestamp,
  });

  const { name, email, password } = formData;

  const [user] = useAuthState(auth);

  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      const formDataCopy: Partial<typeof formData> = { ...formData };
      delete formDataCopy.password;
      formDataCopy.createdAt = serverTimestamp();

      await setDoc(doc(db, "users", userCredential.user.uid), formDataCopy);

      toast.success("Account created with success!");

      router.push("/profile");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField
          inputId="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={onChange}
        />

        <InputField
          inputId="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />

        <div className="relative">
          {showPassword ? (
            <AiFillLock
              size={20}
              color={"#2c2c2c"}
              onClick={() => setShowPassword(prevState => !prevState)}
              className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
            />
          ) : (
            <MdOutlineVisibility
              size={20}
              color={"#2c2c2c"}
              onClick={() => setShowPassword(prevState => !prevState)}
              className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
            />
          )}

          <InputField
            inputId="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={onChange}
          />
        </div>

        <Button type="submit" buttonStyle="bg-slate-800 text-yellow-500">
          Sign up
        </Button>
      </form>

      <GoogleAuth />

      <p>
        Already have an account ?{" "}
        <Link href="/signin" className="underline">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUp;
