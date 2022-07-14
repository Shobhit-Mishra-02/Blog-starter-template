/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { getDate } from "../lib/utilities";

const Card: React.FC<{
  date: string;
  title: string;
  id: string;
  image: string;
}> = ({ date, title, id, image }) => {
  return (
    <div className="w-[320px] rounded-md shadow-lg m-2 border">
      <img src={image} className="w-full h-[300px] rounded-t-md" />
      <div className="px-2 pt-4 pb-2">
        <h2 className="text-3xl overflow-hidden h-10">{title}</h2>
        <h4 className="text-sm text-gray-500">{getDate(date)}</h4>
        <div className="pt-4 flex justify-end items-center">
          <Link href={`/blog/${id}`}>
            <a className="px-5 py-1 rounded-md text-black text-xl border border-black cursor-pointer hover:bg-black hover:text-white">
              Read more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
