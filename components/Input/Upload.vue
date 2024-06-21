<template>
  <div class="wrapper">
    <div class="row justify-center">
      <div class="col-12 self-center">
        <!-- <div v-if="preview"> -->
        <!-- <img :src="preview" class="img-preview" /> -->
        <q-img
          fit="scale-down"
          :src="preview"
          :error-src="errorImg()"
          style="max-width: 300px; height: 300px"
          class="img-preview"
        >
        </q-img>
        <!-- </div> -->
        <q-file
          clearable
          filled
          v-model="image"
          label="Пример упражнения. Картинка."
          accept="image/*"
          :max-file-size="fileLimit()"
          @update:model-value="handleImageChange"
          ref="picker"
          @rejected="onRejectedSize"
          class="hidden"
        >
          <template v-slot:append>
            <q-icon name="attachment" @click="picker.pickFiles()" />
          </template>
        </q-file>
        <q-btn
          v-show="image"
          size="sm"
          icon="undo"
          @click="undoImageHandler"
          class="undo"
          outline
        ></q-btn>
        <q-btn
          v-show="image"
          size="sm"
          icon="cloud_upload"
          @click="uploadImageHandler"
          class="upload"
          outline
        ></q-btn>
        <q-btn
          size="sm"
          icon="attach_file"
          @click="selectImageHandler"
          class="attach"
          outline
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  store: { required: true },
  // storage: {
  //   type: String,
  //   required: true,
  // },
});
const {
  deleteFile,
  getImageUsingStore,
  urlToFile,
  urlToBlob,
  blobToFile,
  uploadImage,
  getImageUrl,
  defaultImg,
  errorImg,
  preview,
  handleImageChange,
} = useImageManager(props.store);

let image = ref(null);

const picker = ref(null);

const onRejectedSize = (rejectedEntries) => {
  notifyRejectedSize(rejectedEntries);
};

const selectImageHandler = () => {
  picker.value.pickFiles();
};
const undoImageHandler = () => {
  image.value = null;
  getImageUsingStore(props.store.$id);
};

const uploadImageHandler = async () => {
  const data = await uploadImage(
    image.value,
    props.store.currentItem.id,
    props.store.$id
  );
  image.value = data ? null : image.value;
};

watch(
  () => props.store.getCurrentItemId,
  (newVal) => {
    getImageUsingStore(props.store.$id);
  }
  // { deep: true }
);
</script>

<style scoped>
.img-preview {
  max-height: 300px;
  height: 300px;
  height: auto;
}
.wrapper {
  position: relative;
  user-select: none;
  border: solid 1px #eee;
}
/* .preview-result {
  display: flex;
  flex: 1 1 auto;
} */
.undo {
  position: absolute;
  right: 4px;
  bottom: 68px;
}
.upload {
  position: absolute;
  right: 4px;
  bottom: 36px;
}
.attach {
  position: absolute;
  right: 4px;
  bottom: 4px;
}
</style>
