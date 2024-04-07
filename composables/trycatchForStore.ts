export const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    await actionFn(payload, store);
  } catch (error) {
    console.error("Error in action:", error);
    // throw createError({
    //   statusCode: 403,
    //   statusMessage: "Нет доступа к этому занятию",
    //   fatal: true,
    // });
  } finally {
    store.loading = false;
  }
};
