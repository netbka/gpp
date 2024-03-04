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
            label="Название упражнения *"
            :rules="[(val) => !!val || 'Нужно указать значение']"
            :disable="loading"
            :input-style="{ fontSize: '12px' }"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-input
            dense
            outlined
            v-model="store.currentItem.description"
            label="Описание"
            :disable="loading"
            :input-style="{ fontSize: '12px' }"
          />
        </div>
      </div>
      <div class="row q-my-md">
        <div class="col-12">
          <q-input
            dense
            outlined
            v-model="store.currentItem.duration"
            label="Прододжительность (сек.)"
            :disable="loading"
            :input-style="{ fontSize: '12px' }"
            max="300"
            min="10"
            step="5"
            type="number"
          />
        </div>
      </div>
      <div class="row q-my-md">
        <div class="col-12">
          <BaseSelectMuscle v-model="store.currentItem.muscle"></BaseSelectMuscle>
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
            :loading="loading"
            class="width-150"
            :disable="loading"
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
import { useQuasar } from "quasar";
const $q = useQuasar();

import { useExerciseStore } from "~/stores/exercise";
const store = useExerciseStore();

const loading = ref(false);
onMounted(async () => {});

const onSubmit = async () => {
  loading.value = true;
  // store.currentProfile.newItems = storeSportType.currentItem;
  await store.updateCurrentItem();
  // store.currentProfile.profilesSportType = storeSportType.currentItem;
  loading.value = false;
};

const onReset = () => {
  console.log("Reset");
};
</script>

<style scoped>
.width-150 {
  min-width: 150px;
}
</style>
