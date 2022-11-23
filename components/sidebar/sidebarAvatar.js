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
        <div className="flex items-center justify-center group block">
          <div
            className="p-1 rounded-full border-2 hover:border hover:border-2 hover:border-orange-400"
            onClick={() => setAccountIsOpen(true)}
          >
            <Image
              height={36}
              width={36}
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
