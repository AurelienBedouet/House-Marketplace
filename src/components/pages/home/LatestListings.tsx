"use client";

import { useEffect, useState } from "react";
import { IListingData, IListingObject } from "@/types";
import { db } from "@/utils/firebase.config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Loader from "../../shared/Loader";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useRouter } from "next/navigation";

type Props = {};

const LatestListings = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<IListingObject[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("createdAt", "desc"), limit(5));
        const querySnap = await getDocs(q);

        const listings: IListingObject[] = [];

        querySnap.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data() as IListingData,
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return listings ? (
    <>
      <div className="slide-container mt-4">
        <Slide indicators={true} pauseOnHover={true}>
          {listings.map(({ data, id }) => (
            <div
              key={id}
              onClick={() => router.push(`/category/${data.type}/${id}`)}
              className="cursor-pointer relative"
            >
              <div
                className="bg-cover h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] rounded-xl"
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                }}
              />
              <p className="absolute left-0 top-12 font-semibold text-xl lg:text-2xl p-2 max-w-[90%] text-white bg-black/80">
                {data.name}
              </p>
              <p className="absolute left-0 top-24 font-semibold text-xl lg:text-2xl p-2 max-w-[90%] text-white bg-black/80">
                ${data.discountedPrice ?? data.regularPrice}{" "}
                {data.type === "rent" && "/ month"}
              </p>
            </div>
          ))}
        </Slide>
      </div>
    </>
  ) : (
    <></>
  );
};

export default LatestListings;
