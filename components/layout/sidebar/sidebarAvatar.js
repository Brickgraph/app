import { Fragment } from "react";
import { Transition, Menu, Disclosure } from "@headlessui/react";
import { useClerk, RedirectToSignIn, UserProfile } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import ProfileDropdown from "./profileMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarAvatar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isAccountOpen, setAccountIsOpen] = useState(false);

  return (
    <>
      <ProfileDropdown>
        <a href="#" className="group block flex-shrink-0">
          <div className="flex items-center">
            <div onClick={() => setAccountIsOpen(true)}>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={
                  user.profileImageUrl.includes(
                    "https://www.gravatar.com/avatar"
                  )
                    ? "/images/profiles/giraffe-close-up.png"
                    : `${user.profileImageUrl}`
                }
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-md font-medium text-gray-700 group-hover:text-gray-900">
                {user.firstName}
              </p>
              {/* <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                Profile Menu
              </p> */}
            </div>
          </div>
        </a>
      </ProfileDropdown>
    </>
  );
}
