<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="">
      <div class="row">
        <div class="col-12">
          <q-input
            bg-color="white"
            dense
            outlined
            v-model="store.currentItem.name"
            label="Ник *"
            :rules="[(val) => !!val || 'Нужно указать значение']"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
            maxlength="16"
            counter
          />
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-input
            bg-color="white"
            dense
            outlined
            v-model="store.currentItem.firstName"
            label="Имя "
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
            label="Фамилия"
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
            :selectedIds="store.currentItem.profilesSportType"
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
const onSubmit = async () => {
  store.currentItem.newItems = storeSportType.currentItem;
  await crudClient.updateItem();
  // store.currentItem.profilesSportType = storeSportType.currentItem;
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
