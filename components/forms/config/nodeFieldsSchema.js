import {
  propertyFields,
  organisationFields,
  sectorFields,
  investorFields,
  propertyUnitFields,
  defaultFields,
} from "./nodeFields";

export const nodeSchema = [
  {
    id: "Property",
    fields: propertyFields,
    label: "Property",
    editable: true,
    value: "Property",
  },
  {
    id: "Organisation",
    fields: organisationFields,
    label: "Organisation",
    editable: true,
    value: "Organisation",
  },
  {
    id: "Sector",
    fields: sectorFields,
    label: "Sector",
    editable: false,
    value: "Sector",
  },
  {
    id: "Investor",
    fields: investorFields,
    label: "Investor",
    editable: true,
    value: "Investor",
  },
  {
    id: "PropertyUnit",
    fields: propertyUnitFields,
    label: "Property Unit",
    editable: true,
    value: "PropertyUnit",
  },
  {
    id: "Default",
    fields: defaultFields,
    label: "Default",
    editable: false,
    value: "Default",
  },
];
