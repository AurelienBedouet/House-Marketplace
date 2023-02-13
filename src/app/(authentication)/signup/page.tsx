"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/utils/firebase.config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import {
  doc,
  serverTimestamp,
  setDoc,
  FieldValue,
  Timestamp,
} from "firebase/firestore";
import GoogleAuth from "../GoogleAuth";
import { MyTimestamp } from "@/types";

const SignUp = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    createdAt: serverTimestamp() as MyTimestamp,
  });

  const { name, email, password } = formData;

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

      const user = userCredential.user;

      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      const formDataCopy: Partial<typeof formData> = { ...formData };
      delete formDataCopy.password;
      formDataCopy.createdAt = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success("Account created with success!");

      router.push("/profile");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <div className="flex items-center h-[calc(100vh-60px)] mx-auto w-full px-4 max-w-md">
      <div className="w-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
            className="rounded-lg shadow-md border-gray-200"
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            className="rounded-lg shadow-md border-gray-200"
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

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              className="w-full pr-12 rounded-lg shadow-md border-gray-200"
            />
          </div>

          <button type="submit" className="mb-4 py-3 px-5 rounded-lg shadow-lg">
            Sign Up
          </button>
        </form>

        <GoogleAuth />

        <p>
          Already have an account ?{" "}
          <Link href="/signin" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
