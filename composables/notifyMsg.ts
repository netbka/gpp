import { Notify } from "quasar";

export const notifyMsgNegative = (msg: String) => {
  Notify.create({
    type: "negative",
    caption: "Что-то пошло не так.",
    message: "Ошибка: " + msg,
    timeout: 500,
  });
};
