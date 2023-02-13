import Image from "next/image";
import Link from "next/link";
import rentCategoryImage from "@/assets/rent.jpg";
import sellCategoryImage from "@/assets/sale.jpg";

const Categories = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-8 mt-4">
      <Link href="/category/rent">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Places for rent</h2>
        <Image
          src={rentCategoryImage}
          alt="rent"
          width={980}
          height={640}
          className="rounded-3xl aspect-[16/9] object-cover"
        />
      </Link>
      <Link href="/category/sale">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Places for sale</h2>
        <Image
          src={sellCategoryImage}
          alt="sale"
          width={980}
          height={640}
          className="rounded-3xl aspect-[16/9] object-cover"
        />
      </Link>
    </div>
  );
};

export default Categories;
