import { useState, useEffect } from "react";
import { FilterIcon, TrashIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TableStickyHeaders({
  data,
  filterSelections,
  openFilterMenu,
  editAction,
}) {
  const items =
    filterSelections.length === 0
      ? data
      : data.filter((item) => filterSelections.includes(item.group));

  return (
    <div className="relative">
      <div className="px-2 sm:px-4 lg:px-6 w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Data Entities
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the data entities that you have access to.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-8 sm:flex-none">
            <button
              data-bs-toggle="tooltip"
              title="Open the filter menu"
              onClick={openFilterMenu}
              className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
            >
              <FilterIcon className="h-5 w-5 " aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-8 sm:flex-none">
            <button
              type="button"
              className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
            >
              Add
            </button>
          </div>
        </div>
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
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Label
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                      >
                        Group
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {items.map((item, itemIdx) => (
                      <tr
                        className="hover:bg-orange-200"
                        key={item.id}
                        onClick={() => editAction(item.id)}
                      >
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
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {item.name}</span>
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
      </div>
    </div>
  );
}
