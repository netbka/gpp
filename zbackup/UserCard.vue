<template>
  <div v-if="user" class="rounded px-3 flex items-center space-x-3 shadow">
    <img class="rounded-full w-8" :src="getProfile(store.currentItem.user_id +
    ".jpeg")" />
    <div class="text-right">
      <div class="font-medium">
        {{ store.currentItem.firstName }} {{ store.currentItem.lastName }}
      </div>
      <!-- <button class="text-sm underline text-slate-500" @click="logout">Log out</button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
// const user = useSupabaseUser();
// const { auth } = useSupabaseClient();

// const name = computed(() => user.value?.user_metadata.full_name);
// const profile = computed(() => user.value?.user_metadata.avatar_url);

const store = profileStore();
await store.fetchCurrentUser();

const logout = async () => {
  const { error } = await auth.signOut();
  if (error) {
    console.error(error);
    return;
  }
  await navigateTo("/");
};
</script>

<style></style>
