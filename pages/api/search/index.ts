import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../lib/sanity";

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

      const blogs = await sanityClient.fetch(query, { searchText });

      res.send(blogs);
    } else {
      const query = `*[_type=="blogPost"]{
            title,
            blogDesc,
            date,
            _id,
          }`;

      const blogs = await sanityClient.fetch(query);

      res.send(blogs);
    }

    res.send({ searchText, statusTag });
  }

  res.send({
    messag: "worong req",
  });
};

export default handler;
