import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../lib/sanity";
import { flatCardBlogInterface } from "../../../interfaces";

/* 
This handler handles the post request to do search on blogs.It takes 'searchText' and 'statusTag'.
searchText: is the text which we need to search throughout the blogs.
statusTag: if it is 1, it performs the search and if it is 0, it just sends all the blogs.
*/

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method == "POST") {
    const { searchText, statusTag } = req.body;

    if (parseInt(statusTag)) {
      const query = `*[_type=="blogPost" && title match ['*'+$searchText+'*']]{
            title,
            blogDesc,
            date,
            _id,
          }`;

      const blogs: flatCardBlogInterface[] = await sanityClient.fetch(query, {
        searchText,
      });

      res.send(blogs);
    } else {
      const query = `*[_type=="blogPost"]{
            title,
            blogDesc,
            date,
            _id,
          }`;

      const blogs: flatCardBlogInterface[] = await sanityClient.fetch(query);

      res.send(blogs);
    }
  }
};

export default handler;
