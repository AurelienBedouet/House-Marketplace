"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase.config";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import ListingItem from "@/components/ListingItem";
import { IListingData, IListingObject } from "@/types";

const Category = ({ params }: { params: { slug: string } }) => {
  const [listings, setListings] = useState<IListingObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState({});

  const searchParams = params.slug;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingsRef,
          where("type", "==", searchParams),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

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
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [searchParams]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Create a query
      const q = query(
        listingsRef,
        where("type", "==", searchParams),
        orderBy("createdAt", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings: IListingObject[] = [];

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data() as IListingData,
        });
      });

      setListings(prevState => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };

  return (
    <div className="">
      <header>
        <h1 className="">
          {searchParams === "rent" ? "Places for rent" : "Places for sale"}
        </h1>
      </header>

      {loading ? (
        <Loader />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="">
              {listings.map(({ data, id }) => (
                <ListingItem listing={data} id={id} key={id} />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <button type="button" onClick={onFetchMoreListings} className="">
              Load More
            </button>
          )}
        </>
      ) : (
        <p>No listings for {searchParams}</p>
      )}
    </div>
  );
};

export default Category;
