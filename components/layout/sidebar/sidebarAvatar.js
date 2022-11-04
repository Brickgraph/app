import { Fragment } from "react";
import { Transition, Menu, Disclosure } from "@headlessui/react";
import { useClerk, RedirectToSignIn, UserProfile } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import ProfileDropdown from "./profileMenu";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarAvatar() {
  const { user } = useUser();
  const [isAccountOpen, setAccountIsOpen] = useState(false);

  return (
    <>
      <ProfileDropdown>
        <div className="flex items-center group block flex-shrink-0">
          <div onClick={() => setAccountIsOpen(true)}>
            <Image
              className="rounded-full border-orange-500"
              height={48}
              width={48}
              src={
                user.profileImageUrl.includes("https://www.gravatar.com/avatar")
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
          </div>
        </div>
      </ProfileDropdown>
    </>
  );
}
