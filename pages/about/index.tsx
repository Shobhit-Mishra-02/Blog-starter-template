import { NextPage } from "next";
import { FiFacebook, FiInstagram, FiGithub, FiTwitter } from "react-icons/fi";
import { sanityClient } from "../../lib/sanity";

interface authorInterface {
  authorIntro: string;
  authorName: string;
  contactStatus: string;
  email: string;
  facebookLink: string | null;
  gitHubLink: string | null;
  image: object;
  instaLink: string | null;
  twitterLink: string | null;
}

const About: NextPage<{ authorDetails: authorInterface }> = ({
  authorDetails,
}) => {
  return (
    <div className="w-full">
      {/* intro of the author  */}

      <div className="pt-20 px-1 sm:flex sm:justify-center sm:align-middle sm:items-center sm:space-x-2 md:justify-evenly lg:justify-center lg:space-x-12 md:pt-48 ">
        <div className="w-[300px] h-[300px] mx-auto sm:m-0 sm:max-w-xs rounded-md bg-gray-300 lg:max-w-md xl:max-w-xl"></div>

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

            {/* <FiInstagram className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-gray-500 cursor-pointer" />
            <FiTwitter className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-gray-500 cursor-pointer" /> */}
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
};

export default About;

export const getStaticProps = async () => {
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

  const authorDetails: authorInterface = await sanityClient.fetch(
    queryForAuthor
  );

  return {
    props: { authorDetails },
  };
};
