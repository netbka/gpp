export const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    return await actionFn(payload, store);
  } catch (error) {
    console.error("Error in action:", error);
    throw error;
  } finally {
    store.loading = false;
  }
};

export const createItem = async (store) => {
  await withErrorHandling(store)(async (payload, store) => {
    const response = await $fetch(`/api/${store.$id}/create`, {
      method: "POST",
      body: { ...store.currentItem },
    });

    updateArray(response, store.itemArray);
    store.currentItem = response;
  })(null);
};
export const updateItem = async (store) => {
  withErrorHandling(store)(async (payload, store) => {
    const response = await $fetch(`/api/${store.$id}/update`, {
      method: "put",
      body: { ...store.currentItem },
    });

    updateArray(response, store.itemArray);
    store.currentItem = response;
  })(null);
};

export const deleteItem = async (store, id: number) => {
  withErrorHandling(store)(async (payload, store) => {
    const response = await $fetch(`/api/${store.$id}/delete`, {
      method: "delete",
      body: { id },
    });

    if (store.currentItem.id === id) store.newItem();
    removeItemFromArr(id, store.itemArray);
  })(null);
};

export const getById = async (store, id: number) => {
  withErrorHandling(store)(async (props, store) => {
    const response = await $fetch(`/api/${store.$id}/${id}`, {
      method: "GET",
    });
    if (response) {
      updateArray(response, store.itemArray);
      store.currentItem = response;
    }
  })(null);
};

export const getItemById = async (store, id: number) => {
  return await withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error, refresh, execute } = await useAsyncData(`${store.$id}-getItemById`, () =>
      $fetch(`/api/${store.$id}/${id}`, {
        headers: useRequestHeaders(["cookie"]),
      })
    );

    if (data.value) {
      updateArray(data.value, store.itemArray);
      store.currentItem = data.value;
    }
    if (error.value) {
      console.log(error.value.statusCode);
      throw createError({
        statusCode: error.value.statusCode,
        message: "Нет доступа к этому занятию", //"Этого занятия нет",
      });
      //throw error;
    }
    return { data, pending, error, refresh, execute };
  })(null);
};

export const searchItems = async (store) => {
  return withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error, refresh, execute } = await useAsyncData(
      `${store.$id}-searchItems`,
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

export const fetchAll = async (store, id: number) => {
  return withErrorHandling(store)(async (payload, store) => {
    const { data, pending, error, refresh, execute } = await useAsyncData(`${store.$id}-fetchAll`, () =>
      $fetch(`/api/${store.$id}/all`, {
        headers: useRequestHeaders(["cookie"]),
      })
    );

    if (data.value) {
      store.itemArray = data.value;
    }
    return { data, pending, error, refresh, execute };
  })(null);
};

import { TablePagination, type ITablePagination } from "~/types/ITablePagination";
export const setPagination = (store, pagination: ITablePagination) => {
  store.pagination = pagination;
};
export const setPaginationAndFilter = (store, pagination: ITablePagination, filter: string) => {
  store.pagination = pagination;
  store.filter = filter;
};

// export const template = async (store, id: number) => {
//   withErrorHandling(store)(async (payload, store) => {

//   })(null);
// };
