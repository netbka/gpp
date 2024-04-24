export const useClientCrud = <T>(store) => ({
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
      const response = await $fetch(`/api/${store.$id}/all`, {
        method: "GET",
      });
      if (response.length > 0) this.itemArray = response;
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
  async updateItemOwn() {
    withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/own`, {
        method: "PUT",
        body: { ...store.currentItem },
      });

      if (store.itemArray !== undefined)  updateArray(response, store.itemArray);
      store.currentItem = response;
    })(null);
  },
  async deleteItem(id: number) {
    await withErrorHandling(store)(async (payload, store) => {
      const response = await $fetch(`/api/${store.$id}/delete`, {
        method: "DELETE",
        body: { id },
      });

      if (store.currentItem.id === id) store.resetCurrentItem();
      removeItemFromArr(id, store.itemArray);
    })(null);
  },

  async updateItemField(field: string, val: any, id: number) {
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
