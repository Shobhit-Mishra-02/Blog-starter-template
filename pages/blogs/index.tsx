import { BiSearch } from "react-icons/bi";
import FlatCard from "../../components/FlatCard";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { NextPage } from "next";
import { sanityClient } from "../../lib/sanity";

interface blog {
  _id: string;
  blogDesc: string;
  date: string;
  title: string;
}

const Blogs: NextPage<{ blogs: blog[] }> = ({ blogs }) => {
  return (
    <div>
      <div className="mt-20 flex justify-center align-middle items-center">
        <input
          className="border-2 rounded-l-md text-xl px-2 py-1 border-black w-[250px] sm:w-[300px] focus:outline-none"
          type="text"
          placeholder="Search..."
        />
        <button className="px-4 py-2 sm:py-1 rounded-r-md bg-black">
          <BiSearch className="text-white w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div>
        <h2 className="text-3xl text-center mt-10 sm:text-4xl sm:mt-12 md:mt-20 lg:mt-28 xl:mt-36 xl:text-5xl">
          All blogs
        </h2>

        <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:align-middle mb-24">
          <div className="mt-12 divide-y-2 sm:max-w-sm md:max-w-xl lg:max-w-3xl">
            {blogs.map((blog) => (
              <FlatCard
                key={blog._id}
                title={blog.title}
                desc={blog.blogDesc}
                date={blog.date}
                id={blog._id}
              />
            ))}
          </div>

          <div className="flex justify-between align-middle items-center w-full sm:max-w-sm md:max-w-xl lg:max-w-3xl mt-14">
            <button className="text-xl text-black bg-white border border-black hover:bg-black hover:text-white rounded-md px-4 py-1">
              <AiOutlineArrowLeft className="w-6 h-6" />
            </button>
            <button className="text-xl text-black bg-white border border-black hover:bg-black hover:text-white rounded-md px-4 py-1">
              <AiOutlineArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

export const getStaticProps = async () => {
  const queryForBlogs = `*[_type == 'blogPost']{
    _id,
    blogDesc,
    date,
    title,
  }`;

  const blogs: blog[] = await sanityClient.fetch(queryForBlogs);

  return {
    props: { blogs },
  };
};
