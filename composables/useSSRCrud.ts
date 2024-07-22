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
  if (pagination) store.pagination = pagination;
  if (filter !== null && filter !== undefined) store.filter = filter;
  //store.filter = filter;
};
interface ItemResponse<T> {
  data: T;
  pending: boolean;
  error: Error | null;
  refresh: () => void;
}
import { fetch, refreshToken, shouldRefreshToken } from "../composables/api.js";
export const useSSRCrud = <T>(store) => ({
  async fetchAll(url: string = ""): Promise<ArrayResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<TableResponse<T>>(`${store.$id}-fetchAll`, () => fetch(`/api/${store.$id}/${url}`));
    store.itemArray = data.value.entity;
    return { data, pending, error, refresh };
  },
  async searchItem(): Promise<TableResponse<T>> {
    //console.log("seatrch");
    try {
      const { data, pending, error, refresh } = await useAsyncData<TableResponse<T>>(
        `${store.$id}-searchItems`,
        () =>
          fetch(`/api/${store.$id}/search`, {
            query: { filter: store.filter, ...store.pagination },
            // headers: {
            //   Authorization: `Bearer ${store.accesstoken}`,
            // },
          }),
        { watch: [store.pagination, ...store.filter], immediate: false }
      );

      if (data.value) {
        store.itemArray = data.value.entity;
        store.pagination.rowsNumber = data.value.count;
        console.log(store.filter);
        //store.itemArray = flatMuscle(store.itemArray);
      }

      return { data, pending, error, refresh };
    } catch (err) {
      console.log(err);
    }
  },

  async getItemById(id: number): Promise<ItemResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<ItemResponse<T>>(`${store.$id}-getItemById`, () =>
      fetch(`/api/${store.$id}/${id}`, {
        //headers: useRequestHeaders(["cookie"]),
      })
    );
    //console.log(error);

    if (data.value.entity) {
      updateArray(data.value.entity, store.itemArray);

      store.currentItem = data.value.entity;
    }
    if (error.value) {
      console.log("from client", error.value);
      throw createError({
        statusCode: error.value.statusCode,
        message: "Нет доступа к этому объекту",
      });
    }
    return { data, pending, error, refresh };
  },
  async getItem(): Promise<ItemResponse<T>> {
    const { data, pending, error, refresh } = await useAsyncData<ItemResponse<T>>(`${store.$id}-getItemById`, () => fetch(`/api/${store.$id}`, {}));

    if (data.value.entity) {
      store.currentItem = data.value.entity;
      if (store.itemArray !== undefined) updateArray(data.value.entity, store.itemArray);
    }
    if (error.value) {
      //console.log("from client", error.value);
      throw createError({
        statusCode: error.value.statusCode,
        message: error.value.data.message ? error.value.data.message : "Нет доступа к этому объекту",
      });
    }
    return { data, pending, error, refresh };
  },
});
