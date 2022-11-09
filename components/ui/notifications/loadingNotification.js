import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { LoadingSpinner } from "../loading/loadingSpinner";

export const LoadingNotification = ({ isVisible, message }) => {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={isVisible}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <LoadingSpinner message={"Loading changes..."} />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-md font-medium text-gray-900">
                      {message}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
