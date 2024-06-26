import { fetch, refreshToken, shouldRefreshToken } from "../composables/api.js";
export const useClientCrud = <T>(store) => ({
  async createItem() {
    return await withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}`, {
        // headers: {
        //   Authorization: `Bearer ${storeuser.accesstoken}`,
        // },
        method: "POST",
        body: { ...store.currentItem },
      });

      if (response) {
        updateArray(response, store.itemArray);
        store.currentItem = response.entity;
        return true;
      } else {
        return false;
      }
    })(null);
  },
  async cloneItem(id: number, arr: any[]) {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}/clone`, {
        method: "POST",
        body: { id: id },
      });

      updateArray(response.entity, arr);
      //store.currentItem = response;
    })(null);
  },
  async getById(id: number) {
    withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}/${id}`, {
        method: "GET",
      });

      if (response.entity) {
        store.currentItem = response.entity;
        if (store.itemArray !== undefined) updateArray(response.entity, store.itemArray);
      }
    })(null);
  },
  async getItem() {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}`, {
        method: "GET",
      });

      if (response.entity) {
        store.currentItem = response.entity;
        if (store.itemArray !== undefined) updateArray(response.entity, store.itemArray);
      }
    })(null);
  },
  async fetchAll() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}`, {
        method: "GET",
      });

      if (response.entity.length > 0) store.itemArray = response.entity;
    })(null);
  },
  async updateItem() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}`, {
        method: "PUT",
        body: { ...store.currentItem },
      });
      //console.log("reponse", response.entity);
      if (store.itemArray !== undefined) updateArray(response.entity, store.itemArray);

      store.currentItem = response.entity;
    })(null);
  },
  async updateItemOwn() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}/own`, {
        method: "PUT",
        body: { ...store.currentItem },
      });

      if (store.itemArray !== undefined) updateArray(response.entity, store.itemArray);
      store.currentItem = response.entity;
    })(null);
  },
  async deleteItem(id: number, arr: any[]) {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await fetch(`/api/${store.$id}/${id}`, {
        method: "DELETE",
        //query: { id },
      });

      if (store.currentItem.id === id) store.resetCurrentItem();
      //removeItemFromArr(id, store.itemArray);

      if (arr) removeItemFromArr(id, arr);
    })(null);
  },

  async updateItemField(field: string, val: any, id: number, item, forceUpdateArray: boolean = true) {
    withErrorHandling(store)(async (payload, store) => {
      item = item ? item : getByIdFromArray(id, store.itemArray); //either provide item or find it from the array

      if (item === null) return;
      item[field] = val;
      const response = await fetch(`/api/${store.$id}`, {
        method: "PUT",
        body: { ...item, field },
      });
      if (response.entity && forceUpdateArray) {
        updateArray(response.entity, store.itemArray);
        store.currentItem = response.entity;
      }
    })(null);
  },
});

export const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    return await actionFn(payload, store);
  } catch (error) {
    return false;
    //console.error("Error in action:", error);
    //throw error;
  } finally {
    store.loading = false;
  }
};
