import Link from "next/link";
import { getDate } from "../lib/utilities";

// This flatCard component is to display the details of the blogs on the blog's paginator.
const FlatCard: React.FC<{
  title: string;
  date: string;
  desc: string;
  id: string;
}> = ({ title, date, desc, id }) => {
  return (
    <div className="pb-4 pt-4">
      <h4 className="text-sm text-gray-600">{getDate(date)}</h4>
      <h2 className="text-3xl lg:text-4xl">{title}</h2>
      <p className="text-sm text-gray-500 pt-4">{desc}</p>

      <div className="pt-6 flex justify-center sm:justify-end">
        <Link href={`/blog/${id}`}>
          <a className="text-xl text-white px-6 py-1 rounded-md bg-black">
            Read more
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FlatCard;
