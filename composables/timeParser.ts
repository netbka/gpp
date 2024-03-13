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
