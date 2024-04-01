export const barStyle = () => {
  return {
    right: "0",
    borderRadius: "8px",
    backgroundColor: "rgb(233 131 216 / 87%)",
    width: "8px",
    opacity: 0.2,
  };
};

export const publicPrivateIcon = (val) => {
  return val ? "public" : "lock";
};

export const editBtn = (visible: Boolean) => {
  return { icon: "edit", tooltip: "Редактировать", visible: visible, color: "light-blue-7" };
};

export const deleteBtn = (visible: Boolean) => {
  return { icon: "close", tooltip: "Удалить", visible: visible, color: "deep-orange-5" };
};

export const customBtn = (visible: Boolean, tooltip: String, icon: String) => {
  return { icon: icon, tooltip: tooltip, visible: visible, color: "grey" };
};

export const fileLimit = () => {
  return 1024 * 1024;
};

export const executeBtn = (visible: Boolean) => {
  return { icon: "play_arrow", tooltip: "Старт", visible: visible, color: "green-7" };
};

export const editorToolbar = ($q) => {
  // return [
  //   [
  //     {
  //       label: $q.lang.editor.align,
  //       icon: $q.iconSet.editor.align,
  //       fixedLabel: true,
  //       list: "only-icons",
  //       options: ["left", "center", "right", "justify"],
  //     },
  //   ],
  //   ["bold", "italic", "underline"],
  //   [
  //     {
  //       label: "Paragraph", // $q.lang.editor.formatting,
  //       icon: $q.iconSet.editor.formatting,
  //       list: "no-icons",
  //       options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
  //     },
  //     {
  //       label: "Font", // $q.lang.editor.fontSize,
  //       icon: $q.iconSet.editor.fontSize,
  //       fixedLabel: true,
  //       fixedIcon: true,
  //       list: "no-icons",
  //       options: ["size-1", "size-2", "size-3", "size-4", "size-5", "size-6", "size-7"],
  //     },

  //     "removeFormat",
  //   ],
  //   ["quote", "unordered", "ordered"],

  //   ["undo", "redo"],
  // ];
  return [
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: "only-icons",
        options: ["left", "center", "right", "justify"],
      },
    ],
    ["bold", "italic", "strike", "underline", "subscript", "superscript"],
    ["hr"],
    ["fullscreen"],
    [
      {
        label: $q.lang.editor.formatting,
        icon: $q.iconSet.editor.formatting,
        list: "no-icons",
        options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
      },
      {
        label: $q.lang.editor.fontSize,
        icon: $q.iconSet.editor.fontSize,
        fixedLabel: true,
        fixedIcon: true,
        list: "no-icons",
        options: ["size-1", "size-2", "size-3", "size-4", "size-5", "size-6", "size-7"],
      },

      "removeFormat",
    ],
    ["quote", "unordered", "ordered", "outdent", "indent"],

    ["undo", "redo"],
  ];
};
