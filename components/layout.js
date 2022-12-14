import { Fragment, useEffect, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import { navigationItems } from "./sidebar/navigationItems";
import SidebarAvatar from "./sidebar/sidebarAvatar";
import { useRouter } from "next/router";
import Image from "next/image";
import SearchBar from "./search/searchBar";
import { SearchButton } from "./search/searchButton";
import CommandPalette from "./search/commandPalette";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { asPath } = useRouter();
  const path = asPath.substring(1) + "/";
  const formattedPath = "/" + path.substring(0, path.indexOf("/"));

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const handlePalette = () => {
    setCommandPaletteOpen((current) => !current);
  };

  const handleSidebarSearch = () => {
    setCommandPaletteOpen(true);
    setSidebarOpen(false);
  };

  // handle what happens on key press
  const handleKeyPress = useCallback((event) => {
    if (event.metaKey === true && event.key === "k") {
      handlePalette();
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>

                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <button
                        onClick={() => {
                          window.location.href = "/";
                        }}
                      >
                        <Image
                          className="h-12 w-auto"
                          height={60}
                          width={180}
                          src="/images/logos/bg-logo-with-title.png"
                          alt="Brickgraph Limited Logo"
                        />
                      </button>
                    </div>
                    <div className="px-2">
                      <SearchButton onClick={() => handleSidebarSearch()} />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigationItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href === formattedPath
                              ? "bg-orange-400 text-white"
                              : item.disabled
                              ? "text-gray-600"
                              : "text-gray-800 hover:bg-orange-100",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.href === formattedPath
                                ? "bg-orange-400 text-white"
                                : item.disabled
                                ? "text-gray-600"
                                : "text-gray-800 hover:bg-orange-100",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <SidebarAvatar />
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-orange-400 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <Image
                    className="h-12 w-auto"
                    height={60}
                    width={180}
                    src="/images/logos/bg-logo-with-title.png"
                    alt="Your Company"
                  />
                </button>
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.href === formattedPath
                        ? "bg-orange-400 text-white"
                        : item.disabled
                        ? "text-gray-600"
                        : "text-gray-800 hover:bg-orange-100",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md text-sm lg:text-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.href === formattedPath
                          ? "bg-orange-400 text-white"
                          : item.disabled
                          ? "text-gray-600"
                          : "text-gray-800 hover:bg-orange-100",
                        "mr-4 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <a href="#" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <SidebarAvatar />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <SearchBar
              data={[]}
              buttonOnClick={() => setCommandPaletteOpen(true)}
            />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
