<template>
  <div></div>
</template>

<script setup>
definePageMeta({ auth: true });
import { useProfileStore } from "~/stores/profile";
const store = useProfileStore();
await store.fetchCurrentUser();

const user = useSupabaseUser();
const profile = computed(() => user.value?.user_metadata.avatar_url);
//console.log(store.currentProfile.speciality);

const step = ref(1);

// const { data } = await useFetch("/api/user", {
//   method: "get",
// });
</script>

<style></style>
