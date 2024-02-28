export const useTimeParser = () => {
  return ref();
};

export function numToMin(val: number) {
  return Math.floor(val / 60);
}
export function numToSec(val: number) {
  return Math.floor(val % 60);
}
