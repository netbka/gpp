import { defineStore } from "pinia";
import { type IExerciseTemplate, ExerciseTemplate } from "~/types/types";
import { TablePagination, type ITablePagination } from "~/types/ITablePagination";
interface ExerciseTemplateStoreState {
  currentItem: IExerciseTemplate;
  itemArray: [];
  loading: boolean;
  rowsNumber: number;
  pagination: ITablePagination;
  filter: string;
}
const baseUrl = "/api/exerciseTemplate/";
export const useExerciseTemplateStore = defineStore("exerciseTemplate", {
  state: (): ExerciseTemplateStoreState => ({
    currentItem: new ExerciseTemplate("").getAll(),
    itemArray: [],
    loading: false,
    rowsNumber: 0,
    pagination: new TablePagination().getAll(),
    filter: "",
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
    newItem(val = "Новое упражннеие") {
      this.currentItem = new ExerciseTemplate(val).getAll();
      return this.currentItem;
    },
    async getById(id: number) {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch(`/api/${store.$id}/${id}`, {
          method: "get",
        });
        if (response) {
          updateArray(response, this.itemArray);
          this.currentItem = response;
        }
      })(null);
    },
    setPagination(pagination: ITablePagination) {
      this.pagination = pagination;
    },
    // async search(filter: string) {
    //   var x = searchItems(this, filter);
    //   console.log(x);
    // },
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

        if (this.currentItem.id === id) this.newItem();
        removeItemFromArr(id, this.itemArray);
      })(null);
    },
  },
});
