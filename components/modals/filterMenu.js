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
          Node Labels:{" "}
          <ComboBox
            options={filterOptions}
            handleSelections={handleNodeSelections}
            currentSelections={currentSelections}
            selectMultiple={true}
          />
        </div>
      </div>
    </SlideOverRight>
  );
}
