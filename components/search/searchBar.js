import { SearchIcon, BellIcon, PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Link from "next/link";
import { SearchButton } from "./searchButton";
import { BellNotification } from "../ui/notifications/bell";

export default function SearchBar({ data, buttonOnClick }) {
  const [query, setQuery] = useState("");

  const handleClick = (e) => {
    console.log(e);
  };

  const filteredItems =
    query === ""
      ? []
      : data.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className="sticky top-0 p-2 bg-white hidden md:flex border border-l-0 border-r-0 border-2 border-gray-100 z-30">
      <div className="relative flex items-center justify-between bg-white w-full">
        <div className="flex flex-1 px-1 ml-6 justify-start">
          <SearchButton onClick={buttonOnClick} />
        </div>
        <div className="mr-6 justify-end">
          <BellNotification
            active={true}
            onClick={() => handleClick("Notification")}
          />
        </div>
      </div>
    </div>
  );
}
