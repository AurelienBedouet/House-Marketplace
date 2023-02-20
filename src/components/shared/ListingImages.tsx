"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { BsFillShareFill } from "react-icons/bs";
import Slider from "./Slider";

type Props = {
  title: string;
  featuredImageUrl: string;
  imgUrls: string[];
  shareLinkCopied: boolean;
  setShareLinkCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListingImages = ({
  title,
  featuredImageUrl,
  imgUrls,
  shareLinkCopied,
  setShareLinkCopied,
}: Props) => {
  const allImages = [featuredImageUrl, ...imgUrls];

  const pathname = usePathname();

  const urlToCopy = `https://www.machin/${pathname}`;

  return (
    <div className="relative">
      {imgUrls.length > 0 ? (
        <Slider urls={allImages} />
      ) : (
        <Image
          src={featuredImageUrl}
          alt={title}
          width={1280}
          height={720}
          className="w-full rounded-xl shadow-xl aspect-[16/9] min-h-[240px] max-h-[480px]"
        />
      )}

      <span
        className="absolute top-5 right-5 bg-white p-3 sm:p-4 rounded-full shadow-xl cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(urlToCopy);
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
