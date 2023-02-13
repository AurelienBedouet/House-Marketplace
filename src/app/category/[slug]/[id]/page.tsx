"use client";

import { useState, useEffect } from "react";
import { IListingData } from "@/types";
import { auth, db } from "@/utils/firebase.config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import Loader from "@/components/shared/Loader";
import Link from "next/link";
import { BsFillShareFill } from "react-icons/bs";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Slider from "@/components/shared/Slider";

const Listing = ({ params }: { params: { id: string } }) => {
  const [listing, setListing] = useState<IListingData>({} as IListingData);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const router = useRouter();
  const [user] = useAuthState(auth);

  const {
    type,
    name,
    offer,
    bedrooms,
    bathrooms,
    address,
    imgUrls,
    discountedPrice,
    regularPrice,
    parking,
    furnished,
    geolocation,
    userRef,
  } = listing;

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data() as IListingData);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="mt-32">
      {/* <Helmet>
        <title>{name}</title>
      </Helmet> */}

      <Slider urls={imgUrls} />

      <div
        className=""
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <BsFillShareFill />
      </div>

      {shareLinkCopied && <p className="">Link Copied!</p>}

      <div className="">
        <p className="">
          {name} - $
          {offer
            ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="">{address}</p>
        <p className="">For {type === "rent" ? "Rent" : "Sale"}</p>
        {offer && (
          <p className="">${regularPrice - discountedPrice} discount</p>
        )}

        <ul className="">
          <li>{bedrooms > 1 ? `${bedrooms} Bedrooms` : "1 Bedroom"}</li>
          <li>{bathrooms > 1 ? `${bathrooms} Bathrooms` : "1 Bathroom"}</li>
          <li>{parking && "Parking Spot"}</li>
          <li>{furnished && "Furnished"}</li>
        </ul>

        <p className="">Address</p>

        <div className="w-full h-[200px] overflow-x-hidden mb-12 lg:h-[400px]">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[geolocation.lat, geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[geolocation.lat, geolocation.lng]}>
              <Popup>{address}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {user?.uid !== userRef && (
          <Link href={`/contact/${userRef}?listingName=${name}`} className="">
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
};

export default Listing;
