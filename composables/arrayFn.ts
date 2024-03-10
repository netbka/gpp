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

export const updateArray = (val: Object, arr: Array, id: String) => {
  var index = id === undefined || id === null ? arr.findIndex((el) => el.id === val.id) : arr.findIndex((el) => el[id] === val[id]);
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

export const updateNestedItem = (val: Object, arr: Array) => {
  var found = false;
  arr.forEach((parent) => {
    if (found) return;
    parent.exercise.forEach((element, index) => {
      if (found) return;
      if (element.uuid === val.uuid) {
        arr[arr.indexOf(parent)].exercise[index] = val;
        found = true;
      }
    });
  });
};

export const addUUIDNestedItem = (arr: Array) => {
  arr.forEach((parent) => {
    parent.exercise.forEach((element, index) => {
      arr[arr.indexOf(parent)].exercise[index].uuid = crypto.randomUUID();
    });
  });
};

import omit from "lodash/omit";
export const removeUUID = (data: Array, fieldToOmit) => {
  if (!Array.isArray(data)) {
    throw new TypeError("Input data must be an array.");
  }

  function omitField(item) {
    if (typeof item === "object" && item !== null) {
      return omit({ ...item }, fieldToOmit); // Omit field from a copy
    }
    return item; // Return other data types unchanged
  }

  return data.map((item) => {
    const updatedItem = omitField(item);
    if (Array.isArray(updatedItem.exercise)) {
      // Replace "exercise" with your actual field name
      updatedItem.exercise = updatedItem.exercise.map(omitField);
    }
    return updatedItem;
  });
};
