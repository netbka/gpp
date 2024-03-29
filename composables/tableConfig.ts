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
      //style: "width: calc((100vw-(100vw - 1536px))/3); padding-left: 4px",
      classes: "name-col ",
      //  headerStyle: "width: 150px",
    },
    {
      name: "description",
      label: "Описание",
      field: "description",
      required: true,
      align: "left",
      sortable: true,
      editable: false,
      style: "text-wrap: balance",
      classes: "gt-xs description-col wrap-col",
      headerClasses: "gt-xs",
    },
    {
      name: "totalDuration",
      label: "мин:сек",
      field: "totalDuration",
      required: true,
      align: "center",
      sortable: true,
      editable: false,
      classes: "col-duration ",
      format: (val, row) => {
        return `${numToMinText(val)}:${numToSecText(val)}`;
      },
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
      classes: "name-col ",
      //style: "width: calc((100vw-(100vw - 1536px))/3); padding-left: 4px",
      //headerStyle: "max-width: 250px",
    },
    {
      name: "description",
      label: "Описание",
      field: "description",
      required: true,
      align: "left",
      sortable: true,
      editable: false,
      style: "text-wrap: balance",
      classes: "gt-xs truncate wrap-col ",
      headerClasses: "gt-xs",
    },
    {
      name: "totalDuration",
      label: "мин:сек",
      field: "totalDuration",
      required: true,
      align: "center",
      sortable: true,
      editable: false,
      classes: "col-duration ",
      format: (val, row) => {
        return `${numToMinText(val)}:${numToSecText(val)}`;
      },
    },
  ];
};
