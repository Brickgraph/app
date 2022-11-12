import {
  propertyFields,
  sectorFields,
  organisationFields,
  propertyUnitFields,
  defaultFields,
} from "./nodeFields";

export const switchNodeForm = (node) => {
  if (node !== null) {
    const group = node.group;
    switch (group) {
      case "Property": {
        return propertyFields;
      }
      case "Sector": {
        return sectorFields;
      }
      case "Organisation": {
        return organisationFields;
      }
      case "Property Unit": {
        return propertyUnitFields;
      }
      default: {
        return defaultFields;
      }
    }
  } else {
    return defaultFields;
  }
};
