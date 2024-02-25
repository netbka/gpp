import { PrismaClient } from "@prisma/client";

const SportTypeArray = [
  {
    name: "Бег",
    description: "",
  },
  {
    name: "Велоспорт",
    description: "",
  },
  {
    name: "Плаванье",
    description: "",
  },
  {
    name: "Теннис",
    description: "",
  },
];

const prisma = new PrismaClient();
async function seed() {
  for (const sportType of SportTypeArray) {
    await prisma.sportType.create({
      data: sportType,
    });
  }
}
try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.log(e);
  await prisma.$disconnect();
  process.exit(1);
}
