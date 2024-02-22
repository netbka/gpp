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
  if (!store.currentProfile.avatarPath && profile.value.length > 0) {
    var url = profile.value;
    var fileName = store.currentProfile.user_id + ".jpeg";
    const fileToUpload = await urlToFile(url, fileName);
    // let { error: uploadError } = await supabase.storage
    //   .from("avatar")
    //   .upload(fileName, fileToUpload, {
    //     upsert: true,
    //   });
    // if (uploadError) console.log("error", uploadError);
    updateUserAvatar(fileToUpload, fileName);
    store.currentProfile.avatarPath = fileName;
    store.updateCurrentUser();
    // const { data, pending, error, refresh } = await useFetch("/api/profile", {
    //   method: "post",
    //   body: { ...store.currentProfile },
    // });
  }
  // if (uploadError) throw uploadError;
};

// const getProfile = async () => {
//   try {
//     var fileName = store.currentProfile.user_id + ".jpeg";
//     const { data, error } = await supabase.storage.from("avatar").getPublicUrl(fileName);

//     if (error) {
//       console.error("Error getting public URL:", error);
//       return;
//     }
//     //console.log(data);
//     src.value = data.publicUrl;
//   } catch (error) {
//     console.log(error.message);
//   } finally {
//   }
// };
</script>

<style></style>
