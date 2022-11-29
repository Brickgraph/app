import { Transition, Menu, Fragment } from "@headlessui/react";
import {
  editableLabels,
  nodeSchema,
} from "../../forms/config/nodeFieldsSchema";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const NewNodeDropdown = ({ children }) => {
  const labelsList = nodeSchema.filter((label) => {
    return label.editable === true;
  });
  return (
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
          leave="transition ease-in duration-250"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 top-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {labelsList.map((nodeLabel) => (
              <Menu.Item key={nodeLabel.id}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 w-full text-left text-lg"
                    )}
                    onClick={() => {
                      window.location.href = "/create?label=" + nodeLabel.id;
                    }}
                  >
                    {nodeLabel.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
