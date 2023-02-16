"use client";

import { useState, useEffect, FormEvent } from "react";
import { IListingData } from "@/types";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase/firebase.config";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import Loader from "@/components/shared/Loader";
import UploadImages from "../../../components/shared/UploadImages";
import UploadFeaturedImage from "../../../components/shared/UploadFeaturedImage";

const EditListing = ({ params }: { params: { id: string } }) => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IListingData>({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    featuredImage: {} as File,
    featuredImageUrl: "",
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    geolocation: {
      lat: 0,
      lng: 0,
    },
    userRef: "",
    imgUrls: [],
    id: "",
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    featuredImage,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    geolocation,
  } = formData;

  const [user] = useAuthState(auth);
  const router = useRouter();

  // Redirect if listing is not user's
  useEffect(() => {
    if (formData.userRef && formData.userRef !== user?.uid) {
      toast.error("You can not edit that listing");
      router.push("/");
    }
  }, [formData, user?.uid, router]);

  // Fetch listing to edit
  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data() as IListingData);
        setLoading(false);
      } else {
        toast.error("Listing does not exist");
        router.push("/");
      }
    };

    fetchListing();
  }, [params.id, router]);

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, userRef: user.uid });
    } else {
      router.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (discountedPrice && discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    if (images && images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images");
      return;
    }

    // let googleAddress: string;
    // let googleGeolocation = {
    //   lat: 0,
    //   lng: 0,
    // };

    // if (geolocationEnabled) {
    //   const response = await fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
    //   );

    //   const data = await response.json();

    //   googleGeolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
    //   googleGeolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

    //   googleAddress =
    //     data.status === "ZERO_RESULTS"
    //       ? undefined
    //       : data.results[0]?.formatted_address;

    //   if (googleAddress === undefined || googleAddress.includes("undefined")) {
    //     setLoading(false);
    //     toast.error("Please enter a correct address");
    //     return;
    //   } else {
    //     setFormData(prevFormData => ({
    //       ...prevFormData,
    //       address: googleAddress,
    //       geolocation: {
    //         lat: googleGeolocation.lat,
    //         lng: googleGeolocation.lng,
    //       },
    //     }));
    //   }
    // }

    const uploadImage = async (image: File, path: string) => {
      const storage = getStorage();
      const fileName = `${user?.uid}-${image.name}-${crypto.randomUUID()}`;
      const storageRef = ref(storage, path + fileName);

      const response = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(response.ref);
      return url;
    };

    let uploadedFeaturedImage;
    if (featuredImage) {
      uploadedFeaturedImage = await uploadImage(
        featuredImage,
        "images/featuredImage/"
      );
    }

    const uploadImages = async (files: File[]) => {
      const imagePromises = Array.from(files, image =>
        uploadImage(image, "images/")
      );

      const urls = await Promise.all(imagePromises);

      return urls;
    };

    let uploadedImagesUrls;
    if (images) {
      uploadedImagesUrls = await uploadImages(images);
    }

    const formDataCopy: Partial<typeof formData> = {
      ...formData,
      featuredImageUrl: uploadedFeaturedImage,
      imgUrls: uploadedImagesUrls,
      createdAt: serverTimestamp(),
    };

    delete formDataCopy.featuredImage;
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    // Update listing
    const docRef = doc(db, "listings", params.id);
    await updateDoc(docRef, formDataCopy);

    setLoading(false);
    toast.success("Listing saved");
    router.push(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e: any) => {
    let boolean: boolean | null = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Text/Booleans/Numbers
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold mb-8">Edit Listing</h1>
      </header>

      <main>
        <form
          onSubmit={onSubmit}
          className="max-w-sm w-full flex flex-col gap-4"
        >
          <div className="flex gap-4">
            <button
              type="button"
              className={`w-full py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                type === "sale" && "bg-green-500 text-slate-50"
              }
              `}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={`w-full py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                type === "rent" && "bg-green-500 text-slate-50"
              }
              `}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="rounded-lg shadow-md border-gray-200"
              type="text"
              id="name"
              value={name}
              onChange={onMutate}
              maxLength={32}
              minLength={10}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="bedrooms" className="text-xl font-semibold">
                Bedrooms
              </label>
              <input
                className="w-[100px] rounded-lg shadow-md border-gray-200"
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bathrooms" className="text-xl font-semibold">
                Bathrooms
              </label>
              <input
                className="w-[100px] rounded-lg shadow-md border-gray-200"
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <label htmlFor="parking" className="text-xl font-semibold">
            Parking spot
          </label>
          <div className="flex gap-4">
            <button
              className={`w-[100px] py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                parking && "bg-green-500 text-slate-50"
              }
              `}
              type="button"
              id="parking"
              value="true"
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={`w-[100px] py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                !parking && parking !== null && "bg-green-500 text-slate-50"
              }
            `}
              type="button"
              id="parking"
              value="false"
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label htmlFor="furnished" className="text-xl font-semibold">
            Furnished
          </label>
          <div className="flex gap-4">
            <button
              className={`w-[100px] py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                furnished && "bg-green-500 text-slate-50"
              }
              `}
              type="button"
              id="furnished"
              value="true"
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={`w-[100px] py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                !furnished && furnished !== null && "bg-green-500 text-slate-50"
              }
            `}
              type="button"
              id="furnished"
              value="false"
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="text-xl font-semibold">Address</label>
          <textarea
            className="rounded-lg shadow-md border-gray-200"
            id="address"
            value={address}
            onChange={onMutate}
            required
          />

          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="text-xl font-semibold">Latitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="latitude"
                  value={geolocation.lat}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className="text-xl font-semibold">Longitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="longitude"
                  value={geolocation.lng}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className="text-xl font-semibold">Offer</label>
          <div className="flex gap-4">
            <button
              className={`w-[100px] py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                offer && "bg-green-500 text-slate-50"
              }
            `}
              type="button"
              id="offer"
              value="true"
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={`w-[100px] py-3 px-5 rounded-xl shadow-lg font-semibold bg-white transition duration-200 hover:-translate-y-1 ${
                !offer && offer !== null && "bg-green-500 text-slate-50"
              }
          `}
              type="button"
              id="offer"
              value="false"
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="text-xl font-semibold">Regular Price</label>
          <div className="formPriceDiv">
            <input
              className="rounded-lg shadow-md border-gray-200"
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
            />
            {type === "rent" && <p className="formPriceText">$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className="text-xl font-semibold">Discounted Price</label>
              <input
                className="rounded-lg shadow-md border-gray-200"
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onMutate}
                min="50"
                max="750000000"
                required={offer}
              />
            </>
          )}

          <UploadFeaturedImage setFormData={setFormData} />

          <UploadImages setFormData={setFormData} />

          <button type="submit" className="py-3 px-5 rounded-lg shadow-lg mt-4">
            Edit Listing
          </button>
        </form>
      </main>
    </>
  );
};

export default EditListing;
