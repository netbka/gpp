export function numToMin(val: number) {
  return Math.floor(val / 60);
}
export function numToSec(val: number) {
  //console.log(val);
  return Math.floor(val % 60);
}

export function numToMinText(val: number) {
  return Math.floor(val / 60) > 9.9 ? Math.floor(val / 60) : "0" + Math.floor(val / 60);
}
export function numToSecText(val: number) {
  //console.log(val);
  return Math.floor(val % 60) > 9.9 ? Math.floor(val % 60) : "0" + Math.floor(val % 60);
}

export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};
