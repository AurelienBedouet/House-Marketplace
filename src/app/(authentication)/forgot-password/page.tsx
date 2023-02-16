"use client";

import Button from "@/components/layout/Button";
import InputField from "@/components/layout/InputField";
import { auth } from "@/lib/firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
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
    <>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-4 max-w-md m-auto"
      >
        <h1 className="text-3xl text-center font-bold mb-6">Forgot Password</h1>
        <InputField
          inputId="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />

        <Button type="submit" buttonStyle="bg-gray-500 text-slate-50">
          Send Reset Link
        </Button>

        <Link href="/signin" className="underline">
          Sign in
        </Link>
      </form>
    </>
  );
};

export default ForgotPassword;
