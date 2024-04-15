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
  withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error } = await useFetch(`/api/${store.$id}/create`, payload);
    if (data.value !== null) {
      store.itemArray.push(data.value);
    }
  })(null);
};

export const getItemById = async (store, id: number) => {
  withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error } = await useFetch(`/api/${store.$id}/${id}`, {
      method: "GET",
    });

    if (data.value) {
      updateArray(data.value, store.itemArray);
      store.currentItem = data.value;
    }
  })(null);
};

export const searchItems = async (store, filter: string) => {
  withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error } = await useFetch(`/api/${store.$id}/search`, {
      query: { filter: filter, ...store.pagination },
    });
    if (data.value) {
      store.itemArray = data.value.result;
      store.pagination.rowsNumber = data.value.totalCount;
    }
  })(null);
};

// export const template = async (store, id: number) => {
//   withErrorHandling(store)(async (payload, store) => {

//   })(null);
// };
