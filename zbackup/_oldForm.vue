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
          <BaseUpload @updateImge="imageUpdate" ref="uploader"></BaseUpload>
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
          <q-btn
            v-show="store.currentItem.id && store.currentItem.id > 0"
            label="Новое"
            size="sm"
            color="accent"
            outline
            :loading="loading"
            class="width-150 q-ml-md"
            :disable="loading"
            @click="newItem"
          >
          </q-btn>
        </div>
      </div>
    </q-form>
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
  loading.value = true;
  //todo fix so can upload also with new exercise
  //todo fix so only premium users can upload
  //todo fix to apply real image extension and not only "gif"

  if (imageToUpload.value != null) {
    //todo fix to get actual suffix (also fix in Upload component!)
    store.currentItem.imageUrl = ".gif";
  }
  await store.updateCurrentItem();

  //  console.log(imageToUpload.value);
  if (imageToUpload.value != null) {
    //  console.log(store.currentItem.id);
    updateExerciseImage(imageToUpload.value, store.currentItem.id + ".gif");
  }

  // store.currentItem.profilesSportType = storeSportType.currentItem;
  loading.value = false;
};

const newItem = () => {
  store.resetCurrentItem();
  uploader.value.reset();
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
