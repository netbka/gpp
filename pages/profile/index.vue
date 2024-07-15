<template>
  <div>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <ErrorBoundary :error="error" />
      </template>
      <div
        class="row q-col-gutter-md justify-center items-start content-start shadow-2 q-pa-md q-mx-md"
      >
        <div class="col-12 col-sm">
          <div class="text-h6">{{ $t("profile.header") }}</div>
          <span class="text-caption">
            {{ $t("exercisprofiletemplate.heading") }}
          </span>
          <div class="q-mt-md">
            <ClientOnly>
              <ProfileCropper ref="cropperDialog" @onHide="onHide"></ProfileCropper>
            </ClientOnly>
          </div>
        </div>
        <div class="col-12 col-sm">
          <div class="row q-mb-sm">
            <div class="col-4">
              <q-img
                :src="avatar"
                fit="scale-down"
                class="items-start image-exercise"
                style="max-width: 100%; height: 64px; left: 1px"
                position="0 0"
              >
                <div class="image-exercise-container cursor-pointer">
                  <q-icon
                    @click="openCropper"
                    name="photo_camera"
                    color="yellow-10"
                    size="sm"
                    class="q-ml-xs icon-exercise"
                  />
                </div>
              </q-img>
            </div>
          </div>

          <ProfileForm></ProfileForm>
        </div>
      </div>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup>
definePageMeta({ auth: true });
const cropperDialog = ref(null);
const avatar = ref("");
const store = profileStore();
const { getAvatar } = useImageManager(store);

onBeforeMount(async () => {
  avatar.value = await getAvatar();
});

const openCropper = () => {
  cropperDialog.value.show();
};
const onHide = async () => {
  avatar.value = await getAvatar();
  //avatar.value = "";
  //await updateProfile();
};

watch(
  () => store.currentItem.id,
  async (val) => {
    //avatar.value = (await getProfile(val)) + "?" + new Date().getTime();
    if (val !== null && val.length > 0) avatar.value = await getAvatar();
  },
  { immediate: true }
);
</script>

<style scoped>
.q-badge--floating {
  position: absolute;
  top: 42px;
  right: -22px;
  cursor: inherit;
}
.change-image {
  position: absolute;
  bottom: 10px;
  right: 16px;
  cursor: inherit;
  z-index: 99;
}
.image-exercise {
}
.image-exercise-container {
  left: 48px;
  bottom: 0;
  z-index: 1;
  background: rgb(229 235 238) !important;
  max-width: 16px;
  max-height: 16px;
}
.icon-exercise {
  position: absolute;
  right: 0;
  bottom: 0;
}
.q-img__content > div {
  padding: 12px !important;
}
</style>
