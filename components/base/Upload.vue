<template>
  <div>
    <q-file
      clearable
      filled
      v-model="image"
      label="Label"
      accept=".jpg, .jpeg, .gif, .png"
      max-total-size="1000000"
      @update:model-value="previewMultiImage"
      ref="picker"
    >
      <template v-slot:append>
        <q-icon name="attachment" @click="picker.pickFiles()" />
      </template>
    </q-file>
    <div v-if="preview">
      <img :src="preview" class="img-fluid" />
    </div>
    {{ imageUrl }}
  </div>
</template>

<script lang="ts" setup>
import { useExerciseStore } from "~/stores/exercise";
const store = useExerciseStore();
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

const setExistingPreview = (filename) => {
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

const imageUrl = computed(() => store.currentItem.imageUrl);

watch(
  () => store.getIimgUrl,
  (newVal) => {
    if (newVal.length > 4) setExistingPreview(newVal);
  }
);

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
