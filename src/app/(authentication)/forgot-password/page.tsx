"use client";

import { auth } from "@/utils/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className="flex items-center h-[calc(100vh-60px)] mx-auto w-full px-4 max-w-md">
      <div className="w-full">
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-4 max-w-md m-auto"
        >
          <h1 className="text-3xl text-center font-bold mb-6">
            Forgot Password
          </h1>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            className="rounded-lg shadow-md border-gray-200"
          />
          <button type="submit" className="mb-4 py-3 px-5 rounded-lg shadow-lg">
            Send Reset Link
          </button>
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
