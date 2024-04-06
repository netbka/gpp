<template>
  <q-card class="exercise-card q-mb-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
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
        <q-rating
          v-model="data.level"
          size="2em"
          :max="3"
          color="secondary"
          readonly
          class="absolute-right q-mr-md"
          icon="fitness_center"
        />
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <div class="row">
        <div class="col-12 col-sm-3 q-pa-sm self-center">
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
</template>

<script lang="ts" setup>
const props = defineProps({
  data: { Type: Object, default: {} },

  readOnly: { Type: Boolean, default: false },
});
const emits = defineEmits(["onUpdateField", "editItem"]);
const link = (data) => {
  var slug = data.id + "-" + data.name;
  const url = useSlug(slug);
  return "/exercisetemplate/" + url;
};
</script>

<style scoped>
.exercise-card {
  width: 100%;
}
.img-exercise {
  object-fit: cover;
  max-width: 90%;
}
</style>
