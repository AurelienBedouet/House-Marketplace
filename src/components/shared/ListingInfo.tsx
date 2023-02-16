import { IListingData } from "@/types";
import { AiFillCar, AiFillCheckCircle } from "react-icons/ai";
import { FaBed, FaCouch, FaTimesCircle } from "react-icons/fa";
import { MdBathtub, MdLocationOn } from "react-icons/md";

type Props = {
  listing: IListingData;
};

const ListingInfo = ({ listing }: Props) => {
  const {
    type,
    name,
    offer,
    bedrooms,
    bathrooms,
    address,
    discountedPrice,
    regularPrice,
    parking,
    furnished,
  } = listing;

  return (
    <div className="flex flex-col gap-8 bg-slate-50 text-gray-900 rounded-xl shadow-xl p-5">
      {/* Name & Categories */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <h3>{name}</h3>

        <div className="flex gap-2">
          <span className="max-w-max text-center border-none px-4 py-1 rounded-lg text-slate-50 bg-blue-500 font-semibold">
            For {type.toUpperCase()}
          </span>
          {offer && (
            <span className="max-w-max text-center border-none px-4 py-1 rounded-lg text-slate-50 bg-green-500 font-semibold">
              Offer
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-blue-500">
            $
            {offer
              ? discountedPrice
                  .toString()
                  .replace(/^0+/, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : regularPrice
                  .toString()
                  .replace(/^0+/, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {type === "rent" && " / Month"}
          </span>

          {offer && (
            <span className="max-w-max text-center border-none px-4 py-1 rounded-lg text-slate-50 bg-blue-500 font-semibold">
              ${regularPrice - discountedPrice} discount!
            </span>
          )}
        </div>

        {/* Address */}
        <p className="flex items-center gap-2 text-gray-900 font-semibold">
          <MdLocationOn size="24" color="rgb(37 99 235)" /> {address}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <p className="flex items-center gap-2 text-gray-900 font-semibold">
            <FaBed size="24" color="rgb(37 99 235)" />
            {bedrooms > 1 ? `${bedrooms} Bedrooms` : "1 Bedroom"}
          </p>

          <p className="flex items-center gap-2 text-gray-900 font-semibold">
            <MdBathtub size="24" color="rgb(37 99 235)" />
            {bathrooms > 1 ? `${bathrooms} Bathrooms` : "1 Bathroom"}
          </p>

          <p className="flex items-center gap-2 text-gray-900 font-semibold">
            <AiFillCar size="24" color="rgb(37 99 235)" />
            Parking
            {parking ? (
              <AiFillCheckCircle size="24" color="rgb(34 197 94)" />
            ) : (
              <FaTimesCircle size="24" color="rgb(239 68 68)" />
            )}
          </p>

          <p className="flex items-center gap-2 text-gray-900 font-semibold">
            <FaCouch size="24" color="rgb(37 99 235)" />
            Furnished
            {furnished ? (
              <AiFillCheckCircle size="24" color="rgb(34 197 94)" />
            ) : (
              <FaTimesCircle size="24" color="rgb(239 68 68)" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
