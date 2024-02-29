export function numToMin(val: number) {
  return Math.floor(val / 60);
}
export function numToSec(val: number) {
  //console.log(val);
  return Math.floor(val % 60);
}
