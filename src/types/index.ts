import { FieldValue, Timestamp } from "firebase/firestore";

export interface MyTimestamp extends Partial<FieldValue>, Partial<Timestamp> {
  isEqual: (other: any) => boolean;
  valueOf: () => any;
}

export interface IGeolocation {
  lat: number;
  lng: number;
}

export interface IUser {
  name: string;
  email: string;
  createdAt: MyTimestamp;
}

export interface IListingData {
  bathrooms: number;
  bedrooms: number;
  discountedPrice: number;
  furnished: boolean;
  geolocation: IGeolocation;
  featuredImage?: File;
  featuredImageUrl: string;
  images?: File[];
  imgUrls: string[];
  address: string;
  name: string;
  offer: boolean;
  parking: boolean;
  regularPrice: number;
  type: string;
  userRef: string;
  createdAt?: MyTimestamp;
}

export interface IListingObject {
  id: string;
  data: IListingData;
}
