/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card";
import Link from "next/link";
import NoResult from "../components/NoResult";

const Home: NextPage = () => {
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
            <h3 className="text-5xl font-bold py-2 text-center md:text-left lg:text-6xl xl:text-7xl">
              Welcome to my blogs!!
            </h3>
            <p className="text-gray-500 text-center pt-6 md:text-left lg:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at
              reprehenderit suscipit aperiam atque. Dolores, magni consequatur
              qui repellendus totam, ullam eligendi ratione harum placeat fugit,
              tempora rem pariatur aliquam. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Tempora ullam nam quod nisi cumque
              sequi voluptas quas nobis consequuntur, facere
            </p>

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
          <div className="flex justify-center align-middle items-center lg:mt-20 lg:mb-36 mt-12">
            <div className="px-2 max-w-sm md:flex md:max-w-[700px] lg:max-w-[1200px]">
              <div className="w-full aspect-square bg-gray-300 rounded-md md:w-[300px] md:translate-x-20 lg:w-[350px] xl:w-[400px]"></div>
              <div className="pt-2 px-1 md:max-w-sm md:rounded-md md:shadow-xl md:shadow-gray-300 md:translate-y-20 md:-translate-x-20 md:border bg-white md:h-fit md:py-2 md:px-2 lg:translate-y-36 xl:translate-y-44 lg:py-4 lg:px-4 lg:max-w-lg">
                <h4 className="text-sm text-gray-600">12 Jun, 2022</h4>
                <h2 className="text-3xl pb-4">Blog title</h2>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Pariatur, voluptates numquam? Laborum sed quibusdam
                  perferendis ab laboriosam enim saepe praesentium odio id ex
                  sequi inventore recusandae eum voluptatibus, aperiam eaque.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque provident velit consequuntur repudiandae
                </p>

                <div className="pt-6">
                  <Link href={"/blog/12"}>
                    <a className="px-6 py-2 text-white bg-black rounded-md text-xl">
                      Read more
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* to some previout blog posts  */}
        <div className="mt-44 mb-16">
          <h2 className="text-center text-5xl pb-6">Other blogs</h2>
          <div className="flex flex-wrap justify-center align-middle items-center pt-6 pb-8 lg:px-12 xl:px-24">
            <Card />
            <Card />
            <Card />
          </div>
          {/* <div>
          <NoResult />
        </div> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
