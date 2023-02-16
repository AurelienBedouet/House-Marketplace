"use client";

import { IUser } from "@/types";
import { db } from "@/lib/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Contact = ({ params }: { params: { id: string } }) => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState<IUser>({} as IUser);
  const searchParams = useSearchParams();

  const { name, email } = landlord;

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data() as IUser);
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getLandlord();
  }, [params.id]);

  return (
    <>
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={e => setMessage(e.target.value)}
              ></textarea>
            </div>

            <a
              href={`mailto:${email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </>
  );
};

export default Contact;
