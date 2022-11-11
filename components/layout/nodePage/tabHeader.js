import ActionFullMenu from "./actionsDropdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Details", href: "#", current: true },
  { name: "Connections", href: "#", current: false },
  { name: "Logs", href: "#", current: false },
  { name: "Permissions", href: "#", current: false },
];

export const TabHeader = ({ data, selectedTab, handleSection }) => {
  return (
    <div className="relative border-b border-gray-200 pb-5 sm:pb-0 p-2">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {data.label}
        </h3>
        <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
          <ActionFullMenu />
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
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleSection(tab.name)}
                className={classNames(
                  tab.name === selectedTab
                    ? "border-orange-400 text-black"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-orange-200",
                  "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
