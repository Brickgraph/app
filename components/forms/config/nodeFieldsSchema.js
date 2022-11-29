import {
  propertyFields,
  organisationFields,
  sectorFields,
  investorFields,
  propertyUnitFields,
  fundFields,
  defaultFields,
} from "./nodeFields";

import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  UsersIcon,
  CurrencyPoundIcon,
  ClipboardListIcon,
  GlobeIcon,
  KeyIcon,
  CashIcon,
  CollectionIcon,
} from "@heroicons/react/outline";

export const nodeSchema = [
  {
    id: "Property",
    fields: propertyFields,
    label: "Property",
    editable: true,
    value: "Property",
    showInActions: true,
  },
  {
    id: "Deal",
    fields: defaultFields,
    label: "Deal",
    editable: true,
    value: "Deal",
    showInActions: true,
  },
  {
    id: "Organisation",
    fields: organisationFields,
    label: "Organisation",
    editable: true,
    value: "Organisation",
    showInActions: true,
  },
  {
    id: "Sector",
    fields: sectorFields,
    label: "Sector",
    editable: false,
    value: "Sector",

    showInActions: true,
  },
  {
    id: "Investor",
    fields: investorFields,
    label: "Investor",
    editable: true,
    value: "Investor",
    showInActions: true,
  },
  {
    id: "PropertyUnit",
    fields: propertyUnitFields,
    label: "Property Unit",
    editable: true,
    value: "PropertyUnit",
    showInActions: true,
  },
  {
    id: "Fund",
    fields: fundFields,
    label: "Fund",
    editable: true,
    value: "Fund",
    showInActions: true,
  },
  {
    id: "Default",
    fields: defaultFields,
    label: "Default",
    editable: false,
    value: "Default",
    showInActions: false,
  },
];
