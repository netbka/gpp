import { date } from "quasar";
export const trainingTableColumns = () => {
  return [
    {
      name: "public",
      label: "",
      field: "public",
      required: true,
      align: "center",
      sortable: false,
      editable: false,
      icon: true,
      style: "width: 15px; padding-left: 8px !important; padding-right: 4px !important; text-align:center",
      headerStyle: "width: 15px",
    },

    {
      name: "name",
      label: "Название",
      field: "name",
      required: true,
      align: "left",
      sortable: true,
      editable: false,
      type: "text",
      style: "width: 150px; padding-left: 4px",
      headerStyle: "width: 150px",
    },
    {
      name: "description",
      label: "Описание",
      field: "description",
      required: true,
      align: "left",
      sortable: true,
      editable: false,
    },

    //   format: (val, row) => {
    //     return row.Assignee !== null ? row.Assignee.FirstName + " " + row.Assignee.LastName : "-";
    //   },
  ];
};

export const trainingEditableTableColumns = () => {
  return [
    {
      name: "public",
      label: "",
      field: "public",
      required: true,
      align: "center",
      sortable: false,
      editable: false,
      icon: true,
      style: "width: 15px; padding-left: 8px !important; padding-right: 4px !important; text-align:center",
      headerStyle: "width: 15px",
    },

    {
      name: "name",
      label: "Название",
      field: "name",
      required: true,
      align: "left",
      sortable: true,
      editable: true,
      type: "text",
      style: "width: 150px; padding-left: 4px",
      headerStyle: "width: 150px",
    },
    {
      name: "description",
      label: "Описание",
      field: "description",
      required: true,
      align: "left",
      sortable: true,
      editable: false,
      classes: "",
      style: "max-width: 150px; padding-left: 4px",
      headerStyle: "max-width: 150px; padding-left: 4px",
    },

    //   format: (val, row) => {
    //     return row.Assignee !== null ? row.Assignee.FirstName + " " + row.Assignee.LastName : "-";
    //   },
  ];
};
