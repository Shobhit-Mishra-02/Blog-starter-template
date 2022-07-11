const Card = () => {
  return (
    <div className="w-[320px] rounded-md shadow-lg m-2 border">
      <div className="w-full h-[300px] bg-gray-300 rounded-t-md"></div>
      <div className="px-2 pt-4 pb-2">
        <h2 className="text-3xl">Blog title</h2>
        <h4 className="text-sm text-gray-500">12 Jun, 2022</h4>
        <div className="pt-4 flex justify-end items-center">
          <button className="px-5 py-1 rounded-md text-black text-xl border border-black cursor-pointer hover:bg-black hover:text-white">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
