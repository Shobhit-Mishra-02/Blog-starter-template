const FlatCard = () => {
  return (
    <div className="pb-4 pt-4">
      <h4 className="text-sm text-gray-600">12 Jan, 2022</h4>
      <h2 className="text-3xl lg:text-4xl">Blogs title</h2>
      <p className="text-sm text-gray-500 pt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veniam
        error culpa ipsa, porro voluptatem explicabo nobis placeat sit maxime
        magnam praesentium modi. Sunt exercitationem optio magni eos nulla
        dolorem?
      </p>

      <div className="pt-6 flex justify-center sm:justify-end">
        <button className="text-xl text-white px-6 py-1 rounded-md bg-black">
          Read more
        </button>
      </div>
    </div>
  );
};

export default FlatCard;
