<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="">
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-input
            filled
            v-model="store.currentProfile.firstName"
            label="Your name *"
            :loading="loading"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col-6">
          <q-input
            filled
            v-model="store.currentProfile.lastName"
            label="Your last name *"
          />
        </div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-12">
          <div class="text-bold">Career summary</div>
          <BaseTextareatool
            v-model="store.currentProfile.biography"
            @update="updateBio"
          ></BaseTextareatool>
        </div>
      </div>
      <div class="row q-py-sm">
        <div class="col-12">
          <BaseCalendar></BaseCalendar>
        </div>
      </div>
      <div class="row q-py-sm">
        <div class="col-12">
          <BaseCitySelect
            @update="updateCity"
            v-model="store.currentProfile.city"
          ></BaseCitySelect>
        </div>
      </div>
      <div class="row q-col-gutter-sm q-py-sm">
        <div class="col-6">
          <BaseMedSpec :selectedSpecId="store.currentProfile.specialityId"></BaseMedSpec>
        </div>
        <div class="col-6">
          <BaseMedSubSpec
            :selectedSubSpecIds="store.currentProfile.profilesMedicalSubSpecialities"
          ></BaseMedSubSpec>
        </div>
      </div>
      <div class="row q-pt-md">
        <div class="col-12">
          <q-btn label="Submit" type="submit" color="secondary" />
          <q-btn label="Reset" outline type="reset" color="primary" class="q-ml-sm" />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
const $q = useQuasar();

import { useProfileStore } from "~/stores/profile";
const store = useProfileStore();

import { useMedSpecStore } from "~/stores/medspec";

const storeMedSpec = useMedSpecStore();

const loading = ref(false);
onMounted(async () => {
  // if (!store.currentProfile.avatarPath && event.context.user?.user_metadata?.avatar_url.length > 0) {
  //     console.log();
  //     var url = event.context.user.user_metadata.avatar_url;
  //     var imagePath = event.context.user.id;
  //     const r = await urltofile(url, imagePath);
  //     let { error: uploadError } = await supabase.storage.from("avatar").upload("", r.name);
  //     if (uploadError) throw uploadError;
  //     console.log(r);
  //   }
});

const updateBio = (val) => {
  store.currentProfile.biography = val;
};
const updateCity = (val) => {
  store.currentProfile.city = val ? val.city_name_en : "";
};

const updateBirthDay = (val) => {
  store.currentProfile.birthDay = val;
};

// store.currentProfile.biography

const onSubmit = async () => {
  //console.log(storeMedSpec.currentItem);
  //console.log(storeMedSpec.currentSubItem);
  loading.value = true;
  store.currentProfile.specialityId = storeMedSpec.currentItem.id;

  store.currentProfile.subSpecAdd = storeMedSpec.currentSubItem;
  await store.updateCurrentUser();
  // const { data, pending, error, refresh } = await $fetch("/api/profile", {
  //   method: "post",
  //   body: { ...store.currentProfile },

  // });
  store.currentProfile.profilesMedicalSubSpecialities = storeMedSpec.currentSubItem;
  loading.value = false;
  $q.notify({
    type: "positive",
    message: "Data updated",
  });
};

const onReset = () => {
  console.log("Reset");
};
</script>
