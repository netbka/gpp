export const useSlug = (text: String) => {
  text = replaceRussianWithEnglish(text);
  const prohibitedChars = /[^a-z0-9\-_]+/gi;

  // Remove prohibited characters and convert to lowercase
  const slugText = text.toLowerCase().replace(prohibitedChars, "");

  // Replace multiple consecutive hyphens with a single hyphen
  const slug = slugText.replace(/-{2,}/g, "-");

  // Remove any leading or trailing hyphens
  return slug.trim("-");
};

export const parseSlugId = (val: String) => {
  try {
    return val.split("-")[0];
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Нет такого занятия",
    });
  }
};

export const replaceRussianWithEnglish = (str) => {
  const russianToEnglishMapping = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };
  return str.replace(/[а-яёА-ЯЁ]/g, (letter) => russianToEnglishMapping[letter]);
};
