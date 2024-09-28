<template>
  <div class="training-container">
    <div class="row q-ma-sm">
      <div class="col-12">
        <h1 class="font-header-h1">
          {{ data.name }}
        </h1>

        <q-separator color="orange" inset />
      </div>
    </div>
    <div class="row q-px-sm">
      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"
          ><b>{{ $t("components.content.trainingpage.duration") }}: </b>
        </span>
        <q-chip square size="12px" outline color="blue-grey-14" icon="timer">
          {{ numToMinText(data.duration) }}
          {{ $t("workout.min") }}
          {{ numToSecText(data.duration) }}
          {{ $t("workout.sec") }}
        </q-chip>
      </div>
    </div>
    <div class="row q-px-sm">
      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"
          ><b>{{ $t("components.content.trainingpage.muscle") }}: </b>
        </span>
        <q-chip
          size="12px"
          v-for="muscle in data.exerciseTemplateMuscle"
          :key="muscle.id"
          outline
          color="primary"
        >
          {{ muscle.name + " " }}
        </q-chip>
      </div>
    </div>
    <div class="row q-px-sm">
      <div class="col-grow self-center">
        <span class="text-subtitle2 text-weight-medium"
          ><b>{{ $t("components.content.trainingpage.level") }}: </b>
        </span>
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
          :label="
            toggleText
              ? $t('components.content.trainingpage.toggleon')
              : $t('components.content.trainingpage.toggleoff')
          "
          color="secondary"
          keep-color
          v-model="toggleText"
        />
      </div>
    </div>
    <div class="row q-px-sm">
      <div class="col-grow self-center">
        <q-btn color="primary" size="sm" class="float-left">
          <NuxtLinkLocale class="no-style" :to="traininglink()">{{
            $t("components.content.trainingpage.btnstart")
          }}</NuxtLinkLocale></q-btn
        >
      </div>
      <div class="col-auto col-sm-6 col-md-8 self-center">
        <q-btn color="secondary" size="sm" class="float-left q-ml-lg">
          <NuxtLinkLocale class="no-style" :to="'/' + props.link.toLowerCase()">{{
            $t("components.content.trainingpage.btnback")
          }}</NuxtLinkLocale></q-btn
        >
      </div>
    </div>
    <div class="row">
      <div class="col-12 q-mt-sm">
        <q-separator color="orange" inset />
      </div>
    </div>
    <div class="row q-my-sm q-px-sm">
      <div class="col-12">
        <q-scroll-area class="scroll-content">
          <ContentDetailedTraining
            :data="props.data"
            v-show="toggleText"
          ></ContentDetailedTraining>
          <div v-html="description" v-show="!toggleText"></div>
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

const showExercise = (template) => {};

const exerciseTemplatelink = (data) => {
  return data !== null ? new Slug(data, "exerciseTemplate").getSlug() : "";
};
</script>

<style scoped>
/* .content-heading {
  min-height: 150px;
} */

.training-container {
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
  line-height: 38px;
}
</style>
