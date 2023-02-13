import HomeSlider from "@/components/HomeSlider";
import Image from "next/image";
import Link from "next/link";
import rentCategoryImage from "../assets/rent.jpg";
import sellCategoryImage from "../assets/sale.jpg";

export default function Home() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">Explore</h1>
      </header>

      <main className="mt-8">
        <HomeSlider />

        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="flex flex-col sm:flex-row gap-8 mt-4">
          <Link href="/category/rent">
            <Image
              src={rentCategoryImage}
              alt="rent"
              width={980}
              height={640}
              className="rounded-3xl aspect-[16/9] object-cover"
            />
            <p className="text-xl font-medium mt-4">Places for rent</p>
          </Link>
          <Link href="/category/sale">
            <Image
              src={sellCategoryImage}
              alt="sale"
              width={980}
              height={640}
              className="rounded-3xl aspect-[16/9] object-cover"
            />
            <p className="text-xl font-medium mt-4">Places for sale</p>
          </Link>
        </div>
      </main>
    </>
  );
}
