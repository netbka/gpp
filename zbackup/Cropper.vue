<template>
  <div>
    <div class="wrapper">
      <div class="preview-result">
        <!-- <div class="row">
          <div class="col-3"></div>
          <div class="col-grow"></div>
        </div> -->

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

        <q-btn
          size="sm"
          icon="cloud_upload"
          @click="uploadAvatar"
          class="upload"
          color="secondary"
          outline
        ></q-btn>

        <q-btn size="sm" icon="undo" @click="undoImage" class="undo" outline></q-btn>

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
          <!-- <template v-slot:before>
            <q-icon name="attach_file" @click="handleFileSelection" size="sm" />
          </template> -->
        </q-file>
      </div>
    </div>
  </div>
  <!-- <button class="button" @click="file.click()">
        <input type="file" ref="file" @change="uploadImage($event)" accept="image/*" />
        Upload image
      </button> -->
</template>

<script lang="ts" setup>
import { urlToFile, getProfile } from "~/composables/profileUpd";
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import "vue-advanced-cropper/dist/theme.compact.css";

const limitations = ref({
  minWidth: 128,
  minHeight: 128,
  //maxHeight: 256,
  //maxWidth: 256,
});

//const user = useSupabaseUser();
//const profile = computed(() => user.value?.user_metadata.avatar_url);
const store = profileStore();
const cropper = ref(null);
const file = ref(null);
const croppedFile = ref(null);
const inputfile = ref(null);

let image = ref({
  src: null,
  type: null,
});
let result = ref({
  coordinates: null,
  image: null,
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
  //console.log(image.value.type);
};

const undoImage = () => {
  setAvatar(inputfile.value);
  croppedFile = ref(null);
};

const uploadAvatar = async () => {
  //const fileToUpload =
  //console.log(inputfile.value);
  //console.log(croppedFile.value);
  if (croppedFile.value) {
    await updateUserAvatar(croppedFile.value, store.currentItem.user_id);
    return;
  }
  if (inputfile.value) {
    await updateUserAvatar(inputfile.value, store.currentItem.user_id);
    return;
  }
};

const handleFileChange = (event) => {
  const { files } = event.target;

  if (files[0].size > fileLimit()) {
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
      croppedFile.value = blobToFile(blob, store.currentItem.user_id);
      setAvatar(croppedFile.value);
    },
    image.value.type,
    0.85
  );
};

watch(
  () => store.currentItem.avatarPath,
  async (val) => {
    if (image.src) {
      URL.revokeObjectURL(image.src);
    }
    image.value.src =  getProfile(val);
  },
  { deep: true }
);
defineExpose({
  uploadAvatar,
});
//const updateNewAvatar = async () => {
// if (!store.currentItem.avatarPath && profile.value.length > 6) {
//   var url = profile.value;
//   var fileName = store.currentItem.user_id + ".jpeg";
//   const fileToUpload = await urlToFile(url, fileName);
//   updateUserAvatar(fileToUpload, fileName);
//   store.currentItem.avatarPath = fileName;
//   store.updateCurrentUser();
// }
//};
// const uploadImage = (event) => {
//   /// Reference to the DOM input element
//   const { files } = event.target;
//   // Ensure that you have a file before attempting to read it
//   if (files && files[0]) {
//     // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
//     if (image.src) {
//       URL.revokeObjectURL(image.src);
//     }
//     // 2. Create the blob link to the file to optimize performance:
//     const blob = URL.createObjectURL(files[0]);

//     // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
//     image.value.src = blob;
//     image.value.type = files[0].type;
//   }
// };
//onMounted(async () => {});

// const initAvatar = async (url) => {
//   let result = await urlToFile(url, "avatar.jpg");
//   setAvatar(result);

// };
</script>

<style lang="scss">
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
