<template>
  <div>
    <q-card class="exercise-card q-mb-md" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" v-show="loading" />
          <q-avatar v-show="!loading">
            <img :src="getProfile(data.user_id)" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label v-html="data.name"> </q-item-label>
          <q-item-label caption
            ><span v-for="muscle in data.exerciseTemplateMuscle" :key="muscle.id">
              {{ muscle.name + " " }}
            </span></q-item-label
          >
        </q-item-section>
        <q-item-section>
          <span class="text-subtitle2 text-weight-medium text-accent">Сложность: </span>
          <q-rating
            v-model="data.level"
            size="1em"
            max="3"
            readonly
            class="q-mr-md"
            icon="fitness_center"
            :color-selected="['red-12', 'red-13', 'red-14']"
          />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <div class="row">
          <div class="col-12 col-sm-3 q-pa-sm self-top">
            <img class="img-exercise" :src="getExerciseImage(data.id + data.imageUrl)" />
          </div>
          <div class="col-12 col-sm-9 q-pa-sm" v-html="data.description"></div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="items-center" align="right">
        <q-btn outline color="primary" size="sm">
          <NuxtLink class="no-style" to="/exercisetemplate/">Назад</NuxtLink></q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: { Type: Object, required: true },
  readOnly: { Type: Boolean, default: false },
  loading: { Type: Boolean, default: false },
});
// if (!props.data) {
//   throw createError({
//     statusCode: 404,
//     message: "Этого занятия нет",
//   });
// }
const emits = defineEmits(["onUpdateField", "editItem"]);
const link = (data) => {
  return new Slug(data, "exercisetemplate");
};
const loading = toRef(() => props.loading);
const resetError = async (error) => {
  await navigateTo("/exerciseTemplate/");
  error.value = null;
};
</script>

<style scoped>
.exercise-card {
  width: 100%;
}
.img-exercise {
  min-height: 300px;
  object-fit: cover;
  max-width: 90%;
}
</style>
