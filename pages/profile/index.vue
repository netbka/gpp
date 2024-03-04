<template>
  <div
    class="row justify-center items-start content-start q-mt-md shadow-2 q-pa-md q-mx-md"
  >
    <div class="col-12 col-sm">
      <div class="text-h6">Давайте познакомимся</div>
      <span class="text-caption">
        Расскажи о себе, а я постараюсь подобрать для тебя оптимальные тренировки
      </span>
    </div>
    <div class="col-12 col-sm">
      <ProfileForm></ProfileForm>
    </div>

    <!-- <q-card class="profile-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <ProfileAvatar></ProfileAvatar>
          </q-item-section>

          <q-item-section>
            <q-item-label
              >{{ store.currentProfile.firstName }}
              {{ store.currentProfile.lastName }}</q-item-label
            >
            <q-item-label caption>
              <span
                v-for="(item, index) in store.currentProfile.profilesSportType"
                :key="item.id"
              >
                {{ item.name }} {{}}
              </span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class="col-8">
           
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-4"> </q-card-section>
        </q-card-section>
      </q-card> -->
  </div>
</template>

<script setup>
definePageMeta({ auth: true });
import { useProfileStore } from "~/stores/profile";
const store = useProfileStore();
await store.fetchCurrentUser();

const user = useSupabaseUser();
const profile = computed(() => user.value?.user_metadata.avatar_url);
//console.log(store.currentProfile.speciality);

// const { data } = await useFetch("/api/user", {
//   method: "get",
// });
</script>

<style>
.profile-card {
  max-width: 800px;
}
.max-width-500 {
  max-width: 480px !important;
}

.max-width-240 {
  max-width: 240px !important;
}
</style>
