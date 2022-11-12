import { SearchIcon, BellIcon } from "@heroicons/react/outline";

export const SearchButton = ({ onClick }) => {
  return (
    <div className="max-w-lg lg:max-w-xs inset-y-0 left-0" onClick={onClick}>
      <button className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
          </div>
          <span
            id="search"
            name="search"
            className="block w-full left-0 rounded-md border border-transparent bg-gray-100 py-2 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-700 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
            type="search"
          >
            Search (⌘K)
          </span>
        </div>
      </button>
    </div>
  );
};
