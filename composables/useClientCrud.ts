export const useClientCrud = <T>(store) => ({
  async createItem() {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}`, {
        method: "POST",
        body: { ...store.currentItem },
      });

      if (response) {
        updateArray(response, store.itemArray);
        store.currentItem = response;
        return true;
      } else {
        return false;
      }
    })(null);
  },
  async cloneItem(id: number, arr: any[]) {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/clone`, {
        method: "POST",
        body: { id: id },
      });

      updateArray(response, arr);
      //store.currentItem = response;
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
  async fetchAll() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}`, {
        method: "GET",
      });

      if (response.length > 0) store.itemArray = response;
    })(null);
  },
  async updateItem() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}`, {
        method: "PUT",
        body: { ...store.currentItem },
      });

      if (store.itemArray !== undefined) updateArray(response, store.itemArray);
      store.currentItem = response;
    })(null);
  },
  async updateItemOwn() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/own`, {
        method: "PUT",
        body: { ...store.currentItem },
      });

      if (store.itemArray !== undefined) updateArray(response, store.itemArray);
      store.currentItem = response;
    })(null);
  },
  async deleteItem(id: number, arr: any[]) {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}`, {
        method: "DELETE",
        body: { id },
      });

      if (store.currentItem.id === id) store.resetCurrentItem();
      //removeItemFromArr(id, store.itemArray);

      if (arr) removeItemFromArr(id, arr);
    })(null);
  },

  async updateItemField(field: string, val: any, id: number, item, updateArray: boolean = true) {
    withErrorHandling(store)(async (payload, store) => {
      item = item ? item : getByIdFromArray(id, store.itemArray); //either provide item or find it from the array

      if (item === null) return;
      item[field] = val;
      const response = await $fetch(`/api/${store.$id}`, {
        method: "PATCH",
        body: { ...item, field },
      });
      if (response && updateArray) {
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
    return false;
    //console.error("Error in action:", error);
    //throw error;
  } finally {
    store.loading = false;
  }
};
