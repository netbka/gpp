<template>
  <div>
    <BaseDialogForm
      ref="form"
      class="no-padding"
      @onSubmit="onSubmit()"
      @newItem="newItem"
      @onHide="onHide"
      :propHeading="store.currentItem.name"
      :propNewVisible="store.currentItem.id !== null"
      :propLoading="store.loading"
    >
      <div class="row q-col-gutter-md">
        <div class="col-12 col-lg-3">
          <div class="row">
            <div class="col-12">
              <InputUpload ref="uploader" :store="store"></InputUpload>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-9">
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
              <q-editor
                v-model="store.currentItem.description"
                :toolbar="editorToolbar($q)"
              >
              </q-editor>
            </div>
          </div>
          <div class="row" v-if="isAdmin">
            <div class="col-12">
              <q-checkbox v-model="store.currentItem.public" label="Доступно всем" />
            </div>
          </div>
        </div>
      </div>
    </BaseDialogForm>
  </div>
</template>

<script lang="ts" setup>
import DOMPurify from "dompurify";
const $q = useQuasar();
const store = useTrainingStore();
const crud = useClientCrud(store);

const { isAdmin } = useAuthUser();
const onHide = () => {
  store.resetCurrentItem("");
};
const newItem = () => {
  store.resetCurrentItem();
};
const form = ref(null);

const show = (id) => {
  id ? crud.getById(id) : store.resetCurrentItem();

  form.value.show();
};
defineExpose({
  show,
});

const onSubmit = async () => {
  store.currentItem.description = sanitizeHtml(store.currentItem.description);
  if (store.currentItem.id === null) {
    await crud.createItem(store);
  } else {
    await crud.updateItem(store);
  }
};
</script>

<style></style>
