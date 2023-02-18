"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { IListingData } from "@/types";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase/firebase.config";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Loader from "@/components/shared/Loader";
import UploadImages from "../../components/shared/UploadImages";
import UploadFeaturedImage from "../../components/shared/UploadFeaturedImage";
import InputField from "@/components/layout/InputField";
import Button from "@/components/layout/Button";
import { uploadImage } from "@/lib/helpers/images";
import { onAuthStateChanged } from "firebase/auth";
import { fetchGeolocationData } from "@/lib/fetchData/fetchGeolocationData";

const CreateListing = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [formData, setFormData] = useState<IListingData>({
    type: "rent",
    title: "",
    description: "",
    bedrooms: 1,
    bathrooms: 1,
    featuredImage: {} as File,
    featuredImageUrl: "",
    parking: false,
    furnished: false,
    address: "",
    location: "",
    offer: false,
    regularPrice: 50,
    discountedPrice: 49,
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
    title,
    description,
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
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, user => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          router.push("/signin");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingData(true);

    if (discountedPrice && +discountedPrice >= +regularPrice) {
      setLoadingData(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    if (images && images.length > 6) {
      setLoadingData(false);
      toast.error("Max 6 images");
      return;
    }

    // Get Geolocation Data
    const geolocationData = await fetchGeolocationData(address);

    // Images
    let uploadedFeaturedImage;
    if (featuredImage && user) {
      uploadedFeaturedImage = await uploadImage(
        user.uid,
        featuredImage,
        "images/featuredImage/"
      );
    }

    const uploadImages = async (files: File[]) => {
      if (!user) return;
      const imagePromises = Array.from(files, image =>
        uploadImage(user?.uid, image, "images/")
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
      geolocation: {
        lat: geolocationData?.latitude || 0,
        lng: geolocationData?.longitude || 0,
      },
      location: geolocationData?.label || "",
      featuredImageUrl: uploadedFeaturedImage,
      imgUrls: uploadedImagesUrls,
      createdAt: serverTimestamp(),
    };

    delete formDataCopy.featuredImage;
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);

    setLoadingData(false);
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

  if (loadingData) {
    return <Loader />;
  }

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold mb-12 text-center">
          Create a Listing
        </h1>
      </header>

      <main>
        <form
          onSubmit={onSubmit}
          className="max-w-2xl w-full mx-auto flex flex-col gap-4"
        >
          <div className="flex gap-4">
            <Button
              type="button"
              id="type"
              value="sale"
              onClick={onMutate}
              buttonStyle={`${
                type === "sale" ? "bg-green-500 text-slate-50" : "bg-white"
              }`}
            >
              Sell
            </Button>
            <Button
              type="button"
              id="type"
              value="rent"
              onClick={onMutate}
              buttonStyle={`${
                type === "rent" ? "bg-green-500 text-slate-50" : "bg-white"
              }`}
            >
              Rent
            </Button>
          </div>

          {/* Title */}
          <InputField
            inputId="title"
            label="Title"
            type="text"
            value={title}
            onChange={onMutate}
            maxLength={32}
            minLength={10}
          />

          {/* Description */}
          <label className="text-xl font-semibold">Description</label>
          <textarea
            className="rounded-lg shadow-md border-gray-200"
            id="description"
            value={description}
            onChange={onMutate}
            rows={3}
            required
          />

          <div className="grid grid-cols-2">
            <InputField
              inputId="bedrooms"
              label="Bedrooms"
              type="number"
              value={+bedrooms}
              onChange={onMutate}
              min={1}
              max={1000}
              inputStyle="w-[100px]"
            />
            <InputField
              inputId="bathrooms"
              label="Bathrooms"
              type="number"
              value={+bathrooms}
              onChange={onMutate}
              min={1}
              max={1000}
              inputStyle="w-[100px]"
            />
          </div>

          <label htmlFor="parking" className="text-xl font-semibold">
            Parking spot
          </label>
          <div className="flex gap-4">
            <Button
              type="button"
              id="parking"
              value="true"
              onClick={onMutate}
              buttonStyle={`${
                parking ? "bg-green-500 text-slate-50" : "bg-white"
              }`}
            >
              Yes
            </Button>
            <Button
              type="button"
              id="parking"
              value="false"
              onClick={onMutate}
              buttonStyle={`${
                !parking && parking !== null
                  ? "bg-green-500 text-slate-50"
                  : "bg-white"
              }`}
            >
              No
            </Button>
          </div>

          <label htmlFor="furnished" className="text-xl font-semibold">
            Furnished
          </label>
          <div className="flex gap-4">
            <Button
              type="button"
              id="furnished"
              value="true"
              onClick={onMutate}
              buttonStyle={`${
                furnished ? "bg-green-500 text-slate-50" : "bg-white"
              }`}
            >
              Yes
            </Button>
            <Button
              type="button"
              id="furnished"
              value="false"
              onClick={onMutate}
              buttonStyle={`${
                !furnished && furnished !== null
                  ? "bg-green-500 text-slate-50"
                  : "bg-white"
              }`}
            >
              No
            </Button>
          </div>

          <label className="text-xl font-semibold">Address</label>
          <textarea
            className="rounded-lg shadow-md border-gray-200"
            id="address"
            value={address}
            onChange={onMutate}
            rows={3}
            required
          />

          <label className="text-xl font-semibold">Offer</label>
          <div className="flex gap-4">
            <Button
              type="button"
              id="offer"
              value="true"
              onClick={onMutate}
              buttonStyle={`${
                offer ? "bg-green-500 text-slate-50" : "bg-white"
              }`}
            >
              Yes
            </Button>
            <Button
              type="button"
              id="offer"
              value="false"
              onClick={onMutate}
              buttonStyle={`${
                !offer && offer !== null
                  ? "bg-green-500 text-slate-50"
                  : "bg-white"
              }`}
            >
              No
            </Button>
          </div>

          <InputField
            inputId="regularPrice"
            label="Regular Price"
            type="number"
            value={+regularPrice}
            onChange={onMutate}
            max={7500000000}
            min={50}
            step={type === "rent" ? 100 : 10000}
            isPricePerMonth={type === "rent"}
          />

          {offer && (
            <InputField
              inputId="discountedPrice"
              label="Discounted Price"
              type="number"
              value={+discountedPrice}
              onChange={onMutate}
              max={7500000000}
              min={49}
              step={type === "rent" ? 100 : 10000}
              isPricePerMonth={type === "rent"}
            />
          )}

          <UploadFeaturedImage setFormData={setFormData} />

          <UploadImages setFormData={setFormData} />

          <Button type="submit" buttonStyle={"bg-green-500 text-slate-50"}>
            Create Listing
          </Button>
        </form>
      </main>
    </>
  );
};

export default CreateListing;
