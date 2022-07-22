import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  //   const { method } = req;

  res.clearPreviewData();
  const path = req.query;

  if (path) {
    res.redirect(path.redirect as string);
  } else {
    res.status(500).json({
      message: "add the redirect params",
    });
  }
};

export default handler;
