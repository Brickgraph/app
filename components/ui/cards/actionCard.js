import { useState, useEffect } from "react";
import { Transition, Fragment } from "@headlessui/react";
import Router from "next/router";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ActionButton = ({ title, action }) => {
  return (
    <>
      <button
        onClick={action}
        className="flex p-1 border border-1 border-gray-300 w-[50%] justify-center rounded-lg hover:border-orange-500 hover:bg-orange-400 hover:text-white"
      >
        <div>
          <h1 className="text-xs lg:text-md">{title}</h1>
        </div>
      </button>
    </>
  );
};

const CardDefault = ({ item }) => {
  return (
    <>
      <div className="p-4">
        <div className="flex flex-col p-4 items-center justify-center text-center">
          <div>
            <item.icon
              className="h-6 w-6 md:h-10 md:w-10 text-gray-700 md:mb-3"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-sm md:text-md lg:text-xl font-gray-900">
            {item.title}
          </h1>
        </div>
      </div>
    </>
  );
};

const CardHover = ({ item, viewAction, createAction }) => {
  return (
    <>
      <div className="p-4">
        <div className="flex flex-col items-center content-center gap-2">
          <div className="flex items-center">
            <item.icon
              className="mr-3 flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />

            <h1 className="text-sm md:text-md lg:text-lg font-roboto">
              {item.title}
            </h1>
          </div>
          <ActionButton title={"View Collection"} action={viewAction} />
          <ActionButton title={"Create New"} action={createAction} />
        </div>
      </div>
    </>
  );
};

export const ActionCard = ({ item, viewAction, createAction }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="rounded-lg h-50 w-90 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105 border border-1 border-gray-200"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        {hovered ? (
          <CardHover
            item={item}
            isShowing={hovered}
            viewAction={viewAction}
            createAction={createAction}
          />
        ) : (
          <CardDefault item={item} isShowing={hovered} />
        )}
      </div>
    </>
  );
};
