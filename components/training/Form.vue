<template>
  <div>
    <BaseDialogForm
      ref="form"
      class="no-padding"
      @onSubmit="onSubmit()"
      @newItem="newItem()"
      :propHeading="store.currentItem.name"
      :propNewVisible="store.currentItem.id !== null"
      :propLoading="store.loading"
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
      <div class="row">
        <div class="col-12">
          <q-checkbox v-model="store.currentItem.public" label="Доступно всем" />
        </div>
      </div>
    </BaseDialogForm>
  </div>
</template>

<script lang="ts" setup>
const store = useTrainingStore();
const form = ref(null);

const show = () => {
  form.value.show();
};
defineExpose({
  show,
});
const newItem = () => {
  store.resetCurrentItem();
};
const onSubmit = async () => {
  if (store.currentItem.id === null) {
    await store.createCurrentItem();
  } else {
    await store.updateCurrentItem();
  }
};
</script>

<style></style>
