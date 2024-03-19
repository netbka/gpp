import { date } from "quasar";
export const trainingTableColumns = () => {
  return [
    {
      name: "name",
      label: "Название",
      field: "name",
      required: true,
      align: "left",
      sortable: true,
      editable: false,
      style: "width: 150px",
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
      // style: "width: 125px",
      // headerStyle: "width: 125px",
    },

    // {
    //   name: "OpenDate",
    //   label: "Date Opened",
    //   field: "OpenDate",
    //   required: true,
    //   align: "left",
    //   sortable: true,
    //   editable: false,
    //   format: (val, row) => date.formatDate(val, "DD/MM/YYYY"),
    //   style: "width: 125px",
    //   headerStyle: "width: 125px",
    // },

    // {
    //   name: "Assignee",
    //   label: "Assignee",
    //   field: "AssigneeId",
    //   required: true,
    //   align: "center",
    //   sortable: true,
    //   editable: true,
    //   controltype: "user",
    //   format: (val, row) => {
    //     return row.Assignee !== null ? row.Assignee.FirstName + " " + row.Assignee.LastName : "-";
    //   },
    //   avatar: true,
    //   style: "width: 75px",
    //   headerStyle: "width: 75px",
    // },
  ];
};
