import { IListingData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaEdit } from "react-icons/fa";
import { MdBathtub, MdDelete, MdLocationOn } from "react-icons/md";

type Props = {
  listing: IListingData;
  onEdit?: (id: string) => void;
  onDelete?: (id: string, name: string) => void;
};

const ListingItem = ({ listing, onEdit, onDelete }: Props) => {
  const {
    type,
    featuredImageUrl,
    name,
    address,
    offer,
    discountedPrice,
    regularPrice,
    bedrooms,
    bathrooms,
    id,
  } = listing;

  return (
    <li className="grid grid-cols-12 bg-slate-50 text-gray-900 rounded-xl shadow-xl">
      <Link
        href={`/category/${type}/${id}`}
        className="relative group col-span-12 md:col-span-5"
      >
        {/* Featured Image */}
        <Image
          src={featuredImageUrl}
          alt={name}
          width={480}
          height={270}
          className="rounded-t-xl md:rounded-l-xl md:rounded-r-none aspect-[16/9] w-full h-[270px] md:h-full group-hover:opacity-50"
        />
        <span className="hidden group-hover:block absolute bg-white px-4 py-1 font-semibold rounded-xl shadow-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          See Listing
        </span>
      </Link>

      <div className="col-span-12 md:col-span-7 w-full min-h-[240px] p-3 sm:p-5 flex justify-between">
        {/* Listing Infos */}
        <div className="flex flex-col gap-4">
          <h3>{name}</h3>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold text-blue-500">
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
            </p>

            <p className="flex items-center gap-2 text-gray-900 font-semibold">
              <MdLocationOn color="rgb(37 99 235)" /> {address}
            </p>

            <p className="flex items-center gap-2 text-gray-900 font-semibold">
              <FaBed color="rgb(37 99 235)" />
              {bedrooms > 1 ? `${bedrooms} Bedrooms` : "1 Bedroom"}
            </p>

            <p className="flex items-center gap-2 text-gray-900 font-semibold">
              <MdBathtub color="rgb(37 99 235)" />
              {bathrooms > 1 ? `${bathrooms} Bathrooms` : "1 Bathroom"}
            </p>
          </div>
        </div>

        {/* Edit and Delete Buttons */}
        <div
          className={`h-full flex flex-col gap-4 items-end ${
            onEdit && "justify-between"
          }`}
        >
          <div className="flex flex-col gap-2">
            <span className="text-center border-none px-4 py-1 rounded-lg text-slate-50 bg-blue-500 shadow-lg font-semibold">
              For {type.toUpperCase()}
            </span>
            {offer && (
              <span className="text-center border-none px-4 py-1 rounded-lg text-slate-50 bg-green-600 shadow-lg font-semibold">
                Offer
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {onEdit && (
              <FaEdit
                size={24}
                color="rgb(37 99 235)"
                onClick={() => onEdit(id)}
                className="text-xl cursor-pointer transition duration-300 hover:scale-110"
              />
            )}

            {onDelete && (
              <MdDelete
                size={24}
                color="rgb(37 99 235)"
                onClick={() => onDelete(id, name)}
                className="text-xl cursor-pointer transition duration-300 hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListingItem;
