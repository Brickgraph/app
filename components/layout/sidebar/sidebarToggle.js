import { useState } from "react";
import SidebarClosed from "./closedSidebar";
import SidebarOpen from "./openSidebar";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

export default function SidebarMenu({ path }) {
  const [minimized, setMinimized] = useState(false);
  return (
    <div className="grow">
      {minimized ? (
        <div className="hidden md:flex md:w-24 md:flex-col md:fixed md:inset-y-0 py-5 bg-gray-800">
          <div className="flex-1 flex flex-col min-h-0 items-center">
            <SidebarClosed path={path} />
            <ChevronRightIcon
              onClick={() => setMinimized(false)}
              className="h-8 w-8 text-white cursor-pointer absolute bottom-2 hover:bg-orange-400 rounded-full p-1"
            />
          </div>
        </div>
      ) : (
        <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 py-5 bg-gray-800">
          <div className="flex-1 flex flex-col min-h-0">
            <SidebarOpen path={path} />
            <ChevronLeftIcon
              onClick={() => setMinimized(true)}
              className="h-8 w-8 text-white cursor-pointer absolute right-4 bottom-2 hover:bg-orange-400 rounded-full p-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}
