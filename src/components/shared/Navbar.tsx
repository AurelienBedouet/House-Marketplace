"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePerson,
} from "react-icons/md";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathMatchRoute = (route: string) => {
    if (route === pathname) {
      return true;
    }
  };

  return (
    <footer className="fixed left-0 bottom-0 right-0 h-[85px] bg-white z-50 flex justify-center items-center">
      <nav className="w-full overflow-y-hidden mx-auto px-4 max-w-7xl">
        <ul className="m-0 p-0 flex justify-evenly items-center">
          <li
            onClick={() => router.push("/")}
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <MdOutlineExplore
              color={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
              size={32}
            />
            <p
              className={`text-sm font-semibold ${
                pathMatchRoute("/") ? "text-[#2c2c2c]" : "text-[#8f8f8f]"
              }`}
            >
              Explore
            </p>
          </li>
          <li
            onClick={() => router.push("/offers")}
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <MdOutlineLocalOffer
              color={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}
              size={32}
            />
            <p
              className={`text-sm font-semibold ${
                pathMatchRoute("/offers") ? "text-[#2c2c2c]" : "text-[#8f8f8f]"
              }`}
            >
              Offers
            </p>
          </li>
          <li
            onClick={() => router.push("/profile")}
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <MdOutlinePerson
              color={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
              size={32}
            />
            <p
              className={`text-sm font-semibold ${
                pathMatchRoute("/profile") ? "text-[#2c2c2c]" : "text-[#8f8f8f]"
              }`}
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
