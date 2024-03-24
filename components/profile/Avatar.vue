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
          :stencil-props="{
            aspectRatio: 1 / 1,
          }"
          check-orientation
          :max-height="limitations.maxHeight"
          :max-width="limitations.maxWidth"
          :min-height="limitations.minHeight"
          :min-width="limitations.minWidth"
        />

        <q-btn size="sm" icon="crop" @click="cropImage" class="crop" outline></q-btn>
        <q-btn
          outline
          size="sm"
          icon="attach_file"
          @click="handleFileSelection"
          class="attach"
        ></q-btn>
        <q-btn
          size="sm"
          icon="cloud_upload"
          @click="cropImage"
          class="upload"
          outline
        ></q-btn>

        <q-file
          v-model="files"
          filled
          counter
          style="max-width: 35px"
          accept=".jpg, image/*"
          clearable
          @input="handleFileChange"
          class="ellipsis fileUpload hidden"
          ref="file"
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
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import "vue-advanced-cropper/dist/theme.compact.css";

const limitations = ref({
  minWidth: 128,
  minHeight: 128,
  //maxHeight: 256,
  //maxWidth: 256,
});

const user = useSupabaseUser();
const profile = computed(() => user.value?.user_metadata.avatar_url);
const store = profileStore();
const cropper = ref(null);
const file = ref(null);
const files = ref(null);
const src = ref("");
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
onMounted(async () => {
  await initAvatar(profile.value);
});

const initAvatar = async (url) => {
  let result = await urlToFile(url, "avatar.jpg");
  const blob = URL.createObjectURL(result);
  image.value.src = blob;
  image.value.type = blob.type;
};

const updateNewAvatar = async () => {
  // if (!store.currentProfile.avatarPath && profile.value.length > 6) {
  //   var url = profile.value;
  //   var fileName = store.currentProfile.user_id + ".jpeg";
  //   const fileToUpload = await urlToFile(url, fileName);
  //   updateUserAvatar(fileToUpload, fileName);
  //   store.currentProfile.avatarPath = fileName;
  //   store.updateCurrentUser();
  // }
};

const handleFileChange = (event) => {
  const { files } = event.target;
  if (image.src) {
    URL.revokeObjectURL(image.src);
  }
  const blob = URL.createObjectURL(files[0]);
  image.value.src = blob;
  image.value.type = files[0].type;
};

const cropImage = async () => {
  const { canvas } = cropper.value.getResult();
  //await initAvatar(result.image.src);
  image.value.src = canvas.toDataURL();
  console.log(result);
};
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

// watch(
//   () => files,
//   (val) => {
//     //console.log(val);
//     if (image.src) {
//       URL.revokeObjectURL(image.src);
//       const blob = URL.createObjectURL(files[0]);
//     }
//   },
//   { deep: true }
// );
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

.vue-simple-line {
  border-color: #ffcb11c9;
  border-style: dashed;

  border-width: 0.1;
}
</style>
