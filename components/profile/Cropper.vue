<template>
  <BaseDialogEmpty ref="dialog" propHeading="Редактировать аватар">
    <div>
      <div class="wrapper">
        <div class="preview-result">
          <Cropper
            :autoZoom="true"
            ref="cropper"
            class="cropper-avatar"
            :src="image.src"
            :stencil-component="CircleStencil"
            :stencil-props="{
              aspectRatio: 1 / 1,
              previewClass: 'preview',
            }"
            check-orientation
            :max-height="limitations.maxHeight"
            :max-width="limitations.maxWidth"
            :min-height="limitations.minHeight"
            :min-width="limitations.minWidth"
          />

          <q-btn
            outline
            size="sm"
            icon="attach_file"
            @click="handleFileSelection"
            class="attach"
          ></q-btn>
          <q-btn size="sm" icon="crop" @click="cropImage" class="crop" outline></q-btn>
          <div v-show="inputfile !== null || croppedFile !== null">
            <q-btn
              size="sm"
              icon="cloud_upload"
              @click="uploadAvatar"
              class="upload"
              outline
            ></q-btn>
          </div>
          <div v-show="inputfile !== null && croppedFile !== null">
            <q-btn size="sm" icon="undo" @click="undoImage" class="undo" outline></q-btn>
          </div>
          <q-file
            v-model="inputfile"
            filled
            counter
            style="max-width: 35px"
            accept="image/*"
            clearable
            @input="handleFileChange"
            class="ellipsis fileUpload hidden"
            ref="file"
            :max-file-size="fileLimit()"
            @rejected="onRejectedSize"
          >
          </q-file>
        </div>
      </div>
    </div>
  </BaseDialogEmpty>
</template>

<script lang="ts" setup>
import { urlToFile, getProfile } from "~/composables/profileUpd";
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import "vue-advanced-cropper/dist/theme.compact.css";

const limitations = ref({
  minWidth: 128,
  minHeight: 128,
});

const store = profileStore();
const cropper = ref(null);
const file = ref(null);
const croppedFile = ref(null);
const inputfile = ref(null);
const dialog = ref(null);

let image = ref({
  src: null,
  type: null,
});

const handleFileSelection = () => {
  file.value.pickFiles();
};

const onRejectedSize = (rejectedEntries) => {
  notifyRejectedSize(rejectedEntries);
};

const setAvatar = (_file) => {
  const blob = URL.createObjectURL(_file);
  image.value.src = blob;
  image.value.type = _file.type;
};

const undoImage = () => {
  setAvatar(inputfile.value);
  croppedFile = ref(null);
};

const uploadAvatar = async () => {
  if (croppedFile.value) {
    await updateUserAvatar(croppedFile.value, store.currentProfile.user_id);
    return;
  }
  if (inputfile.value) {
    await updateUserAvatar(inputfile.value, store.currentProfile.user_id);
    return;
  }
};

const handleFileChange = (event) => {
  const { files } = event.target;

  if (files.length === 0 || files[0].size > fileLimit()) {
    event.preventDefault();
    return;
  }

  if (image.src) {
    URL.revokeObjectURL(image.src);
  }
  setAvatar(files[0]);
};

const cropImage = async () => {
  const { canvas } = cropper.value.getResult();

  canvas.toBlob(
    (blob) => {
      croppedFile.value = blobToFile(blob, store.currentProfile.user_id);
      setAvatar(croppedFile.value);
    },
    image.value.type,
    0.85
  );
};

watch(
  () => store.currentProfile.avatarPath,
  async (val) => {
    if (image.src) {
      URL.revokeObjectURL(image.src);
    }
    image.value.src = getProfile(val);
  },
  { deep: true }
);

const show = () => {
  dialog.value.show();
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.cropper-avatar {
  width: 100%;
  height: 180px;
  max-height: 180px;
  padding: 4px;
}

.vue-advanced-cropper__foreground {
  opacity: 0.7;
  background: #fff;
}
.vue-advanced-cropper__background {
  background: #fff;
}
.wrapper {
  position: relative;
  user-select: none;
  border: solid 1px #eee;
  margin-top: 20px;
  margin-bottom: 20px;
}
.preview-result {
  display: flex;
  &__cropper {
    width: 300px;
  }
}
.attach {
  position: absolute;
  left: 4px;
  top: 4px;
}
.crop {
  position: absolute;
  left: 4px;
  top: 36px;
}
.upload {
  position: absolute;
  left: 4px;
  top: 68px;
}
.undo {
  position: absolute;
  left: 4px;
  top: 100px;
}

.vue-simple-line {
  border-color: #ffcb11c9;
  border-style: dashed;

  border-width: 0.1;
}
.preview-result {
  .preview {
    border: dashed 1px #0753872b;
  }
}
</style>
