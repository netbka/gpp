import Fuse from "fuse.js";
export const searchExercise = (array: Array, val: string) => {
  const searchOptions = {
    isCaseSensitive: false,
    findAllMatches: true,
    minMatchCharLength: 1,
    threshold: 0,
    ignoreLocation: true,
    keys: ["name", "exerciseTemplateMuscle.name"],
  };

  let fuse = new Fuse(array, searchOptions);
  let searchResult = fuse.search(val);
  const formattedResult = searchResult.map((item) => item.item);
  return formattedResult;
};
