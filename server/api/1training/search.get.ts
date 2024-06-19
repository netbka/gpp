export default defineEventHandler(async (event) => {
  try {
    const { sortBy, descending, page, rowsPerPage, filter, level } = getQuery(event);

    // const totalCount = await prisma.training.count({
    //   where: {
    //     OR: [{ user_id: user_id }, { public: true }],
    //     name: { contains: String(filter), mode: "insensitive" },
    //     ...(Number(level) !== 0 && { level: Number(level) }),
    //   },
    // });
    const apiFetch = useRuntimeConfig().apiFetch;
    await apiFetch("/training", { method: "GET" });
    return { totalCount, result };
  } catch (error) {
    console.log("error", error);
    throw createError({
      statusCode: 500,
      message: "Что-то пошло не так",
    });
  } finally {
  }
});
