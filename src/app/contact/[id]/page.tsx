"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { IUser } from "@/types";
import { db } from "@/lib/firebase/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "@/components/layout/Button";
import InputField from "@/components/layout/InputField";
import { useRouter } from "next/navigation";

const Contact = ({ params }: { params: { id: string } }) => {
  const [landlordData, setLandlordData] = useState<IUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const router = useRouter();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlordData(docSnap.data() as IUser);
      } else {
        router.push("/");
        toast.error("Could not get landlord data");
      }
    };

    getLandlord();
  }, [params.id, router]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const landlordRef = doc(db, "users", params.id);

      const messagesRef = collection(landlordRef, "messages");

      await addDoc(messagesRef, {
        ...formData,
        createdAt: serverTimestamp(),
      });

      toast.success("Message successfully sent!");

      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <>
      <header className="mb-8 text-center">
        <h1>Contact {landlordData?.name}</h1>
      </header>

      {landlordData !== null && (
        <main>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <InputField
              inputId="name"
              label="Name"
              type="text"
              value={name}
              onChange={onChange}
            />

            <InputField
              inputId="email"
              label="Email"
              type="email"
              value={email}
              onChange={onChange}
            />

            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="w-full rounded-lg shadow-md border-gray-200"
              id="message"
              value={message}
              onChange={onChange}
              rows={3}
              required
            />

            <Button
              type="submit"
              buttonStyle="mt-4 bg-slate-800 text-yellow-500"
            >
              Send Message
            </Button>
          </form>
        </main>
      )}
    </>
  );
};

export default Contact;
