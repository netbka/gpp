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
      :propFullHeight="true"
    >
      <div class="row q-col-gutter-md">
        <div class="col-12 col-lg-3">
          <div class="row">
            <div class="col-12">
              <InputUpload @updateImge="imageUpdate" ref="uploader"></InputUpload>
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
                :disable="loading"
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
              <!-- <q-input
                dense
                outlined
                v-model="store.currentItem.description"
                label="Описание"
                :disable="loading"
                :input-style="{ fontSize: '12px' }"
              /> -->
            </div>
          </div>
          <div class="row q-col-gutter-x-md q-mt-md">
            <div class="col-6">
              <q-input
                dense
                outlined
                v-model.number="store.currentItem.duration"
                label="Прододжительность (сек.)"
                :disable="loading"
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
                :disable="loading"
                :input-style="{ fontSize: '12px' }"
                max="3"
                min="1"
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
          <div class="row">
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
import DOMPurify from "dompurify";
const $q = useQuasar();
const store = useExerciseTemplateStore();
const storeMuscle = muscleStore();
const uploader = ref(null);
const loading = ref(false);
onMounted(async () => {});
const imageToUpload = ref(null);
const imageUpdate = (img) => {
  imageToUpload.value = img;
};
const config = {
  sanitizer: function (dirtyHTML) {
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
    // Remove elements with external links
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHTML, "text/html");
    const links = doc.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.href && !link.href.startsWith(window.location.origin)) {
        link.remove();
      }
    }
    return doc.body.innerHTML;
  },
};
const onSubmit = async () => {
  if (imageToUpload.value != null) {
    store.currentItem.imageUrl = ".gif";
  }
  store.currentItem.newItems = storeMuscle.currentItem;
  store.currentItem.description = DOMPurify.sanitize(store.currentItem.description, {
    FORBID_ATTR: ["style", "a", "href", "class", "path"],
    FORBID_TAGS: ["style", "class", "path"],
  });

  if (store.currentItem.id === null) {
    await store.createCurrentItem();
  } else {
    await store.updateCurrentItem();
  }

  if (imageToUpload.value != null) {
    await updateExerciseImage(imageToUpload.value, store.currentItem.id + ".gif");
  }
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
const validate = (val) => {
  if (val === null || !val || val < 1) return "нужно указать значение";
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
