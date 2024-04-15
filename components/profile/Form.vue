<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="">
      <div class="row">
        <div class="col-12">
          <q-input
            bg-color="white"
            dense
            outlined
            v-model="store.currentProfile.firstName"
            label="Имя *"
            :rules="[(val) => !!val || 'Нужно указать значение']"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-input
            dense
            outlined
            v-model="store.currentProfile.lastName"
            label="Фамилия"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
          />
        </div>
      </div>
      <div class="row q-my-md">
        <div class="col-12">
          <InputSelectSportType
            :selectedIds="store.currentProfile.profilesSportType"
            :loading="store.loading"
          ></InputSelectSportType>
        </div>
      </div>
      <q-separator />
      <div class="row q-pt-md">
        <div class="col-12 text-right">
          <q-btn
            label="Сохранить"
            size="sm"
            type="submit"
            color="secondary"
            outline
            :loading="store.loading"
            class="width-150"
            :disable="store.loading"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Сохраняю...
            </template>
          </q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
// import { useQuasar } from "quasar";
// const $q = useQuasar();

import { useProfileStore } from "~/stores/profile";
const store = useProfileStore();

import { useSportTypeStore } from "~/stores/sportType";
const storeSportType = useSportTypeStore();

const loading = ref(false);
onBeforeMount(async () => {});
onMounted(async () => {});

const onSubmit = async () => {
  store.currentProfile.newItems = storeSportType.currentItem;
  await store.updateCurrentUser();

  store.currentProfile.profilesSportType = storeSportType.currentItem;
};

const onReset = () => {
  //console.log("Reset");
};
</script>

<style scoped>
.width-150 {
  min-width: 150px;
}
</style>
