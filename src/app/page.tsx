import Categories from "@/components/pages/home/Categories";
import LatestListings from "@/components/pages/home/LatestListings";

export default function Home() {
  return (
    <main className="mt-32">
      <LatestListings />

      <Categories />
    </main>
  );
}
