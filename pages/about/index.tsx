/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { FiFacebook, FiInstagram, FiGithub, FiTwitter } from "react-icons/fi";
import { sanityClient, urlFor } from "../../lib/sanity";
import { authorInterface } from "../../interfaces";
import NoResult from "../../components/NoResult";
import { usePreview } from "../../lib/sanity";

/*
About page: where author can put some intro text, so that the world get to know about that
author and even the author can add some social media links too.
*/

const queryForAuthor = `*[_type == 'authorDetails']{
  authorIntro,
  authorName,
  contactStatus,
  email,
  facebookLink,
  gitHubLink,
  image,
  instaLink,
  twitterLink
}[0]`;

const About: NextPage<{ authorDetails: authorInterface }> = ({
  authorDetails,
}) => {
  if (authorDetails) {
    return (
      <div className="w-full">
        {/* intro of the author  */}

        <div className="pt-20 px-1 sm:flex sm:justify-center sm:align-middle sm:items-center sm:space-x-2 md:justify-evenly lg:justify-center lg:space-x-12 md:pt-48 ">
          <img
            src={urlFor(authorDetails.image).url()}
            className="w-[300px] h-[300px] mx-auto sm:m-0 sm:max-w-xs rounded-md bg-gray-300 lg:max-w-md xl:max-w-xl"
          ></img>

          <div className="sm:max-w-sm lg:max-w-md xl:max-w-xl">
            <h2 className="text-3xl text-center pt-6 pb-4 lg:text-4xl sm:text-left">
              {authorDetails.authorName}
            </h2>
            <p className="text-center text-gray-500 sm:text-left">
              {authorDetails.authorIntro}
            </p>
            <div className="flex justify-center align-middle items-center space-x-4 md:space-x-6 pt-8 sm:justify-start">
              {authorDetails.facebookLink && (
                <a href={authorDetails.facebookLink}>
                  <FiFacebook className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-gray-500 cursor-pointer" />
                </a>
              )}

              {authorDetails.instaLink && (
                <a href={authorDetails.instaLink}>
                  <FiInstagram className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-gray-500 cursor-pointer" />
                </a>
              )}

              {authorDetails.gitHubLink && (
                <a href={authorDetails.gitHubLink}>
                  <FiGithub className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-gray-500 cursor-pointer" />
                </a>
              )}
              {authorDetails.twitterLink && (
                <a href={authorDetails.twitterLink}>
                  <FiTwitter className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-gray-500 cursor-pointer" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* contact to author  */}
        <div className="px-2 sm:max-w-sm sm:mx-auto sm:pt-12 md:max-w-xl lg:max-w-4xl md:pt-24">
          <h2 className="text-3xl text-center pt-12 pb-2 md:text-4xl md:pt-24 md:text-left">
            Get in touch
          </h2>
          <p className="text-center text-gray-500 md:text-left">
            {authorDetails.contactStatus}
          </p>
          <div className="pt-8 flex justify-center pb-12 md:justify-start">
            <a
              href={`mailto:${authorDetails.email}`}
              className="px-5 py-1 rounded-md text-black text-xl border border-black cursor-pointer hover:bg-black hover:text-white"
            >
              Say hi
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NoResult text="add author details" />
      </div>
    );
  }
};

export default About;

export const getServerSideProps = async () => {
  const authorDetails: authorInterface = await sanityClient.fetch(
    queryForAuthor
  );

  return {
    props: { authorDetails },
  };
};
