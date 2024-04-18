interface ArrayResponse<T> {
  data: T[];
}
interface TableResponse<T> {
  data: {
    result: T[];
    totalCount: number;
  };
}
interface ItemResponse<T> {
  data: T;
  pending: boolean;
  error: Error | null;
  refresh: () => void;
}
export const useBasicCrud = <T>(store) => ({
  async fetchAll(): Promise<ArrayResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<TableResponse<T>>(`${store.$id}-fetchAll`, () => $fetch(`/api/${store.$id}/all`));
    return { data, pending, error, refresh };
  },
  async searchItem(): Promise<TableResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<TableResponse<T>>(
      `${store.$id}-searchItems`,
      () =>
        $fetch(`/api/${store.$id}/search`, {
          query: { filter: store.filter, ...store.pagination },
        }),
      { watch: [store.pagination, ...store.filter] }
    );

    if (data.value) {
      store.itemArray = data.value.result;
      store.pagination.rowsNumber = data.value.totalCount;
    }
    return { data, pending, error, refresh };
  },

  async getItemById(id: number): Promise<ItemResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<ItemResponse<T>>(`${store.$id}-getItemById`, () =>
      $fetch(`/api/${store.$id}/${id}`, {
        //headers: useRequestHeaders(["cookie"]),
      })
    );

    if (data.value) {
      
      updateArray(data.value, store.itemArray);
      store.currentItem = data.value;
      
    }
    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        message: "Нет доступа к этому занятию",
      });
    }
    return { data, pending, error, refresh };
  },
  async createItem() {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/create`, {
        method: "POST",
        body: { ...store.currentItem },
      });

      updateArray(response, store.itemArray);
      store.currentItem = response;
    })(null);
  },
  async updateItem() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/update`, {
        method: "PUT",
        body: { ...store.currentItem },
      });

      updateArray(response, store.itemArray);
      store.currentItem = response;
    })(null);
  },
  async deleteItem(id: number) {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/delete`, {
        method: "DELETE",
        body: { id },
      });

      if (store.currentItem.id === id) store.newItem();
      removeItemFromArr(id, store.itemArray);
    })(null);
  },
  async getById(id: number) {
    withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/${id}`, {
        method: "GET",
      });
      if (response) {
        updateArray(response, store.itemArray);
        store.currentItem = response;
      }
    })(null);
  },
  async updateItemField(field: string, val, id: number) {
    withErrorHandling(store)(async (payload, store) => {
      const item = getByIdFromArray(id, store.itemArray);
      if (item === null) return;
      item[field] = val;
      const response = await $fetch(`/api/${store.$id}/field`, {
        method: "PATCH",
        body: { ...item, field },
      });
      if (response) {
        updateArray(response, store.itemArray);
        store.currentItem = response;
      }
    })(null);
  },
});

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

import { TablePagination, type ITablePagination } from "~/types/types";
export const setPagination = (store, pagination: ITablePagination) => {
  store.pagination = pagination;
};
export const setPaginationAndFilter = (store, pagination: ITablePagination, filter: string) => {
  store.pagination = pagination;
  store.filter = filter;
};
// export const createItem = async (store) => {
//   await withErrorHandling(store)(async (payload, store) => {
//     const response = await $fetch(`/api/${store.$id}/create`, {
//       method: "POST",
//       body: { ...store.currentItem },
//     });

//     updateArray(response, store.itemArray);
//     store.currentItem = response;
//   })(null);
// };
// export const updateItem = async (store) => {
//   withErrorHandling(store)(async (payload, store) => {
//     const response = await $fetch(`/api/${store.$id}/update`, {
//       method: "put",
//       body: { ...store.currentItem },
//     });

//     updateArray(response, store.itemArray);
//     store.currentItem = response;
//   })(null);
// };

// export const deleteItem = async (store, id: number) => {
//   withErrorHandling(store)(async (payload, store) => {
//     const response = await $fetch(`/api/${store.$id}/delete`, {
//       method: "delete",
//       body: { id },
//     });

//     if (store.currentItem.id === id) store.newItem();
//     removeItemFromArr(id, store.itemArray);
//   })(null);
// };

// export const getById = async (store, id: number) => {
//   withErrorHandling(store)(async (props, store) => {
//     const response = await $fetch(`/api/${store.$id}/${id}`, {
//       method: "GET",
//     });
//     if (response) {
//       updateArray(response, store.itemArray);
//       store.currentItem = response;
//     }
//   })(null);
// };

// export const getItemById = async (store, id: number) => {
//   const { data, pending, error, refresh } = await useAsyncData(`${store.$id}-getItemById`, () =>
//     $fetch(`/api/${store.$id}/${id}`, {
//       headers: useRequestHeaders(["cookie"]),
//     })
//   );

//   if (data.value) {
//     updateArray(data.value, store.itemArray);
//     store.currentItem = data.value;
//   }
//   if (error.value) {
//     throw createError({
//       statusCode: error.value.statusCode,
//       message: "Нет доступа к этому занятию", //"Этого занятия нет",
//     });
//   }
//   return { data, pending, error, refresh };
//   // return await withErrorHandling(store)(async (payload, store) => {})(null);
// };

// export const searchItems = async (store) => {
//   const { data, pending, error, refresh,  } = await useAsyncData(
//     `${store.$id}-searchItems`,
//     () =>
//       $fetch(`/api/${store.$id}/search`, {
//         query: { filter: store.filter, ...store.pagination },
//       }),
//     { watch: [store.pagination, ...store.filter] }
//   );

//   if (data.value) {
//     store.itemArray = data.value.result;
//     store.pagination.rowsNumber = data.value.totalCount;
//   }
//   return { data, pending, error, refresh,  };
//   // return withErrorHandling(store)(async (payload, store) => {})(null);
// };

// export const fetchAll = async (store) => {
//   return withErrorHandling(store)(async (payload, store) => {
//     const { data, pending, error, refresh } = await useAsyncData(`${store.$id}-fetchAll`, () =>
//       $fetch(`/api/${store.$id}/all`, {
//         // headers: useRequestHeaders(["cookie"]),
//       })
//     );

//     if (data.value) {
//       store.itemArray = data.value;
//     }
//     return { data, pending, error, refresh };
//   })(null);
// };

// export const template = async (store, id: number) => {
//   withErrorHandling(store)(async (payload, store) => {

//   })(null);
// };
