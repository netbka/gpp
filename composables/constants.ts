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
