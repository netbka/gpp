<template>
  <div class="wrapper">
    <div class="row justify-center">
      <div class="col-12 self-center">
        <div v-if="preview">
          <!-- <img :src="preview" class="img-fluid" /> -->
          <q-img
            fit="scale-down"
            :src="preview"
            :error-src="errorImg"
            style="max-width: 300px; height: 300px"
            class="img-fluid"
          >
          </q-img>
        </div>
        <q-file
          clearable
          filled
          v-model="image"
          label="Пример упражнения. Картинка."
          accept="image/*"
          :max-file-size="fileLimit()"
          @update:model-value="previewMultiImage"
          ref="picker"
          @rejected="onRejectedSize"
          class="hidden"
        >
          <template v-slot:append>
            <q-icon name="attachment" @click="picker.pickFiles()" />
          </template>
        </q-file>
        <q-btn
          size="sm"
          icon="cloud_upload"
          @click="handleFileSelection"
          class="upload"
          outline
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useExerciseTemplateStore();
let image = ref(null);
let preview = ref(null);
const picker = ref(null);
const emits = defineEmits(["updateImge"]);
import defaultImage from "~/public/defaultCover-transparent.png";
import errorImg from "/exerciseSmall.png";
const previewMultiImage = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      preview.value = event.target.result;
    };
    reader.readAsDataURL(file);
    emits("updateImge", file);
  } else {
    preview.value = defaultImage;
  }
};

onMounted(async () => {
  if (store.currentItem.imageUrl !== "") {
    setExistingPreview(store.currentItem.id + ".gif");
  } else {
    await setNoImage();
  }
});
const onRejectedSize = (rejectedEntries) => {
  notifyRejectedSize(rejectedEntries);
};

const setExistingPreview = (filename) => {
  preview.value = getExerciseImage(filename);
};
const setNoImage = async () => {
  //var image = await fileToBlob(defaultImage);
  preview.value = defaultImage;

  let blob = await fileToBlob(defaultImage);
  let file = blobToFile(blob, "default");

  emits("updateImge", file);
};

const reset = () => {
  image.value = null;
  preview.value = defaultImage;
};

defineExpose({
  reset,
  //setExistingPreview,
});
const handleFileSelection = () => {
  picker.value.pickFiles();
};

watch(
  () => store.currentItem,
  (newVal) => {
    if (newVal.imageUrl !== "" && newVal.id !== null) {
      setExistingPreview(store.currentItem.id + ".gif");
    }
  },
  { deep: true }
);
</script>

<style scoped>
.img-fluid {
  max-height: 300px;
  height: 300px;
  height: auto;
}
.wrapper {
  position: relative;
  user-select: none;
  border: solid 1px #eee;
}
.preview-result {
  display: flex;
  flex: 1 1 auto;
}
.upload {
  position: absolute;
  right: 4px;
  bottom: 4px;
}
</style>
