import { useState, useEffect } from "react";
import { Transition, Fragment } from "@headlessui/react";
import Router from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const handleCreate = () => {
  console.log("Create");
};

const handleView = (href) => {
  console.log(href);
  Router.push(href);
};

const ActionButton = ({ title, action }) => {
  return (
    <>
      <div className="flex p-2 border border-1 border-gray-300 w-[75%] justify-center rounded-lg hover:border-orange-500 hover:bg-orange-400 hover:text-white">
        <button onClick={action}>
          <h1 className="text-md lg:text-lg">{title}</h1>
        </button>
      </div>
    </>
  );
};

const CardDefault = ({ item, isShowing }) => {
  return (
    <div className="p-4">
      <div className="flex flex-col p-4 items-center justify-center">
        <div>
          <item.icon
            className="h-6 w-6 md:h-10 md:w-10 text-gray-700"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-sm md:text-md lg:text-xl font-gray-900">
          {item.title}
        </h1>
      </div>
    </div>
  );
};

const CardHover = ({ item, isShowing }) => {
  console.log(item.href);
  return (
    <>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="p-4">
          <div className="flex flex-col items-center content-center gap-2">
            <ActionButton title={"Create"} action={() => handleCreate()} />
            <ActionButton
              title={"View Data"}
              action={() => handleView(item.href)}
            />
          </div>
        </div>
      </Transition>
    </>
  );
};

export const ActionCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="rounded-lg border border-2 border-orange-200"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        {hovered ? (
          <CardHover item={item} isShowing={hovered} />
        ) : (
          <CardDefault item={item} isShowing={hovered} />
        )}
      </div>
    </>
  );
};
