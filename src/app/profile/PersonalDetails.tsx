"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Button from "@/components/layout/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import InputField from "@/components/layout/InputField";
import Loader from "@/components/shared/Loader";
import Link from "next/link";

const PersonalDetails = () => {
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { name, email } = formData;

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    user &&
      setFormData({ name: user.displayName || "", email: user.email || "" });
  }, [user]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (user && user.displayName !== name) {
        // Update display name in fb
        await updateProfile(user, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          name,
        });

        setFormData({ name: user.displayName || "", email: user.email || "" });

        toast.success("Profile successfully updated!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not update profile details");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="w-full flex flex-col gap-4 bg-gray-300 py-5 px-5 sm:px-10 rounded-lg shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <h2 className="">Personal Details</h2>
          <Button
            type="button"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(prevState => !prevState);
            }}
            buttonStyle="max-w-max bg-blue-300 text-gray-900"
          >
            {changeDetails ? "Done" : "Change"}
          </Button>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <InputField
            inputId="name"
            label="Name"
            type="text"
            value={name}
            onChange={onChange}
            inputStyle={`${changeDetails ? "bg-white" : "bg-gray-200"}`}
            disabled={!changeDetails}
            row={true}
          />

          <InputField
            inputId="email"
            label="Email"
            type="email"
            value={email}
            onChange={onChange}
            inputStyle={`${changeDetails ? "bg-white" : "bg-gray-200"}`}
            disabled={!changeDetails}
            row={true}
          />
        </form>
      </div>
    );
  }

  return (
    <div className="mt-32">
      <h3 className="mb-8 text-xl sm:text-2xl font-semibold">
        You are not logged in
      </h3>
      <Link
        href="/signin"
        className="w-full py-3 px-5 rounded-xl shadow-lg font-semibold bg-green-400 text-gray-900"
      >
        Sign In
      </Link>
    </div>
  );
};

export default PersonalDetails;
