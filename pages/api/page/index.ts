import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../lib/sanity";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method == "POST") {
    let { low, high } = req.body;
    low = +low;
    high = +high;
    const query = `*[_type=="blogPost"]{
        title,
        blogDesc,
        date,
      }[$low...$high]`;
    const blogs = await sanityClient.fetch(query, { low, high });

    res.send(blogs);
  }
};

export default handler;
