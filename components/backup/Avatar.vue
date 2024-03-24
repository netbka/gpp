<template>
  <div>
    <q-avatar>
      <img :src="src" />
    </q-avatar>
  </div>
</template>

<script lang="ts" setup>
import { urlToFile, getProfile } from "~/composables/profileUpd";
import { useProfileStore } from "~/stores/profile";
const user = useSupabaseUser();
const profile = computed(() => user.value?.user_metadata.avatar_url);
const store = useProfileStore();
const supabase = useSupabaseClient();
const src = ref("");
onMounted(async () => {
  await updateNewAvatar();
  src.value = await getProfile(store.currentProfile.user_id + ".jpeg");
});

const updateNewAvatar = async () => {
  if (!store.currentProfile.avatarPath && profile.value.length > 6) {
    var url = profile.value;
    var fileName = store.currentProfile.user_id + ".jpeg";
    const fileToUpload = await urlToFile(url, fileName);

    updateUserAvatar(fileToUpload, fileName);
    store.currentProfile.avatarPath = fileName;
    store.updateCurrentUser();
  }
};
</script>

<style></style>
