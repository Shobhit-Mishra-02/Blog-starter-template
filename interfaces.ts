export interface landingPageInterface {
  mainHeading: string;
  blogIntro: string;
}

export interface blogInterface {
  _id: string;
  author: {
    authorName: string;
  };
  blogDesc: string;
  content: object[];
  date: string;
  title: string;
}
