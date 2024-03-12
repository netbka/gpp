<template>
  <q-btn-dropdown v-if="user" stretch flat icon="account_circle">
    <div class="row no-wrap q-pa-sm width-300">
      <div class="col">
        <div class="text-h6 q-mb-md">Профиль</div>
        <div>
          <NuxtLink to="/profile" class="">Редактировать</NuxtLink>
        </div>

        <div>
          <NuxtLink to="/training" class="">Мои планы</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/exercisetemplate" class="">Мои упражнения</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/workout" class="">К ОФП</NuxtLink>
        </div>
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="col-auto items-center">
        <q-avatar size="72px">
          <img :src="profile" />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">
          {{ store.currentProfile.firstName }} {{ store.currentProfile.lastName }}
        </div>

        <q-btn
          color="primary"
          label="Выход"
          push
          size="sm"
          v-close-popup
          @click="logout"
        />
      </div>
    </div>
  </q-btn-dropdown>

  <q-btn stretch flat label="Вход" v-else to="/login" />
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

// const name = computed(() => user.value?.user_metadata.full_name);
// const profile = computed(() => user.value?.user_metadata.avatar_url);
let profile = ref("");
const store = profileStore();
onMounted(async () => {
  await store.fetchCurrentUser();
  profile.value = await getProfile(store.currentProfile.user_id + ".jpeg");
});

const logout = async () => {
  const { error } = await auth.signOut();
  if (error) {
    console.error(error);
    return;
  }
  await navigateTo("/");
};
</script>

<style>
.nounderline {
  text-decoration: none !important;
}
.borders {
  border: 1px solid #000;
  padding: 1px;
  text-decoration: none !important;
}

.width-300 {
  width: 340px;
}
</style>
