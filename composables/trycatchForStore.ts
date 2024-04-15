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

const baseUrl = "/api/exerciseTemplate/";
export const createItem = (store) => {
  return async (payload) => {
    await withErrorHandling(store)(async (payload, store) => {
      const { data, pending, error } = await useFetch(`/api/${resource}/create`, payload);
      if (data.value !== null) {
        store.itemArray.push(data.value);
      }
    })(payload);
  };
};

export const getItemById = async (store, id: number) => {
  withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error } = await useFetch(baseUrl + id, {
      method: "get",
    });

    if (data) {
      updateArray(data.value, store.itemArray);
      store.currentItem = data.value;
    }
  })(null);
};
