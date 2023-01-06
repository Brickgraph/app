export const property2LeaseFields = [
  {
    id: "from",
    label: "Source Node",
    type: "node",
    required: true,
    editable: false,
  },
  {
    id: "to",
    label: "Target Node",
    type: "node",
    required: true,
    editable: false,
  },
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
  ,
  {
    id: "level",
    label: "Link Permission",
    type: "text",
    required: false,
    editable: false,
  },
];
