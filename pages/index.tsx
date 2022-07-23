/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card";
import Link from "next/link";
import NoResult from "../components/NoResult";
import { sanityClient, urlFor } from "../lib/sanity";
import { landingPageInterface, blogInterface } from "../interfaces";
import { getDate } from "../lib/utilities";

/* 
Home page: this is the landing page of your blog.
*/

const filter = (blogs: blogInterface[]) => {
  let res: blogInterface[] = [];

  blogs.forEach((blog) => {
    if (!blog._id.startsWith("drafts.")) {
      res.push(blog);
    }
  });

  return res;
};

const Home: NextPage<{
  content: landingPageInterface;
  blogs: blogInterface[];
}> = ({ content, blogs }) => {
  return (
    <div>
      <Head>
        <title>My blog</title>
        <meta
          name="description"
          content="This is blog starter templete, enjoy blogging..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* main header  */}
        <div className="pt-12 flex flex-wrap flex-row-reverse md:justify-evenly md:align-middle md:items-center md:px-6">
          <img
            className="md:max-w-sm lg:max-w-md xl:max-w-xl"
            src="/headerImg2.svg"
            alt="img"
          />
          <div className="pt-6 md:max-w-sm lg:max-w-md xl:max-w-xl">
            <div>
              <h3 className="text-5xl font-bold py-2 text-center md:text-left lg:text-6xl xl:text-7xl">
                {content.mainHeading}
              </h3>
              <p className="text-gray-500 text-center pt-6 md:text-left lg:text-sm">
                {content.blogIntro}
              </p>
            </div>

            <div className="flex justify-center align-middle items-center pt-6 pb-2 md:justify-start lg:pt-12">
              <Link href={"/blogs"}>
                <a className="text-xl text-white px-8 py-2 rounded-md bg-black">
                  Blogs
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* latest blog post in the big card  */}
        <div className="pt-44">
          <h2 className="text-5xl text-center mb-4">Latest blog post</h2>
          {/* big card starts  */}
          {blogs.length ? (
            <div className="flex justify-center align-middle items-center lg:mt-20 lg:mb-36 mt-12">
              <div className="px-2 max-w-sm md:flex md:max-w-[700px] lg:max-w-[1200px]">
                <img
                  src={urlFor(blogs[0].blogImage).url()}
                  className="w-full aspect-square bg-gray-300 rounded-md md:w-[300px] md:translate-x-20 lg:w-[350px] xl:w-[400px]"
                ></img>
                <div className="pt-2 px-1 md:max-w-sm md:rounded-md md:shadow-xl md:shadow-gray-300 md:translate-y-20 md:-translate-x-20 md:border bg-white md:h-fit md:py-2 md:px-2 lg:translate-y-36 xl:translate-y-44 lg:py-4 lg:px-4 lg:max-w-lg">
                  <h4 className="text-sm text-gray-600">
                    {getDate(blogs[0].date)}
                  </h4>
                  <h2 className="text-3xl pb-4">{blogs[0].title}</h2>
                  <p className="text-sm text-gray-500">{blogs[0].blogDesc}</p>

                  <div className="pt-6">
                    <Link href={`/blog/${blogs[0]._id}`}>
                      <a className="px-6 py-2 text-white bg-black rounded-md text-xl">
                        Read more
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <NoResult text="add blogs" />
            </div>
          )}

          {/* big card end  */}
        </div>

        {/* to some previout blog posts  */}
        <div className="mt-44 mb-16">
          <h2 className="text-center text-5xl pb-6">Other blogs</h2>
          <div className="flex flex-wrap justify-center align-middle items-center pt-6 pb-8 lg:px-12 xl:px-24">
            {blogs.length ? (
              blogs.map((blog) => (
                <Card
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  date={blog.date}
                  image={urlFor(blog.blogImage).url()}
                />
              ))
            ) : (
              <div>
                <NoResult text="add blogs" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const queryForMainContent = `*[_type == 'headerContent']{
    mainHeading,
    blogIntro,
  }[0]`;

  const queryForBlogs = `*[_type == 'blogPost']{
    _id,
    author->{
  authorName
  },
    blogDesc,
    content,
    date,
    title,
    blogImage,
  }[0...3]`;

  const content: landingPageInterface = await sanityClient.fetch(
    queryForMainContent
  );

  const blogsData: blogInterface[] = await sanityClient.fetch(queryForBlogs);
  const blogs = filter(blogsData);

  return {
    props: { content, blogs },
  };
};
