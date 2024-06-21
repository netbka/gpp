import { defineEmits } from "vue";
export function useUseTableOperations(store, emits, data) {
  const imageManager = useImageManager(store);
  //const crud = useSSRCrud(store);
  const crudClient = useClientCrud(store);
  //const emits = defineEmits(["onEditItem"]);

  const onEditItem = async (id: number) => {
    emits("onEditItem", id);
  };
  const onDeleteItem = async (id: number) => {
    await crudClient.deleteItem(id, store.itemArray);
    //await imageManager.deleteFileUsingStorage(String(id));
  };

  const onCloneItem = async (id: number) => {
    await crudClient.cloneItem(id, store.itemArray);
    store.pagination.rowsNumber = store.pagination.rowsNumber + 1;
  };
  const onUpdateField = async (field: string, val: any, id: number) => {};

  return {
    onCloneItem,
    onEditItem,
    onDeleteItem,
    onUpdateField,
  };
}
