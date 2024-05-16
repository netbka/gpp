import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineSitemapEventHandler(async () => {
  try {
    const exerciseTemplate = await prisma.exerciseTemplate.findMany({
      where: {
        public: true,
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    const training = await prisma.training.findMany({
      where: {
        public: true,
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
    });

    return [
      ...exerciseTemplate.map((item) => ({
        loc: "exerciseTemplate/" + generateSlug(item.id.toString() + "-" + item.name),
        title: item.name,
        lastmod: item.updatedAt,
      })),
      ...training.map((item) => ({
        loc: "training/" + generateSlug(item.id.toString() + "-" + item.name),
        title: item.name,
        lastmod: item.updatedAt,
      })),
    ];

    //return desiredResult;
  } catch (error) {
    console.log("erro in fetching:", error);
  } finally {
    prisma.$disconnect();
  }
});

const generateSlug = (text: String) => {
  text = replaceRussianWithEnglish(text);
  const slugText = text.toLowerCase().replace(/\s+|[^\w\-]+/gi, "-");
  const slug = slugText.replace(/-{2,}/g, "-");
  return slug.trim("-");
};

const replaceRussianWithEnglish = (str: string) => {
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
