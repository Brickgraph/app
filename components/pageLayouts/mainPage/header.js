import { FilterIcon, PlusIcon } from "@heroicons/react/outline";
import { NewNodeDropdown } from "../createPage/newNodeDropdown";

export const MainPageHeader = ({ title, filterButtonAction = null }) => {
  return (
    <>
      <div className="relative pb-5 sm:pb-0">
        <div className="md:flex md:items-center md:justify-between">
          <div className="pt-4 pb-2">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
          </div>
          <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0 z-20">
            <NewNodeDropdown>
              <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                <PlusIcon className="h-5 w-5" />
                <span className="pl-2 hidden md:flex">New</span>
              </button>
            </NewNodeDropdown>
            <button
              onClick={filterButtonAction}
              type="button"
              className="ml-3 inline-flex items-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <FilterIcon className="h-5 w-5" />
              <span className="pl-2 hidden md:flex">Filters</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
