import { SearchIcon, BellIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";

export default function SearchBar({ data }) {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? []
      : data.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className="flex flex-1 justify-between bg-white z-20">
      <div className="flex flex-1">
        <form className="flex w-full md:ml-0" action="#" method="GET">
          <label htmlFor="mobile-search-field" className="sr-only">
            Search
          </label>
          <label htmlFor="desktop-search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <Combobox onChange={(data) => (window.location = "/")}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <SearchIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <Combobox.Input
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:ring-0 text-sm sm:text-lg"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              {filteredItems.length > 0 && (
                <Combobox.Options
                  static
                  className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-md text-gray-800"
                >
                  {filteredItems.map((item) => (
                    <Combobox.Option
                      key={item.id}
                      value={item.label}
                      className={({ active }) =>
                        classNames(
                          "cursor-default select-none px-4 py-2",
                          active && "bg-orange-400 text-white"
                        )
                      }
                    >
                      {item.label}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}

              {query !== "" && filteredItems.length === 0 && (
                <p className="p-4 text-sm text-gray-500">No results found.</p>
              )}
            </Combobox>
          </div>
        </form>
      </div>
      <div className="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          className="rounded-full bg-white p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">View notifications</span>
        </button>
      </div>
    </div>
  );
}
