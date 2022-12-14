import { BellIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ExclamationIcon,
  MailOpenIcon,
  CogIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NotificationMenu({ children }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md">
          {children}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/notifications"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <ExclamationIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  View Notifications
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/notifications/settings"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <CogIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Notification Settings
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export const BellNotification = ({ active, onClick }) => {
  return (
    <>
      <NotificationMenu>
        <div className="relative flex group">
          <span onClick={onClick}>
            <BellIcon
              className="h-8 hover:bg-gray-100 rounded-full p-1 text-gray-500"
              aria-hidden="true"
            />
            <span className="sr-only">View notifications</span>
            <div className="inline-flex absolute -top-1 -right-1 justify-center items-center w-4 h-4 text-xs font-bold text-white bg-orange-400 rounded-full border-2 border-white dark:border-gray-900 group-hover:animate-ping" />
          </span>
        </div>
      </NotificationMenu>
    </>
  );
};
