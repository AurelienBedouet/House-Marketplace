import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="bg-white w-full z-10 py-6 mt-12">
      <div className="mx-auto w-full px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-sm font-light">
          {" "}
          Copyright &copy;{footerYear} All rights reserved
        </p>
        <span className="hidden sm:block">-</span>
        <a
          href="https://github.com/AurelienBedouet/property-portal"
          target="_blank"
          rel="noreferrer"
          className="font-semibold flex items-center gap-2 border px-4 py-1 rounded-lg transition duration-400 hover:bg-gray-200"
        >
          <AiFillGithub /> Code
        </a>
      </div>
    </footer>
  );
};

export default Footer;
