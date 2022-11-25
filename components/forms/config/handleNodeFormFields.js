import {
  propertyFields,
  sectorFields,
  organisationFields,
  propertyUnitFields,
  investorFields,
  defaultFields,
} from "./nodeFields";

export const switchNodeForm = (nodeGroup) => {
  if (nodeGroup !== null) {
    const group = nodeGroup;
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
      case "Investor": {
        return investorFields;
      }
      default: {
        return defaultFields;
      }
    }
  } else {
    return defaultFields;
  }
};
