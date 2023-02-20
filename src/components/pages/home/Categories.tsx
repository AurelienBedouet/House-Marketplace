import Image from "next/image";
import Link from "next/link";
import rentCategoryImage from "@/assets/rent.jpg";
import sellCategoryImage from "@/assets/sale.jpg";

const Categories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      <Link href="/category/rent">
        <h2 className="mt-8 mb-4">Places for rent</h2>
        <Image
          src={rentCategoryImage}
          alt="rent"
          width={980}
          height={640}
          className="w-full rounded-xl shadow-xl aspect-[16/9] object-cover max-h-[360px] transition ease-in duration-400 hover:opacity-80"
        />
      </Link>
      <Link href="/category/sale">
        <h2 className="mt-8 mb-4">Places for sale</h2>
        <Image
          src={sellCategoryImage}
          alt="sale"
          width={980}
          height={640}
          className="w-full rounded-xl shadow-xl aspect-[16/9] object-cover max-h-[360px] transition ease-in duration-400 hover:opacity-80"
        />
      </Link>
    </div>
  );
};

export default Categories;
