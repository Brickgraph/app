import create from "zustand";
import { useNodeStore } from "./nodeStore";
import { useEdgeStore } from "./edgeStore";

export const useMainStore = create((...a) => ({
  ...useNodeStore(...a),
  ...useEdgeStore(...a),
  // ...useSchemaStore(...a),
  // ...useUserSettingsStore(...a),
  // ...useOrganisationSettingsStore(...a),
}));
