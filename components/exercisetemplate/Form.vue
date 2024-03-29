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
            v-model.number="store.currentItem.duration"
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
      <div class="row q-mt-md">
        <div class="col-12">
          <InputSelectMuscle v-model="store.currentItem.muscle"></InputSelectMuscle>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-checkbox v-model="store.currentItem.public" label="Доступно всем" />
        </div>
      </div>
      <div class="row q-my-md">
        <div class="col-12">
          <InputUpload @updateImge="imageUpdate" ref="uploader"></InputUpload>
        </div>
      </div>
    </BaseDialogForm>
  </div>
</template>

<script setup>
// todo restric public for admin only

const store = useExerciseTemplateStore();
const uploader = ref(null);
const loading = ref(false);
onMounted(async () => {});
const imageToUpload = ref(null);
const imageUpdate = (img) => {
  imageToUpload.value = img;
};

const onSubmit = async () => {
  //todo fix so only premium users can upload
  //todo fix to apply real image extension and not only "gif"

  if (imageToUpload.value != null) {
    //todo fix to get actual suffix (also fix in Upload component!)
    store.currentItem.imageUrl = ".gif";
  }
  //console.log(store.currentItem.id);
  if (store.currentItem.id === null) {
    await store.createCurrentItem();
  } else {
    await store.updateCurrentItem();
  }

  //  console.log(imageToUpload.value);
  if (imageToUpload.value != null) {
    //  console.log(store.currentItem.id);
    await updateExerciseImage(imageToUpload.value, store.currentItem.id + ".gif");
  }

  // store.currentProfile.profilesSportType = storeSportType.currentItem;
};

const newItem = () => {
  store.resetCurrentItem();
  uploader.value.reset();
};
const onReset = () => {
  console.log("Reset");
};
const form = ref(null);

const show = () => {
  form.value.show();
};

defineExpose({
  show,
});
</script>

<style scoped>
.width-150 {
  min-width: 150px;
}
</style>
