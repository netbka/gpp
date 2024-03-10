<template>
  <q-btn-dropdown v-if="user" stretch flat icon="account_circle">
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">Профиль</div>
        <NuxtLink to="/profile" class="btn btn-rounded">Редактировать</NuxtLink>
        <NuxtLink to="/exercisetemplate" class="btn btn-rounded">Мои занятия</NuxtLink>
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column items-center">
        <q-avatar size="72px">
          <img :src="profile" />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">{{ name }}</div>

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

const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);

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
</style>
