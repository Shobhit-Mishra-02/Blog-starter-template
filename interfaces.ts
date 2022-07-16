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
  blogImage: object;
}

export interface flatCardBlogInterface {
  _id: string;
  blogDesc: string;
  date: string;
  title: string;
}

export interface blogPageInterface {
  author: {
    authorName: string;
  };
  blogDesc: string;
  content: object[];
  date: string;
  title: string;
}

export interface authorInterface {
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
