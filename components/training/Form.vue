<template>
  <div>
    <BaseDialogForm
      ref="form"
      class="no-padding"
      @onSubmit="onSubmit()"
      :propHeading="store.currentItem.name"
    >
      <div class="row">
        <div class="col-12">
          <q-input
            bg-color="white"
            dense
            outlined
            v-model="store.currentItem.name"
            label="Название плана *"
            :rules="[(val) => !!val || 'Нужно указать значение']"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-input
            bg-color="white"
            dense
            outlined
            v-model="store.currentItem.description"
            label="Описание"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
          />
        </div>
      </div>
    </BaseDialogForm>
  </div>
</template>

<script lang="ts" setup>
import { useTrainingStore } from "~/stores/training";
const store = useTrainingStore();
const form = ref(null);

const show = () => {
  form.value.show();
};
defineExpose({
  show,
});

const onSubmit = async () => {
  store.updateCurrentItem();
};
</script>

<style></style>
