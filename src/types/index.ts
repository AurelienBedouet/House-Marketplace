import { FieldValue, Timestamp } from "firebase/firestore";
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

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
  geolocation: IGeolocation;
  featuredImage?: File;
  featuredImageUrl: string;
  images?: File[];
  imgUrls: string[];
  address: string;
  location: string;
  name: string;
  offer: boolean;
  furnished: boolean;
  parking: boolean;
  regularPrice: number;
  type: string;
  userRef: string;
  createdAt?: MyTimestamp;
  id: string;
}

export interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string;
  inputStyle?: string;
  label?: string;
  isPricePerMonth?: boolean;
  row?: boolean;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  id?: string;
  buttonStyle?: string;
}
