import { date } from "quasar";
export const trainingTableColumns = () => {
  return [
    {
      name: "user_id",
      label: "",
      field: "user_id",
      required: true,
      align: "center",
      sortable: false,
      editable: false,

      style: "width: 15px; padding-left: 8px !important; padding-right: 4px !important; text-align:center",
      headerStyle: "width: 15px",
      format: (val, row) => {
        return `<div><img src=${getProfile(val)} class="q-avatar font32"></img></div>`;
      },
    },
    //<i data-v-bef86d75="" class="q-icon notranslate material-icons q-mr-sm float-left" aria-hidden="true" role="presentation" style="font-size: 24px;">public</i>
    // {
    //   name: "public",
    //   label: "",
    //   field: "public",
    //   required: true,
    //   align: "center",
    //   sortable: false,
    //   editable: false,
    //   icon: true,
    //   style: "width: 15px; padding-left: 8px !important; padding-right: 4px !important; text-align:center",
    //   headerStyle: "width: 15px",
    // },

    {
      name: "name",
      label: "Название",
      field: "name",
      required: true,
      align: "left",
      sortable: true,
      editable: false,
      type: "text",
      //style: "width: calc((100vw-(100vw - 1439px))/3); padding-left: 4px",
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
      name: "duration",
      label: "мин:сек",
      field: "duration",
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
      //style: "width: calc((100vw-(100vw - 1439px))/3); padding-left: 4px",
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
      name: "duration",
      label: "мин:сек",
      field: "duration",
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

export const exerciseTemplateEditableTableColumns = () => {
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
      //style: "width: calc((100vw-(100vw - 1439px))/3); padding-left: 4px",
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
      classes: "gt-xs truncate desc-col ",
      headerClasses: "gt-xs",
    },
    {
      name: "exerciseTemplateMuscle",
      label: "Мышцы",
      field: "exerciseTemplateMuscle",
      required: true,
      align: "center",
      sortable: true,
      editable: false,
      classes: "name-col",
      // format: (val, row) => {
      //   return val
      //     .map((item) => {
      //       return ` ${item.name}`;
      //     })
      //     .join(" ");
      // },
    },
  ];
};
