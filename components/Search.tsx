import { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import FlatCard from "./FlatCard";
import { useState, useEffect } from "react";
import { flatCardBlogInterface } from "../interfaces";
import NoResult from "./NoResult";

// This is our search panel component
const Search: React.FC<{
  func: Dispatch<SetStateAction<boolean>>;
}> = ({ func }) => {
  const [blogs, setBlogs] = useState([] as flatCardBlogInterface[]);

  const [searchText, setSearchText] = useState<string>("");

  const requestForBlogs = async () => {
    const req = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchText, statusTag: 0 }),
    });

    const json: flatCardBlogInterface[] = await req.json();

    setBlogs(json);
  };

  const requestToSearch = async () => {
    if (searchText.length) {
      const req = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchText, statusTag: 1 }),
      });

      const json: flatCardBlogInterface[] = await req.json();

      setBlogs(json);
    }
  };

  useEffect(() => {
    if (searchText.length) {
      requestToSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    requestForBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed top-0 bottom-0 w-full flex justify-center align-middle items-center z-20">
      <div className="w-full h-full -z-10 bg-black absolute opacity-30"></div>

      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white px-2 py-1 rounded-md shadow-md border-2 ">
        <div className="w-full flex justify-end">
          <FiX className="w-8 h-8 cursor-pointer" onClick={() => func(false)} />
        </div>
        <div className="pt-6 pb-8">
          <input
            type="text"
            className="w-full  md:px-4 px-2 py-2 border border-gray-600 text-xl rounded-md focus:outline-none focus:border focus:border-black"
            placeholder="search.."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>

        <div className="h-[400px] lg:h-[500px] overflow-auto">
          {blogs?.length ? (
            blogs?.map((blog) => (
              <FlatCard
                key={blog._id}
                title={blog.title}
                date={blog.date}
                desc={blog.blogDesc}
                id={blog._id}
              />
            ))
          ) : (
            <NoResult text="Not found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
