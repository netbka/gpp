export const findNextItemById = (array, id: string) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      // Check if there are any remaining items in the array after the found item
      if (i + 1 < array.length) {
        return array[i + 1];
      } else {
        return null; // No next item found (reached the end of the array)
      }
    }
  }

  // Item with the specified ID not found
  return null;
};

export const hasProperties = (obj: Object) => {
  return Object.keys(obj).length > 0;
};

export const updateArray = (val: Object, arr: Array) => {
  var index = arr.findIndex((el) => el.id === val.id);
  if (index > -1) {
    arr[index] = val;
  } else {
    arr.push(val);
  }
};
export const removeItemFromArr = (val: number, arr: Array) => {
  var index = arr.findIndex((el) => el.id === val);
  if (index > -1) {
    arr.splice(index, 1);
  }
};
export const getById = (val: number, arr: Array) => {
  var index = arr.findIndex((el) => el.id === val);
  if (index > -1) {
    return arr[index];
  } else {
    return null;
  }
};
