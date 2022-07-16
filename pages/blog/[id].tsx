/* eslint-disable @next/next/no-img-element */
import { PortableText, PortableTextBlockComponent } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { sanityClient, urlFor } from "../../lib/sanity";
import { getDate } from "../../lib/utilities";
import { blogPageInterface } from "../../interfaces";

/*
Blog: This the place where your blog post will be displayed.
*/

const Blog: NextPage<{ blog: blogPageInterface }> = ({ blog }) => {
  const sampleImageComp: PortableTextBlockComponent = ({ value, isInline }) => {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img src={urlFor(value).url()} />
    );
  };

  const components = {
    types: {
      image: sampleImageComp,
    },
  };

  return (
    <div className="sm:flex sm:justify-center">
      <div className="divide-y-2 sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <div className="mt-12 px-2 pb-4 sm:pt-12">
          <h2 className="text-3xl text-center sm:text-4xl md:pb-4">
            {blog?.title}
          </h2>
          <div className="text-sm pt-4 text-gray-600 flex justify-end">
            <h4>{getDate(blog?.date)}</h4>
          </div>
          <p className="text-gray-500 text-center pt-4 text-sm">
            {blog?.blogDesc}
          </p>
          <div className="text-sm text-gray-600 flex justify-end mt-2 md:mt-4 lg:mt-6">
            <h3>{blog?.author.authorName}</h3>
          </div>
        </div>

        <div className="pt-14 pb-4 prose max-w-none prose-li:text-left text-left prose-img:w-[250px] md:prose-img:w-[400px] prose-img:aspect-square prose-img:mx-auto px-2">
          <PortableText value={blog?.content as any} components={components} />
        </div>
      </div>
    </div>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const queryForBlogID = `*[_type == 'blogPost']{
    _id
  }`;

  const IDs: { _id: string }[] = await sanityClient.fetch(queryForBlogID);

  const paths = IDs.map((id) => ({
    params: { id: id._id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  interface urlQuery extends ParsedUrlQuery {
    id: string;
  }

  const { id } = params as urlQuery;

  const queryForBlog = `*[_type == 'blogPost' && _id ==$id ]{
    author->{authorName},
  blogDesc,
  content,
  date,
  title,
  }[0]`;
  const blog: blogPageInterface = await sanityClient.fetch(queryForBlog, {
    id,
  });

  return {
    props: { blog },
  };
};
