import { defineStore } from "pinia";

export const useCrudStore = (id: string) => {
  const store = defineStore(id, {
    state: () => ({
      email: "",
    }),
  });
  return store;
};
// export const useCrudStore = defineStore("id", {
//   state: () => ({
//     email: "aa",
//   }),
// });

//import { BaseIdName, type IIdName } from "~/types/types";
//  const store = defineStore(resource, {
//    state: () => ({
//      currentItem: {},
//      itemArray: [],
//      loading: false,
//      error: null,
//      rowsNumber: 1,
//      pagination: new TablePagination().getAll(),
//    }),
//    getters: {
//      getItemArray: (state) => {
//        return state.itemArray;
//      },
//      getCurrentItemId: (state) => {
//        return state.currentItem.id;
//      },
//    },
//    actions: {
//      newItem(val) {
//        //var x extends T = new T(val);
//        //let x = new (T as any)(val);
//        this.$patch({ currentItem: val });
//        return this.currentItem;
//      },
//      async fetchAll() {
//        this.loading = true;
//        this.error = null;
//        try {
//          const response = await fetch(`/api/${resource}`);
//          const data = await response.json();
//          this.itemArray = data as T[]; // Cast data to resource interface
//        } catch (error) {
//          this.error = error;
//        } finally {
//          this.loading = false;
//        }
//      },
//      async ssrSearch() {
//        withErrorHandling(this)(async (payload, store) => {
//          const { data, pending, error } = await useFetch(`/api/${resource}/search`, { query: this.pagination });

//          if (data.value !== null) {
//            this.itemArray = data.value.result;
//            this.pagination.rowsNumber = data.value.totalCount;
//          }
//        })(null);
//      },
//      async create(newItem: T) {
//        // newItem has type T (resource interface)
//        this.loading = true;
//        this.error = null;
//        try {
//          const response = await fetch(`/api/${resource}`, {
//            method: "POST",
//            body: JSON.stringify(newItem),
//          });
//          const data = await response.json();
//          this.items.push(data as T);
//        } catch (error) {
//          this.error = error;
//        } finally {
//          this.loading = false;
//        }
//      },
//      async update(id: number, updatedItem: T) {
//        // updateItem has type T
//        this.loading = true;
//        this.error = null;
//        try {
//          const response = await fetch(`/api/${resource}/${id}`, {
//            method: "PUT",
//            body: JSON.stringify(updatedItem),
//          });
//          const data = await response.json();
//          const index = this.items.findIndex((item) => item.id === id);
//          if (index !== -1) {
//            this.items.splice(index, 1, data as T);
//          }
//        } catch (error) {
//          this.error = error;
//        } finally {
//          this.loading = false;
//        }
//      },
//      async delete(id: number) {
//        this.loading = true;
//        this.error = null;
//        try {
//          await fetch(`/api/${resource}/${id}`, {
//            method: "DELETE",
//          });
//          const index = this.items.findIndex((item) => item.id === id);
//          if (index !== -1) {
//            this.items.splice(index, 1);
//          }
//        } catch (error) {
//          this.error = error;
//        } finally {
//          this.loading = false;
//        }
//      },
//    },
//  });
