import { date } from "quasar";
export const weekEvents = (fromDate) => {
  var sdate = date.formatDate(fromDate, "YYYY-MM-DD");
  const today = date.formatDate(new Date(), "YYYY-MM-DD");
  const diff = date.getDateDiff(today, sdate, "days");
  if (diff > 0) sdate = today;
  sdate = date.addToDate(sdate, { days: 1 });
  const arr = Array.from({ length: 50 }, (_, i) => {
    if (i % 10 === 0 && i != 0) {
      sdate = date.addToDate(sdate, { days: 1 });
    }
    return {
      title: "Available",
      display: "Available",
      start: date.addToDate(sdate, { hours: 10 + ((10 + i) % 10) }),
      end: date.addToDate(sdate, { hours: 11 + ((10 + i) % 10) }),
    };
  });
  return arr;
};

export const formatDate = (timeStamp) => {
  return date.formatDate(timeStamp, "DD/MM/YYYY HH:mm");
};
