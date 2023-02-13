import { IListingData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaEdit } from "react-icons/fa";
import { MdBathtub, MdDelete } from "react-icons/md";

type Props = {
  listing: IListingData;
  id: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string, name: string) => void;
};

const ListingItem = ({ listing, id, onEdit, onDelete }: Props) => {
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
  } = listing;

  return (
    <li className="">
      <Link href={`/category/${type}/${id}`} className="">
        <Image
          src={featuredImageUrl}
          alt={name}
          width={480}
          height={270}
          className="w-auto"
          priority={true}
        />
        <div className="">
          <p className="">{address}</p>
          <p className="">{name}</p>

          <p className="">
            $
            {offer
              ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {type === "rent" && " / Month"}
          </p>
          <div className="">
            <FaBed />
            <p className="">
              {bedrooms > 1 ? `${bedrooms} Bedrooms` : "1 Bedroom"}
            </p>
            <MdBathtub />
            <p className="">
              {bathrooms > 1 ? `${bathrooms} Bathrooms` : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <MdDelete
          onClick={() => onDelete(id, name)}
          className="text-2xl cursor-pointer"
        />
      )}

      {onEdit && (
        <FaEdit onClick={() => onEdit(id)} className="cursor-pointer" />
      )}
    </li>
  );
};

export default ListingItem;
