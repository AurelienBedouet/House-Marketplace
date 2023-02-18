import { IListingData, IMessage } from "@/types";
import { collection, getDocs, Query } from "firebase/firestore";
import { db } from "./firebase.config";

export const getListings = async (query: Query) => {
  const querySnap = await getDocs(query);

  const lastVisible = querySnap.docs[querySnap.docs.length - 1];

  const data: IListingData[] = [];

  querySnap.forEach(doc => {
    data.push({ ...(doc.data() as IListingData), id: doc.id });
  });

  return { data, lastVisible };
};

export const getMessages = async (userId: string) => {
  const messagesCollection = collection(db, "users", userId, "messages");
  const snapshot = await getDocs(messagesCollection);
  const messages = snapshot.docs.map(doc => ({
    ...(doc.data() as IMessage),
    id: doc.id,
  }));

  return messages;
};
