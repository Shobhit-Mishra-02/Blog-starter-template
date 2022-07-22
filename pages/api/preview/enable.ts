import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setPreviewData({});

  const path = req.query;

  if (path) {
    res.redirect(path.redirect as string);
  } else {
    res.status(500).json({
      message: "add redirect",
    });
  }
};

export default handler;
