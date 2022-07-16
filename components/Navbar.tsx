import Link from "next/link";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";

// This is our navbar and it is a responsive navbar.
const Navbar: React.FC = () => {
  const [isOpen, setMenuStatus] = useState<boolean>(false);
  return (
    <nav>
      {/* simple navbar */}

      <div className="hidden sm:block">
        <div className="flex justify-between align-middle items-center px-4 py-2 lg:pt-6 xl:px-16 md:px-6">
          <Link href={"/"}>
            <a className="text-2xl font-semibold lg:text-3xl xl:font-extrabold cursor-pointer hover:text-gray-800 md:font-bold">
              The Blog.
            </a>
          </Link>

          <div className="list-none text flex justify-center align-middle items-center space-x-6 lg:space-x-8 xl:space-x-12 xl:text-xl">
            <Link href={"/blogs/1"}>
              <a className="cursor-pointer hover:text-gray-600">Blogs</a>
            </Link>
            <Link href={"/about"}>
              <a className="cursor-pointer hover:text-gray-600">About me</a>
            </Link>
          </div>
        </div>
      </div>

      {/* slider navbar */}
      <div className="relative z-20 sm:hidden">
        <div className="flex justify-between align-middle items-center px-2 pt-1 py-2 shadow-lg bg-white">
          <h2 className="text-2xl font-semibold">
            <Link href={"/"}>
              <a>The Blog.</a>
            </Link>
          </h2>

          <span>
            {isOpen ? (
              <FiX className="w-8 h-8" onClick={() => setMenuStatus(false)} />
            ) : (
              <HiMenuAlt3
                className="w-8 h-8"
                onClick={() => setMenuStatus(true)}
              />
            )}
          </span>
        </div>

        <div
          className={`absolute list-none text-xl space-y-2 pt-1 divide-y-2 divide-gray-300 text-gray-700 shadow-md pb-1 ${
            isOpen ? "-translate-y-0 " : "-translate-y-full"
          } w-full bg-white -z-10 transition-all ease-in-out duration-300`}
        >
          <li className="px-2">
            <Link href={"/"}>
              <a>Home</a>
            </Link>
          </li>
          <li className="px-2">
            <Link href={"/blogs/1"}>
              <a>Blogs</a>
            </Link>
          </li>
          <li className="px-2">
            <Link href={"/about"}>
              <a>About me</a>
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
