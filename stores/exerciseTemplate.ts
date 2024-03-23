import { defineStore } from "pinia";
import { type ExerciseTemplate } from "~/types/types";
interface ExerciseTemplateStoreState {
  defaultItem: ExerciseTemplate;
  //items: ExerciseTemplate[];
  currentItem: ExerciseTemplate;
  itemArray: [];
  //itemArray: reacive<ExerciseTemplate[]>;
  //activeExerciseTemplate: ExerciseTemplate | null;
}
const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    await actionFn(payload, store);
  } catch (error) {
    console.error("Error in action:", error);
    // optionally, you can handle the error or display an error message to the user
  } finally {
    store.loading = false;
  }
};
export const useExerciseTemplateStore = defineStore("ExerciseTemplateStore", {
  state: (): ExerciseTemplateStoreState => ({
    defaultItem: { id: null, name: "", description: "", duration: 30, active: false, imageUrl: "", weight: 0, public: false, muscleId: 0, muscle: null },
    currentItem: { id: null, name: "", description: "", duration: 30, active: false, imageUrl: "", weight: 0, public: false, muscleId: 0, muscle: null },
    itemArray: [],
    loading: false,
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

      return this.currentItem;
    },
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/exerciseTemplate/all", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      //console.log(this.itemArray);
    },

    async fetchMyAndPublic() {
      const { data } = await useFetch("/api/exerciseTemplate/myandpublic", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) {
        this.itemArray = data.value;
        return data.value;
      }
      return null;
      //console.log(this.itemArray);
    },

    async updateCurrentItem() {
      withErrorHandling(this)(async (payload, store) => {
        const response = await $fetch("/api/exerciseTemplate/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      })(null);
    },
    async createCurrentItem() {
      withErrorHandling(this)(async (payload, store) => {
        const response = await $fetch("/api/exerciseTemplate/create", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      })(null);
    },

    async updateItemField(field: String, val, id: number) {
      try {
        const item = getById(id, this.itemArray);
        if (item === null) return;
        item[field] = val;
        const response = await $fetch("/api/exerciseTemplate/field", {
          method: "post",
          body: { ...item, field },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(id) {
      const response = await $fetch("/api/exerciseTemplate/delete", {
        method: "delete",
        body: { id },
      });
      console.log(this.currentItem.id === id);
      if (this.currentItem.id === id) this.resetCurrentItem();
      removeItemFromArr(id, this.itemArray);
    },
    // getGroupedArray() {
    //   return this.itemArray.reduce((groups, item) => {
    //     const group = groups[item.muscle.name] || [];
    //     group.push(item);
    //     groups[item.muscle.name] = group;
    //     return groups;
    //   }, {});
    // },
    getGroupedArray() {
      const groups = this.itemArray.reduce((groups, item) => {
        const group = groups[item.muscle.name] || [];
        group.push(item);
        groups[item.muscle.name] = group;
        return groups;
      }, {});

      // Convert the groups object to an array of entries
      const groupEntries = Object.entries(groups);

      // Sort the group entries by item.muscle.id
      groupEntries.sort((a, b) => {
        const firstMuscleId = a[1][0].muscle.id;
        const secondMuscleId = b[1][0].muscle.id;
        return firstMuscleId - secondMuscleId;
      });

      // Convert the sorted array of entries back to an object
      const sortedGroups = Object.fromEntries(groupEntries);

      return sortedGroups;
    },
  },
});
