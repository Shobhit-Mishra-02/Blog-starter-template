export default {
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Blog title",
      type: "string",
      description: "Here you need to enter the title of the blog post.",
    },
    {
      name: "date",
      title: "Date of blog post",
      type: "date",
      description: "Enter the date on which the blog post is uploaded.",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "authorDetails" }],
      description: "Select the author.",
    },
    {
      name: "blogDesc",
      title: "Blog description",
      type: "text",
      description: "Here you add some text which describes the blog post.",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      description:
        "This is place where you can add your blog, now it's all upone you what you want to add, add image, text, etc. ",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alternative text",
              description: `Some of your visitors cannot see images, 
            be they blind, color-blind, low-sighted; 
            alternative text is of great help for those 
            people that can rely on it to have a good idea of 
            what\'s on your page.`,
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
    },
  ],
};
