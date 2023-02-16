import React from "react";
import Image from "next/image";
import { BsFillShareFill } from "react-icons/bs";
import Slider from "./Slider";

type Props = {
  name: string;
  featuredImageUrl: string;
  imgUrls: string[];
  shareLinkCopied: boolean;
  setShareLinkCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListingImages = ({
  name,
  featuredImageUrl,
  imgUrls,
  shareLinkCopied,
  setShareLinkCopied,
}: Props) => {
  const allImages = [featuredImageUrl, ...imgUrls];

  return (
    <div className="relative">
      {imgUrls.length > 0 ? (
        <Slider urls={allImages} />
      ) : (
        <Image
          src={featuredImageUrl}
          alt={name}
          width={1280}
          height={720}
          className="w-full bg-cover rounded-xl shadow-xl h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px]"
        />
      )}

      <span
        className="absolute top-5 right-5 bg-white p-3 sm:p-4 rounded-full shadow-xl cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <BsFillShareFill />
      </span>

      {shareLinkCopied && (
        <p className="absolute top-24 right-5 bg-white px-3 py-1 rounded-xl shadow-xl font-semibold">
          Link Copied!
        </p>
      )}
    </div>
  );
};

export default ListingImages;
