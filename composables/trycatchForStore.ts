export const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    await actionFn(payload, store);
  } catch (error) {
    console.error("Error in action:", error);
    // optionally, you can handle the error or display an error message to the user
  } finally {
    store.loading = false;
  }
};
