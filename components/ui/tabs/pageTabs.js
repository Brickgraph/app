import { useState, useEffect } from "react";
import { LoadingSpinner } from "../loading/loadingSpinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Tabs = ({ children, tabs, onSelect, selectedTab = null }) => {
  const [selected, setSelected] = useState(selectedTab ? selectedTab : null);
  useEffect(() => {
    setSelected(tabs ? tabs[0] : null);
  }, [tabs]);

  const handleTabSelect = (tab) => {
    setSelected(tab);
    onSelect(tab);
  };

  if (tabs === null) {
    return (
      <>
        <LoadingSpinner message={""} />
      </>
    );
  }

  /* if (tabs.length === 1) {
    return <>{children}</>;
  } */

  return (
    <>
      <div className="relative border-b border-gray-200 pb-5 sm:pb-0 p-2">
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              defaultValue={selected}
            >
              {tabs.map((tab, tabIdx) => (
                <option key={tabIdx}>{tab}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabSelect(tab)}
                  className={classNames(
                    tab === selected
                      ? "border-orange-400 text-black"
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-orange-200",
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
      <div className="mt-4 p-2">{children}</div>
    </>
  );
};
