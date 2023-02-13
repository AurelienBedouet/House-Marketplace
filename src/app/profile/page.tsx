"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "@/utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IListingData, IListingObject } from "@/types";
import ListingItem from "@/components/ListingItem";

const Profile = () => {
  const [listings, setListings] = useState<IListingObject[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { name, email } = formData;

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    user &&
      setFormData({ name: user.displayName || "", email: user.email || "" });
  }, [user]);

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", user?.uid),
        orderBy("createdAt", "desc")
      );

      const querySnap = await getDocs(q);

      const listings: IListingObject[] = [];

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data() as IListingData,
        });
      });

      setListings(listings);
      setLoadingData(false);
    };

    fetchUserListings();
  }, [user?.uid]);

  const logout = () => {
    signOut(auth);
    router.push("/");
  };

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

  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", id));
      const updatedListings = listings.filter(listing => listing.id !== id);
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };

  const onEdit = (id: string) => router.push(`/edit-listing/${id}`);

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
      <div className="mt-32">
        <header>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button onClick={logout} className="py-3 px-5 rounded-lg shadow-lg">
            Log out
          </button>
        </header>

        <main>
          <div>
            <h2 className="text-2xl font-semibold">Personal Details</h2>
            <button
              type="button"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails(prevState => !prevState);
              }}
            >
              {changeDetails ? "done" : "change"}
            </button>
          </div>

          <form>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              disabled={!changeDetails}
              className={`rounded-lg shadow-md border-gray-200 ${
                changeDetails && "bg-gray-200"
              }`}
            />

            <input
              type="text"
              id="email"
              value={email}
              onChange={onChange}
              disabled={!changeDetails}
              className={`rounded-lg shadow-md border-gray-200 ${
                changeDetails && "bg-gray-200"
              }`}
            />
          </form>

          <Link
            href="/create-listing"
            className="flex items-center gap-4 py-3 px-5 rounded-lg shadow-lg max-w-max"
          >
            Sell or Rent your property <BsFillArrowRightCircleFill />
          </Link>

          {!loadingData && listings?.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold my-4">Your listings</h2>
              <ul className="">
                {listings.map(({ data, id }) => (
                  <ListingItem
                    key={id}
                    listing={data}
                    id={id}
                    onDelete={() => onDelete(id)}
                    onEdit={() => onEdit(id)}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    );
  }
  return (
    <>
      <h2>You are not logged in</h2>
      <Link href="/signin" className="py-3 px-5 rounded-lg shadow-lg">
        Sign In
      </Link>
    </>
  );
};

export default Profile;
