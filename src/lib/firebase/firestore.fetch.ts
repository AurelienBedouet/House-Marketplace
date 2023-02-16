import { IListingData } from "@/types";
import { getDocs, Query } from "firebase/firestore";

export const getListings = async (query: Query) => {
  const querySnap = await getDocs(query);

  const lastVisible = querySnap.docs[querySnap.docs.length - 1];

  const data: IListingData[] = [];

  querySnap.forEach(doc => {
    data.push({ ...(doc.data() as IListingData), id: doc.id });
  });

  return { data, lastVisible };
};
