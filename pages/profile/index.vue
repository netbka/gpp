<template>
  <div>
    <q-card class="my-card" flat bordered>
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
            {{ store.currentProfile.speciality?.name }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          <q-tabs v-model="tab" vertical class="text-primary">
            <q-tab name="profile" icon="contact_mail" label="Profile" />
            <q-tab name="account" icon="account_box" label="Account" />
            <q-tab name="preferences" icon="movie" label="Preferences" />
          </q-tabs>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-10">
          <q-tab-panels v-model="tab" swipeable vertical>
            <q-tab-panel name="account">
              <div class="q-mb-md">Account</div>
            </q-tab-panel>
            <q-tab-panel name="profile">
              <div class="q-mb-md"><Profile></Profile></div>
            </q-tab-panel>
            <q-tab-panel name="preferences">
              <div class="q-mb-md">Preferences</div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
definePageMeta({ auth: true });
import { useProfileStore } from "~/stores/profile";
const user = useSupabaseUser();
const profile = computed(() => user.value?.user_metadata.avatar_url);
import { useMedSpecStore } from "~/stores/medspec";
const storeMedSpec = useMedSpecStore();
const store = useProfileStore();
await store.fetchCurrentUser();
//console.log(store.currentProfile.speciality);

const tab = ref("profile");

// const { data } = await useFetch("/api/user", {
//   method: "get",
// });
</script>

<style></style>
