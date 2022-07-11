const Blog = () => {
  return (
    <div className="sm:flex sm:justify-center">
      <div className="divide-y-2 sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
        <div className="mt-12 pb-4 sm:pt-12">
          <h2 className="text-3xl text-center sm:text-4xl md:pb-4">
            Blog title
          </h2>
          <div className="text-sm text-gray-600 flex justify-end">
            <h4>12 Jun, 2022</h4>
          </div>
          <p className="text-gray-500 text-center pt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ipsam
            vitae cupiditate. Dignissimos at recusandae facilis numquam
            architecto, cum laborum ipsam omnis distinctio hic ducimus officia
            laboriosam consequuntur ratione corporis!
          </p>
          <div className="text-sm text-gray-600 flex justify-end mt-2 md:mt-4 lg:mt-6">
            <h3>Author name</h3>
          </div>
        </div>

        <div className="pt-14 text-center pb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
          praesentium omnis fugiat a. Corrupti molestiae, modi maxime, nemo
          neque numquam, similique dignissimos eius consectetur aspernatur earum
          ipsam voluptas velit ipsa. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Cupiditate eos commodi voluptatem ad vitae non
          culpa. Voluptates error nemo molestias officiis, sit maxime earum amet
          in cumque fuga corporis quia.
        </div>
      </div>
    </div>
  );
};

export default Blog;
