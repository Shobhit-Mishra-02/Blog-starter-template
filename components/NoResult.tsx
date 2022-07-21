/* eslint-disable @next/next/no-img-element */

// Whenever we do not get blogs from the headless cms so we just display this component.
const NoResult: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-center align-middle items-center flex-col mt-6">
      <img className="max-w-md opacity-75" src="/noResult.svg" alt="img" />
      <h2 className="text-5xl text-gray-400">{text}</h2>
    </div>
  );
};

export default NoResult;
