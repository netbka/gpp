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

export const removeNestedItemFromArr = (val: number, arr: Array) => {
  var found = false;
  for (let group of arr) {
    if (found) return;
    var index = group.exercise.findIndex((el) => el.id === val);
    if (found) return;
    if (index > -1) {
      group.exercise.splice(index, 1);
      found = true;
    }
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
      if (element.id === val.id) {
        arr[arr.indexOf(parent)].exercise[index] = val;
        found = true;
      }
    });
  });
};

export const findExerciseById = (arr: Array, id: number) => {
  let item = null;
  arr.forEach((parent) => {
    if (item !== null) return;
    parent.exercise.forEach((element, index) => {
      if (item !== null) return;
      if (element.id === id) {
        item = arr[arr.indexOf(parent)].exercise[index];
      }
    });
  });
  return item;
};

export const calculateDuration = (arr: Array) => {
  try {
    //  arr = arr.filter((obj) => obj !== undefined);
    var totalduration = 0;
    arr.forEach((parent) => {
      if (!parent) return;
      var phaseduration = 0;
      parent.exercise.forEach((child) => {
        phaseduration += parseInt(child.duration);
      });

      phaseduration = phaseduration * parseInt(parent.repeats);
      totalduration += phaseduration;
    });
    return totalduration;
  } catch (error) {
    return 0;
  }
};
