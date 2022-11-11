import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Link from "next/link";

export default function SearchBar({ data }) {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? []
      : data.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className="relative flex items-center justify-between bg-white z-20 w-full">
      <div
        className="flex flex-1 justify-center px-1 lg:ml-6 lg:justify-end"
        onClick={() => {
          console.log("Clicked");
        }}
      >
        <div className="w-full max-w-lg lg:max-w-xs inset-y-0 left-0">
          <button className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon
                  className="h-5 w-5 text-gray-700"
                  aria-hidden="true"
                />
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
      </div>

      <div>
        <Link href="/notifications">
          <div>
            <BellIcon
              className="h-8 hover:bg-orange-500 rounded-full p-1 text-gray-500 hover:text-white"
              aria-hidden="true"
            />
            <span className="sr-only">View notifications</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
