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
      style: "width: calc((100vw-(100vw - 1536px))/3); padding-left: 4px",
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
      classes: "gt-xs truncate wrap-col",
      headerClasses: "gt-xs",
    },
    {
      name: "totalDuration",
      label: "Продолжительность",
      field: "totalDuration",
      required: true,
      align: "center",
      sortable: true,
      editable: false,
      format: (val, row) => {
        return `${numToMin(val)} м. ${numToSec(val)} сек.`;
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
      style: "width: calc((100vw-(100vw - 1536px))/3); padding-left: 4px",
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
      style: "text-wrap: balance",
      classes: "gt-xs truncate wrap-col",
      headerClasses: "gt-xs",
    },
    {
      name: "totalDuration",
      label: "Продолжительность",
      field: "totalDuration",
      required: true,
      align: "center",
      sortable: true,
      editable: false,
      format: (val, row) => {
        return `${numToMin(val)} м. ${numToSec(val)} сек.`;
      },
    },
  ];
};
