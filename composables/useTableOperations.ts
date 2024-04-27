import { defineEmits } from "vue";
export function useUseTableOperations(store, emits) {
  const imageManager = useImageManager(store);
  //const crud = useSSRCrud(store);
  const crudClient = useClientCrud(store);
  //const emits = defineEmits(["onEditItem"]);

  const onEditItem = async (id) => {
    emits("onEditItem", id);
  };
  const onDeleteItem = async (id) => {
    await crudClient.deleteItem(id);
    await imageManager.deleteFileUsingStorage(id);
  };
  const onUpdateField = async (field, val, id) => {};

  return {
    onEditItem,
    onDeleteItem,
    onUpdateField,
  };
}
