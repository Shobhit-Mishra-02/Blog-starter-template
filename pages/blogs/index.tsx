import { GetServerSideProps, NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import FlatCard from "../../components/FlatCard";
import NoResult from "../../components/NoResult";
import Search from "../../components/Search";
import { flatCardBlogInterface } from "../../interfaces";
import { sanityClient } from "../../lib/sanity";
import { pageIndex } from "../../lib/utilities";

/*
Blogs page: Here the view can see all the blogs and also use the search panel to do search.
*/

// this function returns those blog posts which are not in drated mode.
const filter = (blogs: flatCardBlogInterface[]) => {
  let res: flatCardBlogInterface[] = [];

  blogs.forEach((blog) => {
    if (!blog._id.startsWith("drafts.")) {
      res.push(blog);
    }
  });

  return res;
};

const Page: NextPage<{ blogs: flatCardBlogInterface[] }> = ({ blogs }) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const noOfBlogsToDisplay: number = 3; // This denotes the no. of pages to display on each slide.
  const [searchDisplay, setSearchDisplay] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState<{
    next: boolean;
    prev: boolean;
  }>({
    next: true,
    prev: false,
  });

  // This function handles the paginator buttons.
  const paginator = (blogSetNumber: number) => {
    let totalBlogs = blogs.length;
    let noOfPages = 0;

    if (totalBlogs % blogSetNumber == 0) noOfPages = totalBlogs / blogSetNumber;
    else noOfPages = totalBlogs / blogSetNumber + 1;

    noOfPages = Math.trunc(noOfPages);

    if (noOfPages == 1) {
      setButtonStatus({
        ...buttonStatus,
        next: false,
        prev: false,
      });
    } else if (pageNo == 1) {
      setButtonStatus({
        ...buttonStatus,
        next: true,
        prev: false,
      });
    } else if (pageNo == noOfPages) {
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

    index = pageIndex(blogs.length, pageNo, 3);
  };

  // This function handles to go to the next page index.
  const goNextPage = (blogSetNumber: number) => {
    let noOfPages = 0;
    let totalBlogs = blogs.length;

    if (totalBlogs % blogSetNumber == 0) noOfPages = totalBlogs / blogSetNumber;
    else noOfPages = totalBlogs / blogSetNumber + 1;

    noOfPages = Math.round(noOfPages);

    if (pageNo < noOfPages) {
      setPageNo(pageNo + 1);
    }
  };

  // This function handles to go back to prev page index.
  const goPrevPage = (blogSetNumber: number) => {
    let noOfPages = 0;
    let totalBlogs = blogs.length;

    noOfPages = Math.round(noOfPages);

    if (totalBlogs % blogSetNumber == 0) noOfPages = totalBlogs / blogSetNumber;
    else noOfPages = totalBlogs / blogSetNumber + 1;

    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  let index: number[] = pageIndex(blogs.length, pageNo, 3);

  useEffect(() => {
    paginator(noOfBlogsToDisplay);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <div>
      {/* search section  */}
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

      {/* blogs section  */}
      <div>
        <h2 className="text-3xl text-center mt-10 sm:text-4xl sm:mt-12 md:mt-20 lg:mt-28 xl:mt-36 xl:text-5xl">
          All blogs
        </h2>

        {blogs?.length ? (
          <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:align-middle mb-24">
            <div className="mt-12 divide-y-2 sm:max-w-sm md:max-w-xl lg:max-w-3xl">
              {index?.length &&
                index.map((i) => (
                  <FlatCard
                    title={blogs[i].title}
                    key={blogs[i]._id}
                    desc={blogs[i].blogDesc}
                    id={blogs[i]._id}
                    date={blogs[i].date}
                  />
                ))}
            </div>

            <div
              className={`flex justify-between align-middle items-center w-full sm:max-w-sm md:max-w-xl lg:max-w-3xl mt-14`}
            >
              {buttonStatus.prev ? (
                <div>
                  <button
                    className="text-xl text-black bg-white border border-black hover:bg-black hover:text-white rounded-md px-4 py-1"
                    onClick={() => goPrevPage(noOfBlogsToDisplay)}
                  >
                    <AiOutlineArrowLeft className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="w-[150px] bg-white rounded-md px-4 py-1 h-[20px]"></div>
              )}

              {buttonStatus.next && (
                <div>
                  <button
                    className="text-xl text-black bg-white border border-black hover:bg-black hover:text-white rounded-md px-4 py-1"
                    onClick={() => goNextPage(noOfBlogsToDisplay)}
                  >
                    <AiOutlineArrowRight className="w-6 h-6" />
                  </button>
                </div>
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

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryForBlogs = `*[_type=="blogPost"]{
    _id,
    title,
    blogDesc,
    date,
  }
  `;

  const blogsData: flatCardBlogInterface[] = await sanityClient.fetch(
    queryForBlogs
  );

  const blogs = filter(blogsData);

  return {
    props: { blogs },
  };
};
