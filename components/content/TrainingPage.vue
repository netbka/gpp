<template>
  <div>
    <div class="row content-heading q-px-sm">
      <div class="col-12">
        <h1 class="font-header-h1">
          {{ data.name }}
        </h1>

        <q-separator color="orange" inset />
      </div>

      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"><b>Продолжительность: </b> </span>
        <q-chip square size="12px" outline color="blue-grey-14" icon="timer">
          {{ durationToText(data.duration) }}
        </q-chip>
      </div>
      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"><b>Мышцы: </b> </span>
        <q-chip
          size="12px"
          v-for="muscle in props.muscleArr"
          :key="muscle.id"
          outline
          color="primary"
        >
          {{ muscle.name + " " }}
        </q-chip>
      </div>
      <div class="col-grow self-center">
        <span class="text-subtitle2 text-weight-medium"><b>Сложность: </b> </span>
        <q-rating
          v-model="data.level"
          size="1em"
          max="3"
          readonly
          class="q-mr-md"
          icon="fitness_center"
          :color-selected="['red-12', 'red-13', 'red-14']"
        />
      </div>
      <div class="col-auto col-sm-6 col-md-8 self-center">
        <q-toggle
          :label="toggleText ? 'Детально' : 'Текст'"
          color="secondary"
          keep-color
          v-model="toggleText"
        />
      </div>
      <div class="col-12 q-mt-sm">
        <q-separator color="orange" inset />
      </div>
    </div>
    <div class="row q-my-sm q-px-sm">
      <div class="col-12">
        <q-scroll-area class="scroll-content">
          <div
            v-show="toggleText"
            class="row"
            v-for="(el, index) in data.exerciseGroup"
            :key="el.id"
          >
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
                  <NuxtLink
                    class="no-style"
                    :to="exerciseTemplatelink(ex.template)"
                    v-if="ex.template"
                    ><q-icon name="img:/icons/exercise.svg" size="sm"></q-icon
                  ></NuxtLink>
                  <span class="text-body1"> {{ ex.name }}</span>
                </div>
                <div class="col-shrink self-center border_bottom">
                  {{ ex.duration }} сек.
                </div>
              </div>
            </div>
          </div>
          <div v-html="description" v-show="!toggleText"></div>
          <q-btn color="primary" size="sm" class="float-left">
            <NuxtLink class="no-style" :to="traininglink()">Заниматься</NuxtLink></q-btn
          >
          <q-btn color="secondary" size="sm" class="float-right">
            <NuxtLink class="no-style" :to="'/' + props.link.toLowerCase()"
              >Назад</NuxtLink
            ></q-btn
          >
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toggleText = ref(true);
import { Slug } from "~/types/types";

const props = defineProps({
  data: { Type: Object, required: true },
  readOnly: { Type: Boolean, default: false },
  loading: { Type: Boolean, default: false },
  muscleArr: { Type: Array, default: [] },
  link: { Type: String, default: "" },
});
const { getImageUrl } = useImageManager();
const loading = toRef(() => props.loading);
const description = exerciseToTextNoName(props.data.exerciseGroup);
const traininglink = () => {
  return new Slug(props.data, props.link + "/workout").getSlug();
};

const exerciseTemplatelink = (data) => {
  return data !== null ? new Slug(data, "exerciseTemplate").getSlug() : "";
};

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
</script>

<style scoped>
.img-exercise {
  height: 80px;
  object-fit: cover;
  width: 80px;
}
.content-heading {
  min-height: 150px;
}

.scroll-content {
  height: calc(100vh - 220px);
}
@media (min-width: 768px) {
  .scroll-content {
    height: calc(100vh - 270px);
  }
}

.font-header-h1 {
  font-size: calc(1.5em + 0.5vw) !important;
  display: inline;
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
