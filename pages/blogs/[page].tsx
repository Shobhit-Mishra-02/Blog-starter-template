import { BiSearch } from "react-icons/bi";
import FlatCard from "../../components/FlatCard";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { sanityClient } from "../../lib/sanity";
import { useState, useEffect } from "react";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import Link from "next/link";
import Search from "../../components/Search";
import NoResult from "../../components/NoResult";
import { flatCardBlogInterface } from "../../interfaces";

/*
Blogs paginator: So here I have created a paginator for the blogs and also added a search panel too.
*/

const Blogs: NextPage<{
  blogs: flatCardBlogInterface[];
  limit: number;
  noOfBlogs: number;
  preview: boolean;
}> = ({ blogs, limit, noOfBlogs, preview }) => {
  const router = useRouter();

  const [buttonStatus, setButtonStatus] = useState({
    next: true,
    prev: false,
  });

  const [searchDisplay, setSearchDisplay] = useState(false);

  const paginatorDisplay = () => {
    const pos = parseInt(router.query.page as string);

    let lastPage: number;
    if (noOfBlogs % limit == 0) lastPage = noOfBlogs / limit;
    else lastPage = noOfBlogs / limit + 1;

    lastPage = parseInt(lastPage.toString());

    if (pos == 1 && lastPage == 1) {
      setButtonStatus({
        ...buttonStatus,
        next: false,
        prev: false,
      });
    } else if (pos == 1) {
      setButtonStatus({
        ...buttonStatus,
        next: true,
        prev: false,
      });
    } else if (pos == lastPage) {
      setButtonStatus({
        ...buttonStatus,
        next: false,
        prev: true,
      });
    } else {
      setButtonStatus({
        ...buttonStatus,
        next: true,
        prev: true,
      });
    }
  };

  useEffect(() => {
    paginatorDisplay();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div>
      <div className="mt-20 flex justify-center align-middle items-center">
        <input
          className="border-2 rounded-l-md text-xl px-2 py-1 border-black w-[250px] sm:w-[300px] focus:outline-none"
          type="text"
          placeholder="Search..."
          readOnly
          onClick={() => setSearchDisplay(true)}
        />
        <button className="px-4 py-2 sm:py-1 rounded-r-md bg-black">
          <BiSearch className="text-white w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        {searchDisplay && <Search func={setSearchDisplay} />}
      </div>

      <div>
        <h2 className="text-3xl text-center mt-10 sm:text-4xl sm:mt-12 md:mt-20 lg:mt-28 xl:mt-36 xl:text-5xl">
          All blogs
        </h2>
        {blogs?.length ? (
          <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:align-middle mb-24">
            <div className="mt-12 divide-y-2 sm:max-w-sm md:max-w-xl lg:max-w-3xl">
              {blogs?.map((blog) => (
                <FlatCard
                  key={blog._id}
                  title={blog.title}
                  desc={blog.blogDesc}
                  date={blog.date}
                  id={blog._id}
                />
              ))}
            </div>

            <div
              className={`flex justify-between align-middle items-center w-full sm:max-w-sm md:max-w-xl lg:max-w-3xl mt-14`}
            >
              {buttonStatus.prev ? (
                <Link
                  href={`/blogs/${parseInt(router.query.page as string) - 1}`}
                >
                  <a className="text-xl text-black bg-white border border-black hover:bg-black hover:text-white rounded-md px-4 py-1">
                    <AiOutlineArrowLeft className="w-6 h-6" />
                  </a>
                </Link>
              ) : (
                <div className="w-[150px] bg-white rounded-md px-4 py-1 h-[20px]"></div>
              )}

              {buttonStatus.next && (
                <Link
                  href={`/blogs/${parseInt(router.query.page as string) + 1}`}
                >
                  <a className="text-xl text-black bg-white border border-black hover:bg-black hover:text-white rounded-md px-4 py-1">
                    <AiOutlineArrowRight className="w-6 h-6" />
                  </a>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div>
            <NoResult text="add some blogs" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == 'blogPost']{
    _id,
    blogDesc,
    date,
    title,
  }`;
  const blogs: flatCardBlogInterface[] = await sanityClient.fetch(query);

  let iter;
  let n = 3;

  if (blogs.length % n == 0) iter = blogs.length / n;
  else iter = blogs.length / n + 1;
  let paths = [];

  for (let i = 1; i <= iter; i++)
    paths.push({ params: { page: i.toString() } });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  interface urlQuery extends ParsedUrlQuery {
    page: string;
  }

  let { page } = params as urlQuery;

  const lower = parseInt(page) * 3 - 3;
  const higher = parseInt(page) * 3;

  const queryForBlogs = `*[_type=="blogPost"]{
    _id,
    title,
    blogDesc,
    date,
  }[$lower...$higher]`;

  const queryForAllBlogs = `*[_type=="blogPost"]{
    _id,
    title,
    blogDesc,
    date,
  }`;

  const blogs: flatCardBlogInterface[] = await sanityClient.fetch(
    queryForBlogs,
    {
      lower,
      higher,
    }
  );

  const allBlogs: flatCardBlogInterface[] = await sanityClient.fetch(
    queryForAllBlogs
  );

  return {
    props: { blogs, noOfBlogs: allBlogs.length, limit: 3, preview },
  };
};
