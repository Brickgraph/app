const mainPageTabsList = ["Graph", "Table", "Map"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const MainPageTabs = ({ selectedTab, onSelect }) => {
  return (
    <div className="mt-4">
      <div className="sm:hidden">
        <label htmlFor="current-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="current-tab"
          name="current-tab"
          onChange={(e) => onSelect(e.target.value)}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-400 focus:outline-none focus:ring-orange-500 sm:text-md"
          defaultValue={selectedTab}
        >
          {mainPageTabsList.map((tab) => (
            <option key={tab}>{tab}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="-mb-px flex space-x-8">
          {mainPageTabsList.map((tab) => (
            <button
              key={tab}
              onClick={() => onSelect(tab)}
              className={classNames(
                tab === selectedTab
                  ? "border-orange-400 text-orange-600"
                  : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300",
                "whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
