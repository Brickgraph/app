import { PlusCircleIcon } from "@heroicons/react/outline";

export const EmptyCard = ({ action, text = "Add Element" }) => {
  return (
    <>
      <button
        onClick={action}
        className="p-4 border-dotted border-2 border-orange-400 bg-gray-50 hover:bg-gray-100 hover:shadow-xl 
        transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105
        flex flex-col items-center justify-center text-gray-500 hover:text-gray-900"
      >
        <div className="p-4 flex flex-col items-center justify-center text-center">
          <PlusCircleIcon
            className="h-6 w-6 md:h-10 md:w-10 md:mb-3"
            aria-hidden="true"
          />
          <h1 className="text-sm md:text-md lg:text-lg">{text}</h1>
        </div>
      </button>
    </>
  );
};
