import SlideOverRight from "./slideOver";
import { ComboBoxInput } from "../ui/inputs/comboBoxSelect";
import { useNodeStore } from "../../services/stores/nodeStore";

export default function FilterMenu({
  isOpen,
  handleClose,
  handleNodeLabels,
  handleNodeSelections,
  currentLabelSelections,
  currentNodeSelections,
}) {
  const { nodes: nodesInStore } = useNodeStore();
  let uniqueNodeGroups = [...new Set(nodesInStore.map((item) => item.group))];
  const nodeGroupsDict = uniqueNodeGroups.map((item) => {
    const splitItem = item.split(", ");
    return { id: item, label: item, value: item };
  });

  return (
    <SlideOverRight
      isOpen={isOpen}
      handleClose={handleClose}
      clearFilters={() => handleNodeSelections([])}
    >
      <div className="flex min-h-full flex-col justify-center">
        <div id="combobox-filter-properties" className="px-6 py-4">
          Labels:{" "}
          <ComboBoxInput
            options={nodeGroupsDict}
            handleSelections={handleNodeLabels}
            currentSelections={currentLabelSelections}
            selectMultiple={true}
          />
        </div>
        <div id="combobox-filter-properties" className="px-6 py-4">
          Nodes:{" "}
          <ComboBoxInput
            options={nodesInStore}
            handleSelections={handleNodeSelections}
            currentSelections={currentNodeSelections}
            selectMultiple={true}
          />
        </div>
      </div>
    </SlideOverRight>
  );
}
