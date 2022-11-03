import { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
// import LoginButton from "../ui/buttons/login-button";
import { useClerk, RedirectToSignIn, UserProfile } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileDropdown({ children }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="ml-4 flex items-center md:ml-6">
      {!user && <RedirectToSignIn />}
      <>
        <Menu as="div">
          <div>
            <Menu.Button>{children}</Menu.Button>
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
            <Menu.Items className="origin-top-right absolute left-2 bottom-16 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item key="profile">
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                    )}
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item key="account">
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                    )}
                    onClick={() => {
                      window.location.href = "/profile/account";
                    }}
                  >
                    Account
                  </button>
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
