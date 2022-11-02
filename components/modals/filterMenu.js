import SlideOverRight from "./slideOver";
import ComboBox from "../forms/inputs/comboBox";
import { useState, useEffect } from "react";

export default function FilterMenu({
  isOpen,
  handleClose,
  handleNodeSelections,
  currentSelections,
}) {
  const options = [
    { id: 1, label: "Property", value: "Property" },
    { id: 2, label: "Sector", value: "Sector" },
    { id: 3, label: "Organisation", value: "Organisation" },
    { id: 4, label: "Property Unit", value: "PropertyUnit" },
    { id: 5, label: "Users", value: "Users" },
  ];

  return (
    <SlideOverRight
      isOpen={isOpen}
      handleClose={handleClose}
      clearFilters={() => handleNodeSelections([])}
    >
      <div className="flex min-h-full flex-col justify-center">
        <div className="items-center">
          <h1 className="text-lg text-bold">Filters</h1>
          <br />
        </div>
        <div id="combobox-filter-properties">
          Nodes:{" "}
          <ComboBox
            options={options}
            handleSelections={handleNodeSelections}
            currentSelections={currentSelections}
          />
        </div>
        {/* <div id="combobox-filter-properties">
          Properties:{" "}
          <ComboBox
            options={options}
            handleSelections={handleNodeSelections}
            currentSelections={currentSelections}
          />
        </div> */}
      </div>
    </SlideOverRight>
  );
}
