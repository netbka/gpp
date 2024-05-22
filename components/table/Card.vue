<template>
  <q-card class="exercise-card q-mb-md" flat bordered>
    <q-card-section class="relative-position q-pa-none">
      <div class="row items-center justify-center img-exercise">
        <q-img
          :fit="props.cardLink !== 'training' ? 'scale-down' : 'cover'"
          :src="getImageFromStorage(props.cardLink, props.data.id)"
          :error-src="errorImg"
          style="width: 350px; height: 149px"
        >
        </q-img>
      </div>
      <div class="card-body q-px-sm">
        <div class="">
          <h3
            class="text-subtitle1 text-weight-bold text-white q-py-sm q-ma-none text-no-wrap text-left"
          >
            {{ data.name }}
          </h3>
        </div>
        <div class="text-left">
          <span class="text-subtitle2 text-weight-medium text-accent text-left"
            >Сложность:
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
          <div class="float-right">
            <q-chip square size="10px" outline color="yellow-3" icon="timer">
              {{ durationToText(data.duration) }}
            </q-chip>
          </div>
        </div>

        <div class="text-left">
          <q-chip
            square
            outline
            color="green-3"
            v-for="muscle in data.exerciseTemplateMuscle"
            :key="muscle.id"
            size="10px"
            class="q-ml-none"
          >
            {{ muscle.name }}
          </q-chip>
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="card-actions" align="left">
      <q-btn
        v-show="!canDeleteEdit && currentUserId()"
        outline
        color="teal"
        size="sm"
        icon="content_copy"
        @click="$emit('onCloneItem', data.id)"
        class="q-px-xs q-mx-xs"
      />
      <q-btn
        v-show="canDeleteEdit"
        flat
        color="light-green-9"
        size="sm"
        icon="edit"
        @click="$emit('onEditItem', data.id)"
        class="q-px-xs q-mx-xs"
      />

      <q-btn
        v-show="canDeleteEdit"
        flat
        color="red-7"
        size="sm"
        icon="close"
        @click="$emit('onDeleteItem', data.id)"
        class="q-px-xs q-mx-xs"
      />
      <q-separator dark vertical class="gt-xs" v-if="isLoggedIn()" />
      <q-space />

      <q-btn outline color="secondary" size="sm">
        <NuxtLink class="no-style" :to="link(data)">{{ cardCaption }}</NuxtLink></q-btn
      >
      <q-btn
        outline
        color="secondary"
        size="sm"
        v-if="props.cardCaptionSecondary.length > 0"
      >
        <NuxtLink class="no-style" :to="traininglink(data)">{{
          cardCaptionSecondary
        }}</NuxtLink></q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { Slug } from "~/types/types";
import errorImg from "/build_transparent_350x150.png";
const props = defineProps({
  data: { Type: Object, default: {} },
  //cols: { Type: Object, default: {} },
  //readOnly: { Type: Boolean, default: true },
  cardLink: { Type: String, default: "" },
  cardCaption: { Type: String, default: "" },
  cardLinkSecondary: { Type: String, default: "" },
  cardCaptionSecondary: { Type: String, default: "" },
});

const emits = defineEmits(["onUpdateField", "onEditItem", "onDeleteItem", "onCloneItem"]);
const traininglink = (data) => {
  return new Slug(data, props.cardLink + "/workout").getSlug();
};

const link = (data) => {
  return new Slug(data, props.cardLink).getSlug();
};
const { currentUserId, isLoggedIn } = useAuthUser();
const canDeleteEdit = computed(() => props.data.user_id === currentUserId());
</script>

<style scoped>
.exercise-card {
  height: 320px;
  max-height: 320px;
  width: 100%;
  padding: 0 !important;

  max-width: 350px;
}
.q-img__image--loaded {
  filter: opacity(0.7);
}
.no-filter {
  filter: none !important;
}
.img-exercise {
  object-fit: contain;
  max-height: 150px;
  height: 149px;
}

.q-img__content > div {
  pointer-events: all;
  position: absolute;
  padding: 8px;
  color: #fff;
  background: rgb(73 139 182 / 88%);
}

.card-body {
  height: 135px;

  position: relative;
  background-color: #02263c;
}
.card-actions {
  background-color: #1c3c50;
}
</style>
