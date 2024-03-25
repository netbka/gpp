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
        <ProfileCropper ref="cropperDialog" @onHide="onHide"></ProfileCropper>
      </div>
    </div>
    <div class="col-12 col-sm">
      <div class="row q-mb-sm">
        <div class="col-12">
          <q-skeleton type="QCheckbox" v-show="!avatar.length > 0" />
          <q-avatar v-show="avatar.length > 0" size="64px">
            <img :src="avatar" alt="avatar" />
            <q-badge
              floating
              color="transparent"
              @click="openCropper"
              class="cursor-pointer"
            >
              <q-icon name="photo_camera" color="grey-5" size="sm" class="q-ml-xs" />
            </q-badge>
          </q-avatar>
        </div>
      </div>
      <ProfileForm></ProfileForm>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ auth: true });
const cropperDialog = ref(null);
const store = profileStore();
const storeSportType = sportTypeStore();
let avatar = ref("");

onBeforeMount(async () => {
  await store.fetchCurrentUser();
  await storeSportType.fetchAll();
  await updateProfile();
});
const openCropper = () => {
  cropperDialog.value.show();
};
const onHide = async () => {
  //avatar.value = "";
  await updateProfile();
};

const updateProfile = async () => {
  avatar.value =
    (await getProfile(store.currentProfile.user_id)) + "?" + new Date().getTime();
};
</script>

<style>
.q-badge--floating {
  position: absolute;
  top: 42px;
  right: -22px;
  cursor: inherit;
}
</style>
