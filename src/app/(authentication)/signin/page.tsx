"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { auth } from "@/utils/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleAuth from "../GoogleAuth";

type Props = {};

const SignIn = (props: Props) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        toast.success("Successfully Signed in!");
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <div className="flex items-center h-[calc(100vh-60px)] mx-auto w-full px-4 max-w-md">
      <div className="w-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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

          <Link href="/forgot-password" className="text-right">
            Forgot Password
          </Link>

          <button type="submit" className="mb-4 py-3 px-5 rounded-lg shadow-lg">
            Sign In
          </button>
        </form>

        <GoogleAuth />

        <p>
          Do not have an account yet ?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
