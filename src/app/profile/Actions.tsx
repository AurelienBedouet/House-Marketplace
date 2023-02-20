"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase/firebase.config";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IMessage } from "@/types";
import { getMessages } from "@/lib/firebase/firestore.fetch";
import Button from "@/components/layout/Button";
import ClientMessage from "@/components/shared/ClientMessage";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

type Props = {};

const Actions = (props: Props) => {
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUserMessages = async () => {
      if (user) {
        try {
          const data = await getMessages(user.uid);
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserMessages();
  }, [user]);

  const deleteMessage = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, "users", user?.uid, "messages", id));
      const updatedMessages = messages.filter(message => message.id !== id);
      setMessages(updatedMessages);
      toast.success("Message successfully deleted");
    }
  };

  const confirmDeleteMessage = (id: string) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteMessage(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items justify-between">
        <Link
          href="/create-listing"
          className="flex items-center gap-4 py-3 px-5 rounded-lg shadow-lg max-w-max bg-slate-800 text-yellow-500 font-semibold transition duration-200 hover:-translate-y-1"
        >
          Sell or Rent your property <BsFillArrowRightCircleFill size={24} />
        </Link>

        {messages.length > 0 && (
          <Button
            type="button"
            onClick={() => setShowMessages(!showMessages)}
            buttonStyle="flex items-center gap-4 justify-between max-w-max bg-yellow-500 text-slate-800"
          >
            {showMessages ? "Hide Messages" : "See Messages"}{" "}
            <span className="bg-red-500 text-slate-50 w-6 h-6 rounded-md flex items-center justify-center">
              {messages.length}
            </span>
          </Button>
        )}
      </div>

      {/* Messages */}
      {showMessages && messages.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2>My Messages</h2>
          {messages.map(msg => (
            <ClientMessage
              key={msg.id}
              msg={msg}
              onDelete={() => confirmDeleteMessage(msg.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Actions;
