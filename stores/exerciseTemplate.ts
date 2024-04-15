import { defineStore } from "pinia";
import { type IExerciseTemplate, ExerciseTemplate } from "~/types/types";
import { TablePagination, type ITablePagination } from "~/types/ITablePagination";
interface ExerciseTemplateStoreState {
  //defaultItem: ExerciseTemplate;
  currentItem: IExerciseTemplate;
  itemArray: [];
  loading: boolean;
  rowsNumber: number;
  pagination: ITablePagination;
}
const baseUrl = "/api/exerciseTemplate/";
export const useExerciseTemplateStore = defineStore("exerciseTemplate", {
  state: (): ExerciseTemplateStoreState => ({
    //defaultItem: { id: null, name: "", description: "", descriptionShort: "", duration: 30, active: false, imageUrl: "", weight: 0, level: 1, public: false, exerciseTemplateMuscle: [] },
    //currentItem: { id: null, name: "", description: "", descriptionShort: "", duration: 30, active: false, imageUrl: "", weight: 0, level: 1, public: false, exerciseTemplateMuscle: [] },
    currentItem: new ExerciseTemplate("").getAll(),
    itemArray: [],
    loading: false,
    rowsNumber: 0,
    pagination: new TablePagination().getAll(),
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },
    getCurrentItemId: (state) => {
      return state.currentItem.id;
    },
  },
  actions: {
    newItem() {
      this.currentItem = new ExerciseTemplate("Новое упражннеие").getAll();
      return this.currentItem;
    },
    resetCurrentItem() {
      this.currentItem = new ExerciseTemplate("").getAll();
      //this.currentItem = Object.assign({}, this.defaultItem);
    },
    async getById(id: number) {
      await getItemById(this, id);
    },
    setPagination(pagination: ITablePagination) {
      this.pagination = pagination;
    },
    async ssrSearch() {
      searchItems(this, "");
      // withErrorHandling(this)(async (payload, store) => {
      //   const { data, pending, error } = await useFetch(baseUrl + "search", { query: this.pagination });

      //   if (data.value !== null) {
      //     this.itemArray = data.value.result;
      //     this.pagination.rowsNumber = data.value.totalCount;
      //   }
      // })(null);
    },
    async search(filter: string) {
      searchItems(this, filter);
      // withErrorHandling(this)(async (payload, store) => {
      //   const response = await $fetch(baseUrl + "search", {
      //     query: { filter: filter, ...this.pagination },
      //   });
      //   store.itemArray = response.result;
      //   this.pagination.rowsNumber = response.totalCount;
      // })(null);
    },
    async fetchAll() {
      withErrorHandling(this)(async (payload, store) => {
        const { data } = await useFetch(baseUrl + "all", {
          method: "get",
        });

        if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      })(null);
    },

    async fetchMyAndPublic() {
      withErrorHandling(this)(async (payload, store) => {
        const { data } = await useFetch(baseUrl + "myandpublic", {
          method: "get",
        });

        if (data.value !== null && data.value.length > 0) {
          this.itemArray = data.value;
        }
      })(null);
    },

    async updateCurrentItem() {
      withErrorHandling(this)(async (payload, store) => {
        //this.currentItem.descriptionShort = getFirstWords(this.currentItem.description);

        const response = await $fetch(baseUrl + "update", {
          method: "put",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      })(null);
    },
    async createCurrentItem() {
      withErrorHandling(this)(async (payload, store) => {
        //this.currentItem.descriptionShort = getFirstWords(this.currentItem.description);
        const response = await $fetch(baseUrl + "create", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      })(null);
    },

    async updateItemField(field: String, val, id: number) {
      withErrorHandling(this)(async (payload, store) => {
        const item = getById(id, this.itemArray);
        if (item === null) return;
        item[field] = val;
        const response = await $fetch(baseUrl + "field", {
          method: "post",
          body: { ...item, field },
        });
      })(null);
    },

    async deleteItem(id) {
      withErrorHandling(this)(async (payload, store) => {
        const response = await $fetch(baseUrl + "delete", {
          method: "delete",
          body: { id },
        });

        if (this.currentItem.id === id) this.resetCurrentItem();
        removeItemFromArr(id, this.itemArray);
      })(null);
    },
  },
});
