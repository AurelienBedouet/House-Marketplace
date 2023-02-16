import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase.config";

const listingsRef = collection(db, "listings");

export const lastFiveListingsQuery = query(
  listingsRef,
  orderBy("createdAt", "desc"),
  limit(5)
);

export const lastFiveOffersQuery = query(
  listingsRef,
  where("offer", "==", true),
  orderBy("createdAt", "desc"),
  limit(5)
);
