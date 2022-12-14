import { useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { Combobox } from "@headlessui/react";
import { useNodeStore } from "../../../services/stores/nodeStore";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NodeSelectMulti() {
  const { nodes } = useNodeStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const searchNodes = (e) => {
    console.log("Execute search of database", searchString);
  };

  const filteredNodes =
    query === ""
      ? nodes
      : nodes.filter((node) => {
          return node.label.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    console.log("Selected", selected);
  }, [selected]);

  const handleSelection = (e) => {
    console.log("Handle selection", e);
    setSelected(e);
  };

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={(e) => handleSelection(e)}
      multiple
    >
      <div className="relative mt-1">
        <Combobox.Input
          key="node-select-input"
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-100 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(node) => node?.label}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredNodes.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredNodes.map((node) => (
              <Combobox.Option
                key={node.id}
                value={{ nodeId: node.id, label: node.label }}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-orange-400 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {node.label}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 truncate text-gray-500",
                          active ? "text-orange-200" : "text-gray-500"
                        )}
                      >
                        {node.group}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
