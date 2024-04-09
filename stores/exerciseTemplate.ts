import { defineStore } from "pinia";
import { type ExerciseTemplate, TablePagination, type ITablePagination } from "~/types/types";
interface ExerciseTemplateStoreState {
  defaultItem: ExerciseTemplate;
  currentItem: ExerciseTemplate;
  itemArray: [];
  loading: boolean;
  rowsNumber: number;
  pagination: ITablePagination;
}
const baseUrl = "/api/exerciseTemplate/";
export const useExerciseTemplateStore = defineStore("ExerciseTemplateStore", {
  state: (): ExerciseTemplateStoreState => ({
    defaultItem: { id: null, name: "", description: "", descriptionShort: "", duration: 30, active: false, imageUrl: "", weight: 0, level: 1, public: false, exerciseTemplateMuscle: [] },
    currentItem: { id: null, name: "", description: "", descriptionShort: "", duration: 30, active: false, imageUrl: "", weight: 0, level: 1, public: false, exerciseTemplateMuscle: [] },
    itemArray: [],
    loading: false,
    rowsNumber: 0,
    pagination: new TablePagination().getAll(),
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },
    // getIimgUrl: (state) => {
    //   return state.currentItem.imageUrl;
    // },
    getCurrentItemId: (state) => {
      return state.currentItem.id;
    },
  },
  actions: {
    newExerciseTemplate() {
      this.currentItem = Object.assign({}, this.defaultItem);
      this.currentItem.name = "Новое упражннеие";
      this.currentItem.muscle = { name: "" };
      this.currentItem.exerciseTemplateMuscle = [];

      return this.currentItem;
    },
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async getById(id: number) {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch(baseUrl + id, {
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
    async ssrSearch() {
      withErrorHandling(this)(async (payload, store) => {
        const { data, pending, error } = await useFetch(baseUrl + "search", { query: this.pagination });

        if (data.value !== null) {
          this.itemArray = data.value.result;
          this.pagination.rowsNumber = data.value.totalCount;
        }
      })(null);
    },
    async search(filter: string) {
      withErrorHandling(this)(async (payload, store) => {
        const response = await $fetch(baseUrl + "search", {
          query: { filter: filter, ...this.pagination },
        });
        store.itemArray = response.result;
        this.pagination.rowsNumber = response.totalCount;
      })(null);
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
        this.currentItem.descriptionShort = getFirstWords(this.currentItem.description);
        console.log(this.currentItem.descriptionShort);
        const response = await $fetch(baseUrl + "update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      })(null);
    },
    async createCurrentItem() {
      withErrorHandling(this)(async (payload, store) => {
        this.currentItem.descriptionShort = getFirstWords(this.currentItem.description);
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

    // getGroupedArray() {
    //   return this.itemArray.reduce((groups, item) => {
    //     const group = groups[item.muscle.name] || [];
    //     group.push(item);
    //     groups[item.muscle.name] = group;
    //     return groups;
    //   }, {});
    // },
    // getGroupedArray() {
    //   const groups = this.itemArray.reduce((groups, item) => {
    //     const group = groups[item.muscle.name] || [];
    //     group.push(item);
    //     groups[item.muscle.name] = group;
    //     return groups;
    //   }, {});

    //   // Convert the groups object to an array of entries
    //   const groupEntries = Object.entries(groups);

    //   // Sort the group entries by item.muscle.id
    //   groupEntries.sort((a, b) => {
    //     const firstMuscleId = a[1][0].muscle.id;
    //     const secondMuscleId = b[1][0].muscle.id;
    //     return firstMuscleId - secondMuscleId;
    //   });

    //   // Convert the sorted array of entries back to an object
    //   const sortedGroups = Object.fromEntries(groupEntries);

    //   return sortedGroups;
    // },
  },
});
