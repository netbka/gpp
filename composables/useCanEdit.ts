//import { watch } from "vue";
export function useCanEditDelete(store) {
  const { currentUserId } = useAuthUser();

  const userIsequal = ref(false);
  const canEditDelete = computed(() => userIsequal.value);

  watch(
    () => store.getCurrentItem,
    (val) => {
      userIsequal.value = val.user_id === currentUserId();
      console.log(val.user_id === currentUserId());
    },

    { deep: true, immediate: true }
  );
  return { canEditDelete };
}
