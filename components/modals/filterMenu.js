import SlideOverRight from "./slideOver";
import ComboBox from "../forms/inputs/comboBox";

export default function FilterMenu({
  isOpen,
  handleClose,
  handleNodeSelections,
  currentSelections,
  filterOptions,
}) {
  return (
    <SlideOverRight
      isOpen={isOpen}
      handleClose={handleClose}
      clearFilters={() => handleNodeSelections([])}
    >
      <div className="flex min-h-full flex-col justify-center">
        <div id="combobox-filter-properties">
          Nodes:{" "}
          <ComboBox
            options={filterOptions}
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
