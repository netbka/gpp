<template>
  <div>
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
    >
      <template v-slot:append>
        <q-icon name="attachment" @click="picker.pickFiles()" />
      </template>
    </q-file>
    <div v-if="preview">
      <img :src="preview" class="img-fluid" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useExerciseTemplateStore();
let image = ref(null);
let preview = ref(null);
const picker = ref(null);
const emits = defineEmits(["updateImge"]);
const previewMultiImage = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      preview.value = event.target.result;
    };
    reader.readAsDataURL(file);
    emits("updateImge", file);
  } else {
    preview.value = null;
  }
};

onMounted(() => {
  if (store.currentItem.imageUrl !== "") {
    setExistingPreview(store.currentItem.id + ".gif");
  }
});
const onRejectedSize = (rejectedEntries) => {
  notifyRejectedSize(rejectedEntries);
};

const setExistingPreview = (filename) => {
  //todo fix to get the suffix
  preview.value = getExerciseImage(filename);
};

const reset = () => {
  image.value = null;
  preview.value = null;
};

defineExpose({
  reset,
  //setExistingPreview,
});

//const imageUrl = computed(() => store.currentItem.imageUrl);

// watch(
//   () => store.getCurrentItemId,
//   (newVal, oldVal) => {
//     console.log(newVal);
//     if (newVal && newVal > 0) {
//       //todo fix to get the suffix
//       setExistingPreview(newVal + ".gif");
//     } else {
//       reset();
//     }
//   }
// );

// const onRejected = (rejectedEntries) => {
//   return { onRejected };
// };

// const factoryFn = () => {
//   onRejected();
//   if (!(store.currentItem.id && store.currentItem.id > 0)) return;
// };
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
