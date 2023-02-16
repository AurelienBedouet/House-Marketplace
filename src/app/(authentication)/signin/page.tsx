"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { auth } from "@/lib/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleAuth from "../GoogleAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@/components/layout/Button";
import InputField from "@/components/layout/InputField";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Successfully Signed in!");
      router.push("/profile");
    } catch (error) {
      toast.error("Bad User Credentials");
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

        <Link href="/forgot-password" className="text-right">
          Forgot Password
        </Link>

        <Button type="submit" buttonStyle="bg-gray-500 text-slate-50">
          Sign in
        </Button>
      </form>

      <GoogleAuth />

      <p>
        Do not have an account yet ?{" "}
        <Link href="/signup" className="underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default SignIn;
