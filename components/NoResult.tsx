/* eslint-disable @next/next/no-img-element */

const NoResult = () => {
  return (
    <div className="flex justify-center align-middle items-center flex-col mt-6">
      <img className="max-w-md opacity-75" src="/noResult.svg" alt="img" />
      <h2 className="text-5xl text-gray-400">No results</h2>
    </div>
  );
};

export default NoResult;
