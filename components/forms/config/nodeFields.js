export const organisationFields = [
  { id: "name", label: "Name", type: "text", required: true },
  {
    id: "subscription",
    label: "Subscription",
    type: "text",
    required: false,
    disabled: true,
  },
  {
    id: "access",
    label: "Access",
    type: "text",
    required: false,
    disable: true,
  },
];

export const propertyFields = [
  {
    id: "label",
    label: "Label",
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
    defaultValue: 100,
    required: false,
  },
  {
    id: "access",
    label: "Access",
    type: "text",
    required: true,
    disable: true,
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
  {
    id: "access",
    label: "Access",
    type: "text",
    required: false,
    disable: true,
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
    disable: true,
    defaultValue: 0,
  },
  {
    id: "access",
    label: "Access",
    type: "text",
    required: false,
    disable: true,
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
