import { useState } from "react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StandardTable({
  data,
  columnHeaders,
  filterSelections = [],
  editAction = null,
}) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const items =
    filterSelections.length === 0
      ? data
      : data.filter((item) => filterSelections.includes(item.group));

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="shadow-sm ring-1 ring-black ring-opacity-5">
            <table
              className="min-w-full border-separate table-auto"
              style={{ borderSpacing: 0 }}
            >
              <thead className="bg-gray-50">
                <tr>
                  {columnHeaders.map((header, headerIdx) => (
                    <th
                      key={headerIdx}
                      scope="col"
                      className="sticky -top-5 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      {header}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="sticky -top-5 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {items.map((item, itemIdx) => (
                  <tr className="hover:bg-gray-100" key={item.id}>
                    <td
                      className={classNames(
                        itemIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      <button>{item.label}</button>
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                      )}
                    >
                      <button>{item.group}</button>
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                      )}
                    >
                      <button
                        onClick={() => editAction(item.id)}
                        className="p-2 rounded bg-orange-200 border-orange-200 border-1 text-gray-700 hover:bg-orange-400"
                      >
                        View<span className="sr-only">{item.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
