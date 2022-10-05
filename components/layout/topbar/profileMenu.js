import { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
// import LoginButton from "../ui/buttons/login-button";
import { useClerk, RedirectToSignIn, UserProfile } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileDropdown() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="ml-4 flex items-center md:ml-6">
      {!user && <RedirectToSignIn />}
      <>
        <button
          type="button"
          className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={
                  user.profileImageUrl.includes(
                    "https://www.gravatar.com/avatar"
                  )
                    ? "/images/profiles/giraffe-close-up.png"
                    : `${user.profileImageUrl}`
                }
                alt=""
              />
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item key="profile">
                {({ active }) => (
                  <a
                    href="/profile"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item key="account">
                {({ active }) => (
                  <a
                    href="/profile/account"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Account
                  </a>
                )}
              </Menu.Item>
              <Menu.Item key="sign-out">
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-orange-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                    )}
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    </div>
  );
}
