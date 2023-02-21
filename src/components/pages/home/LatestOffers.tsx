"use client";

import { useState, useEffect } from "react";
import { IListingData } from "@/types";
import Loader from "../../shared/Loader";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import Link from "next/link";
import { getListings } from "@/lib/firebase/firestore.fetch";
import { lastFiveOffersQuery } from "@/lib/firebase/firestore.queries";
import { toast } from "react-toastify";

const LatestOffers = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([] as IListingData[]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await getListings(lastFiveOffersQuery);
        setListings(data);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return listings ? (
    <>
      <div className="flex items-center gap-8">
        <h2>Latest Offers</h2>
        <Link
          href="/offers"
          className="text-lg border rounded-lg px-3 py-1 bg-slate-800 text-yellow-500 transition duration-400 hover:opacity-80"
        >
          See all
        </Link>
      </div>
      <div className="slide-container mt-4">
        <Slide indicators={true} canSwipe={true} arrows={false}>
          {listings.map(
            ({
              id,
              type,
              featuredImageUrl,
              title,
              discountedPrice,
              regularPrice,
            }) => (
              <div key={id} className="relative">
                <Link href={`/category/${type}/${id}`}>
                  <div
                    className="w-full rounded-xl shadow-xl aspect-[16/9] min-h-[240px] max-h-[480px] transition ease-in duration-400 hover:opacity-80"
                    style={{
                      background: `url(${featuredImageUrl}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  />
                  <p className="absolute left-0 top-6 sm:top-12 text-white bg-black/80 flex flex-col gap-2 px-4 py-2 rounded-r-lg font-semibold text-xl lg:text-2xl">
                    {title}
                  </p>
                </Link>
              </div>
            )
          )}
        </Slide>
      </div>
    </>
  ) : (
    <></>
  );
};

export default LatestOffers;
