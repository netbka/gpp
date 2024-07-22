<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="">
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-input
            bg-color="white"
            dense
            outlined
            v-model="store.currentItem.firstName"
            :label="$t('components.profile.form.firstName')"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
            maxlength="16"
            counter
          />
        </div>
        <div class="col-6">
          <q-input
            dense
            outlined
            v-model="store.currentItem.lastName"
            :label="$t('components.profile.form.lastName')"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
            maxlength="16"
            counter
          />
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col-12">
          <InputSelectSportType
            :selectedIds="store.currentItem.sportType"
            :loading="store.loading"
          ></InputSelectSportType>
        </div>
      </div>
      <q-separator />
      <div class="row q-pt-md">
        <div class="col-12 text-right">
          <q-btn
            :label="$t('components.profile.form.save')"
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
              {{ $t("components.profile.form.saving") }}...
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
const storeSportType = useSportTypeStore();
const crud = useSSRCrud(store);
const crudClient = useClientCrud(store);
const crudSportType = useSSRCrud(storeSportType);
const { data, pending, error, refresh } = await crud.getItem();
const {
  data: dataSportStyle,
  pending: pendingSportStyle,
  error: errorSportStyle,
  refresh: refreshSportStyle,
} = await crudSportType.fetchAll();
//console.log("init", store.currentItem.sportType);
const onSubmit = async () => {
  store.currentItem.sportType = storeSportType.currentItem;
  await crudClient.updateItem();
  //console.log("after upd", store.currentItem.sportType);
  // store.currentItem.sportType = storeSportType.currentItem;
};

const onReset = () => {};
</script>

<style scoped>
.width-150 {
  min-width: 150px;
}
</style>
