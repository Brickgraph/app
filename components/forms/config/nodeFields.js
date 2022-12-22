export const organisationFields = [
  { id: "name", label: "Name", type: "text", required: true },
  {
    id: "subscription",
    label: "Subscription",
    type: "text",
    required: false,
    disabled: true,
  },
];

export const propertyFields = [
  {
    id: "label",
    label: "Label",
    type: "text",
    required: true,
    editable: true,
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
    required: false,
  },
  {
    id: "postcode",
    label: "Postcode",
    type: "text",
    required: true,
  },
  {
    id: "address",
    label: "Address Line",
    type: "text",
    required: true,
  },
  { id: "city", label: "City", type: "text", required: true },
  {
    id: "sqft",
    label: "Square Feet",
    type: "number",
    defaultValue: 1,
    required: false,
  },
  {
    id: "purchase_price",
    label: "Purchase Price",
    type: "currency",
    defaultValue: 1,
    currency: "GBP",
    required: false,
  },
];

export const sectorFields = [
  { id: "label", label: "Label", type: "text", required: true },
  {
    id: "description",
    label: "Description",
    type: "text",
    required: false,
  },
];

export const propertyUnitFields = [
  {
    id: "label",
    label: "Label",
    type: "text",
    required: true,
  },
  {
    id: "unit_number",
    label: "Unit Number",
    type: "text",
    required: true,
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
    required: false,
  },
  {
    id: "sqft",
    label: "Square Feet",
    type: "number",
    required: true,
    disable: false,
    defaultValue: 0,
  },
];

export const investorFields = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "formal_name", label: "Formal Name", type: "text", required: false },
  { id: "manager", label: "Asset Manager", type: "text", required: false },
  {
    id: "registered_addess",
    label: "Registered Address",
    type: "address",
    required: true,
  },
];

export const fundFields = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "formal_name", label: "Formal Name", type: "text", required: false },
  {
    id: "companies_house_id",
    label: "Companies House Number",
    type: "text",
    required: true,
  },
  {
    id: "registered_addess",
    label: "Registered Address",
    type: "text",
    required: false,
  },
];

export const defaultFields = [
  { id: "label", label: "Label", type: "text", required: true },
  {
    id: "description",
    label: "Description",
    type: "text",
    required: false,
  },
  {
    id: "access",
    label: "Access",
    type: "text",
    required: false,
    disable: true,
  },
];
