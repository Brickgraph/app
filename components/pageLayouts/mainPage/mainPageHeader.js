import { useState } from "react";

export const mainPageTabs = ["Graph", "Table", "Map", "Permissions"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const MainPageHeader = ({
  title,
  tabs,
  selectedTab,
  onSelect,
  shareAction = null,
  filterAction,
}) => {
  return (
    <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
          {/* <button
            onClick={shareAction}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Share
          </button> */}
          <button
            onClick={filterAction}
            type="button"
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Filters
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-400 focus:outline-none focus:ring-orange-500 sm:text-sm"
            defaultValue={selectedTab}
          >
            {tabs.map((tab) => (
              <option key={tab}>{tab}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onSelect(tab)}
                className={classNames(
                  tab === selectedTab
                    ? "border-orange-400 text-orange-600"
                    : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300",
                  "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
