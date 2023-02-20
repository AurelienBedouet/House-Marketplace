import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="w-full h-[120px] flex flex-col">
      <ul className="h-[60px] flex justify-center items-center gap-4 border-b bg-slate-800 text-yellow-500 font-semibold">
        <li>
          <Link href="/category/rent" className="hover:underline">
            For Rent
          </Link>
        </li>
        <li>
          <Link href="/category/sale" className="hover:underline">
            For Sale
          </Link>
        </li>
        <li>
          <Link href="/offers" className="hover:underline">
            Offers
          </Link>
        </li>
      </ul>

      <div className="h-[60px] bg-gray-200 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-sm font-light">
          {" "}
          Copyright &copy;{footerYear} All rights reserved
        </p>
        <span className="hidden sm:block">-</span>
        <a
          href="https://github.com/AurelienBedouet/property-portal"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex font-semibold items-center gap-2 border border-gray-900 px-4 py-1 rounded-lg transition duration-400 hover:bg-white"
        >
          <AiFillGithub /> Code
        </a>
      </div>
    </footer>
  );
};

export default Footer;
