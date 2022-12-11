import {
  propertyFields,
  sectorFields,
  organisationFields,
  propertyUnitFields,
  investorFields,
  fundFields,
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
      case "PropertyUnit": {
        return propertyUnitFields;
      }
      case "Investor": {
        return investorFields;
      }
      case "Fund": {
        return fundFields;
      }
      default: {
        return defaultFields;
      }
    }
  } else {
    return defaultFields;
  }
};
