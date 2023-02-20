"use client";

import { useState, useEffect } from "react";
import { IListingData } from "@/types";
import { auth, db } from "@/lib/firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import Loader from "@/components/shared/Loader";
import Link from "next/link";
import ListingInfo from "../../../../components/shared/ListingInfo";
import ListingMap from "@/components/shared/ListingMap";
import ListingImages from "@/components/shared/ListingImages";

const Listing = ({ params }: { params: { id: string } }) => {
  const [listing, setListing] = useState<IListingData>({} as IListingData);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const [user] = useAuthState(auth);

  const {
    title,
    address,
    location,
    featuredImageUrl,
    imgUrls,
    geolocation,
    userRef,
  } = listing;

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data() as IListingData);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col gap-12">
      {/* Featured Image or Slider */}
      <ListingImages
        title={title}
        featuredImageUrl={featuredImageUrl}
        imgUrls={imgUrls}
        shareLinkCopied={shareLinkCopied}
        setShareLinkCopied={setShareLinkCopied}
      />

      <ListingInfo listing={listing} />

      {geolocation.lat && geolocation.lng ? (
        <ListingMap
          address={address}
          location={location}
          lat={geolocation.lat}
          lng={geolocation.lng}
        />
      ) : null}

      {/* Contact Landlord Link */}
      {user?.uid !== userRef && (
        <Link
          href={`/contact/${userRef}?listingName=${title}`}
          className="text-center w-full py-3 px-5 rounded-xl shadow-lg font-semibold bg-slate-800 text-yellow-500 transition duration-200 hover:-translate-y-1"
        >
          Contact Landlord
        </Link>
      )}
    </main>
  );
};

export default Listing;
