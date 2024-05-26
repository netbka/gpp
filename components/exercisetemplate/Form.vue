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
      :propFullHeight="true"
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
                label="Название упражнения *"
                :rules="[(val) => !!val || 'Нужно указать значение']"
                :disable="store.loading"
                :input-style="{ fontSize: '12px' }"
                counter
                maxlength="37"
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
          <div class="row q-col-gutter-x-md q-mt-md">
            <div class="col-6">
              <q-input
                dense
                outlined
                v-model.number="store.currentItem.duration"
                label="Прододжительность (сек.)"
                :disable="store.loading"
                :input-style="{ fontSize: '12px' }"
                max="300"
                min="10"
                step="1"
                type="number"
                :rules="[(val) => validate(val)]"
              />
            </div>
            <div class="col-6">
              <q-input
                dense
                outlined
                v-model.number="store.currentItem.level"
                label="Сложность"
                :disable="store.loading"
                :input-style="{ fontSize: '12px' }"
                max="3"
                min="0"
                step="1"
                type="number"
                lazy-rules
                :rules="[(val) => validate(val)]"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <InputSelectMuscle
                v-model="store.currentItem.exerciseTemplateMuscle"
                :selectedIds="store.currentItem.exerciseTemplateMuscle"
              ></InputSelectMuscle>
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

<script setup>
const $q = useQuasar();
const store = useExerciseTemplateStore();
const crud = useClientCrud(store);

const { isAdmin } = useAuthUser();

const storeMuscle = muscleStore();
const uploader = ref(null);

const onSubmit = async () => {
  store.currentItem.newItems = storeMuscle.currentItem;
  store.currentItem.description = sanitizeHtml(store.currentItem.description);
  if (store.currentItem.id === null) {
    await crud.createItem(store);
  } else {
    await crud.updateItem(store);
  }
};
const onHide = () => {
  store.resetCurrentItem("");
};
const newItem = () => {
  store.resetCurrentItem();
  // uploader.value.handleImageChange();
};

const form = ref(null);

const show = async (id) => {
  id ? await crud.getById(id) : store.resetCurrentItem();
  form.value.show();
};
const validate = (val) => {
  if (val === null || val < 0) return "нужно указать значение";
};

defineExpose({
  show,
});
</script>

<style scoped>
/* .width-150 {
  min-width: 150px;
} */
.q-editor {
  max-height: 500px;
  overflow: overlay;
}
</style>
