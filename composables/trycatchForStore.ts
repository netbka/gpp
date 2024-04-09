export const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    await actionFn(payload, store);
  } catch (error) {
    console.error("Error in action:", error);
  } finally {
    store.loading = false;
  }
};
