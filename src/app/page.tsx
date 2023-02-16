import Categories from "@/components/pages/home/Categories";
import LatestOffers from "@/components/pages/home/LatestOffers";

export default async function Home() {
  return (
    <div className="px-4 max-w-7xl mx-auto">
      {/* <header></header> */}
      <main>
        <LatestOffers />

        <Categories />
      </main>
    </div>
  );
}
