<template>
  <div>
    <div class="row" v-for="(el, index) in data.exerciseGroup" :key="el.id">
      <div class="col-12 q-my-sm">
        <h2 class="font-header-h2">{{ el.name }}</h2>
        <span class="text-primary text-bold text-h4"> x{{ el.repeats }}</span>
        <div class="row" v-for="ex in el.exercise" :key="'exercise' + ex.id">
          <div class="col-shrink self-center border_bottom">
            <q-img
              :src="exerciseImage(ex.templateId)"
              :error-src="website_errorImg()"
              fit="scale-down"
              class="img-exercise"
              loading-show-delay="700"
              :loading="'eager'"
              :no-spinner="true"
            />
          </div>
          <div class="col col-sm-5 col-md-4 self-center q-pa-md border_bottom">
            <span class="text-body1 cursor-pointer" @click="showExercise(ex.template)">
              {{ ex.name }}</span
            >
          </div>
          <div class="col-shrink self-center border_bottom">
            {{ ex.duration }} сек.
            <div>
              <!-- <NuxtLink
                      class="no-style"
                      :to="exerciseTemplatelink(ex.template)"
                      v-if="ex.template"
                      > 
                    >
                     </NuxtLink> -->
              <q-icon
                name="img:/icons/exercise.svg"
                size="sm"
                v-if="ex.template"
                @click="showExercise(ex.template)"
              ></q-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContentDialogExerciseTemplate ref="dialog"></ContentDialogExerciseTemplate>
  </div>
</template>

<script lang="ts" setup>
const dialog = ref(null);
const props = defineProps({
  data: { Type: Object, required: true },
});
const { getImageUrl } = useImageManager();
const exerciseImage = (fileName) => {
  try {
    return fileName !== undefined
      ? getImageUrl(fileName, "exerciseTemplate", false)
      : null;
  } catch (error) {
    console.log("error");
    return null;
  }
};
const showExercise = (template) => {
  dialog.value.show(template);
};
</script>

<style scoped>
.img-exercise {
  height: 80px;
  object-fit: cover;
  width: 80px;
}
.font-header-h2 {
  font-size: calc(1.2em + 0.5vw) !important;
  display: inline;
}
.border_bottom {
  border-bottom: 1px solid rgba(0, 255, 0, 0.12);
  height: 81px;
  align-content: center;
}
</style>
