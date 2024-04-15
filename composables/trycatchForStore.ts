export const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    return await actionFn(payload, store);
  } catch (error) {
    console.error("Error in action:", error);
  } finally {
    store.loading = false;
  }
};

const baseUrl = "/api/exerciseTemplate/";
export const createItem = (store) => {
  withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error } = await useFetch(`/api/${store.$id}/create`, payload);
    if (data.value !== null) {
      store.itemArray.push(data.value);
    }
  })(null);
};

export const getItemById = async (store, id: number) => {
  return withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error, refresh, execute } = await useFetch(`/api/${store.$id}/${id}`, {
      method: "GET",
    });

    if (data.value) {
      updateArray(data.value, store.itemArray);
      store.currentItem = data.value;
    }
    return { data, pending, error, refresh, execute };
  })(null);
};

export const searchItems = async (store) => {
  return withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error, refresh, execute } = await useAsyncData(
      "search",
      () =>
        $fetch(`/api/${store.$id}/search`, {
          query: { filter: store.filter, ...store.pagination },
          headers: useRequestHeaders(["cookie"]),
        }),
      { watch: [store.pagination, ...store.filter] }
    );

    if (data.value) {
      store.itemArray = data.value.result;
      store.pagination.rowsNumber = data.value.totalCount;
    }
    return { data, pending, error, refresh, execute };
  })(null);
};

// export const template = async (store, id: number) => {
//   withErrorHandling(store)(async (payload, store) => {

//   })(null);
// };
