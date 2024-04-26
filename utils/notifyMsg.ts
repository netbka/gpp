import { Notify } from "quasar";

export const notifyMsgNegative = (msg: string) => {
  Notify.create({
    type: "negative",
    caption: "Что-то пошло не так.",
    message: "Ошибка: " + msg,
    timeout: 1000,
  });
};

export const notifyRejectedSize = (rejectedEntries: Array) => {
  console.log(rejectedEntries);
  try {
    Notify.create({
      type: "negative",
      caption: "Слишком большой размер файла",
      message: `${rejectedEntries[0].file.name} `,
      timeout: 1000,
    });
  } catch (err) {
    console.log(err);
  }
};

export const notifyMsgPositive = (msg: string) => {
  Notify.create({
    type: "positive",
    caption: "Все ок.",
    message: msg,
    timeout: 500,
  });
};
