/* eslint-disable @next/next/no-img-element */

const NotFound = () => {
  return (
    <div className="flex justify-center align-middle items-center flex-col mt-32">
      <img className="max-w-lg opacity-75" src="/404.svg" alt="img" />
      <div>
        <h2 className="text-5xl text-center text-gray-400">
          Page not found !!
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
