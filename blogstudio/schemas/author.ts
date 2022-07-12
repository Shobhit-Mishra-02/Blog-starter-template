export default {
  name: "authorDetails",
  title: "Author Details",
  type: "document",
  fields: [
    {
      name: "authorName",
      title: "Author's name",
      type: "string",
      description: "Here the author suppose to enter his/her name.",
    },
    {
      name: "image",
      title: "Author's image",
      type: "image",
      hotspot: true,
      description: "Add your image here.",
    },
    {
      name: "authorIntro",
      title: "Author's introduction",
      type: "text",
      description:
        "Here you can describe yourself like why you are doing bloging or about you past experience.",
    },
    {
      name: "facebookLink",
      title: "Facebook Url",
      type: "string",
      description:
        "Here you can add facebook url, basically your facebook page or profile so that users can reach out to you. (optional)",
    },
    {
      name: "instaLink",
      title: "Instagram Url",
      type: "string",
      description:
        "Here you can add instagram url, basically your insta page or profile so that users can reach out to you. (optional)",
    },
    {
      name: "gitHubLink",
      title: "Github Url",
      type: "string",
      description:
        "Here you can add github url, basically your github profile so the users can reach out to you. (optional)",
    },
    {
      name: "twitterLink",
      title: "Twitter Url",
      type: "string",
      description:
        "Here you can add twitter url, basically your twitter profile so the users can reach out to you. (optional)",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description:
        "Here you can add your email address, so that viewers can send you mail, if they want to contact you.",
    },
    {
      name: "contactStatus",
      title: "Contact status",
      type: "text",
      description:
        "Here you can add some content which tells other that what are you doing right now or will you be available on the mail, or any sort of specific thing which you want from that person who is trying to contact you.",
    },
  ],
};
