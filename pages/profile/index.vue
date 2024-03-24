<template>
  <div
    class="row q-col-gutter-md justify-center items-start content-start q-mt-md shadow-2 q-pa-md q-mx-md"
  >
    <div class="col-12 col-sm">
      <div class="text-h6">Давайте познакомимся</div>
      <span class="text-caption">
        Расскажи о себе, а я постараюсь подобрать для тебя оптимальные тренировки
      </span>
      <div class="q-mt-md">
        <ProfileAvatar></ProfileAvatar>
      </div>
    </div>
    <div class="col-12 col-sm">
      <ProfileForm></ProfileForm>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ auth: true });

const store = profileStore();
const storeSportType = sportTypeStore();
onBeforeMount(async () => {
  await store.fetchCurrentUser();
  await storeSportType.fetchAll();
});

// const user = useSupabaseUser();
// const profile = computed(() => user.value?.user_metadata.avatar_url);
//console.log(store.currentProfile.speciality);

// const { data } = await useFetch("/api/user", {
//   method: "get",
// });
</script>

<style></style>
