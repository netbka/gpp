import { PrismaClient } from "@prisma/client";
import { weekEvents } from "~/composables/calendarDate";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  //const { user_id } = event.context.params;

  const { start } = getQuery(event);
  //console.log(dateStart);
  return weekEvents(start);
});
