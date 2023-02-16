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
          className="text-lg border rounded-lg px-3 py-1 bg-blue-500 text-slate-50 transition duration-400 hover:opacity-80"
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
              name,
              discountedPrice,
              regularPrice,
            }) => (
              <div key={id} className="relative">
                <Link href={`/category/${type}/${id}`}>
                  <div
                    className="bg-cover h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] rounded-xl"
                    style={{
                      background: `url(${featuredImageUrl}) center no-repeat`,
                    }}
                  />
                  <p className="absolute left-0 top-12 font-semibold text-xl lg:text-2xl p-2 max-w-[90%] text-white bg-black/80">
                    {name}
                  </p>
                  <p className="absolute left-0 top-24 font-semibold text-xl lg:text-2xl p-2 max-w-[90%] text-white bg-black/80">
                    ${discountedPrice ?? regularPrice}{" "}
                    {type === "rent" && "/ month"}
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
