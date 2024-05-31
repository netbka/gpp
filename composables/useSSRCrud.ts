interface ArrayResponse<T> {
  data: T[];
}
interface TableResponse<T> {
  data: {
    result: T[];
    totalCount: number;
  };
}
import { type ITablePagination } from "~/types/types";
export const setPagination = (store, pagination: ITablePagination) => {
  store.pagination = pagination;
};
export const setPaginationAndFilter = (store, pagination: ITablePagination, filter: string) => {
  //store.pagination = pagination;
  store.filter = filter;
};
interface ItemResponse<T> {
  data: T;
  pending: boolean;
  error: Error | null;
  refresh: () => void;
}
export const useSSRCrud = <T>(store) => ({
  async fetchAll(url: string = ""): Promise<ArrayResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<TableResponse<T>>(`${store.$id}-fetchAll`, () => $fetch(`/api/${store.$id}/${url}`));
    store.itemArray = data.value;
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
    //console.log(error);
    if (data.value) {
      updateArray(data.value, store.itemArray);
      store.currentItem = data.value;
    }
    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        message: "Нет доступа к этому объекту",
      });
    }
    return { data, pending, error, refresh };
  },
  async getItem(): Promise<ItemResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<ItemResponse<T>>(`${store.$id}-getItemById`, () => $fetch(`/api/${store.$id}`, {}));

    if (data.value) {
      store.currentItem = data.value;
      if (store.itemArray !== undefined) updateArray(data.value, store.itemArray);
    }
    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        message: "Нет доступа к этому объекту",
      });
    }
    return { data, pending, error, refresh };
  },
});
