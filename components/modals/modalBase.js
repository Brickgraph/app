import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const ModalBase = ({ show, children, onClose }) => {
  if (!show) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <>
      <div
        id="wrapper"
        className="fixed inset-0 p-10 h-full bg-black bg-opacity-25 
                 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto pt-28"
        onClick={handleClose}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="transform transition duration-[4000ms]"
          enterFrom="opacity-0 rotate-[-120deg] scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-[4000ms] transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          <div className="md:w-[600px] w-[90%] flex flex-col rounded-xl pt-18">
            <div className="relative bg-white p-4 object-cover rounded border-orange-500 border-1">
              <button className="absolute top-2 right-2 place-self-end">
                <XIcon
                  onClick={onClose}
                  className="h-6 w-6 md:h-8 md:w-8 text-black hover:text-orange-400"
                  aria-hidden="true"
                />
              </button>
              {children}
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default ModalBase;
