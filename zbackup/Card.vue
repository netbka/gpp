<template>
  <q-card class="exercise-card q-mb-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="getProfile(data.user_id)" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <InputText
            :readOnly="props.readOnly"
            v-model="data.name"
            @updatedb="$emit('onUpdateField', 'name', data.name, data.id)"
          ></InputText>
          <span class="q-ml-sm text-caption text-thin text-grey">
            <InputNumber
              :typeDuration="true"
              :readOnly="props.readOnly"
              v-model="data.duration"
              @updatedb="$emit('onUpdateField', 'duration', data.duration, data.id)"
            ></InputNumber> </span
        ></q-item-label>
        <q-item-label caption
          ><span v-for="muscle in data.exerciseTemplateMuscle" :key="muscle.id">
            {{ muscle.name + " " }}
          </span></q-item-label
        >
      </q-item-section>
      <q-item-section>
        <q-rating
          v-model="data.level"
          size="1em"
          max="3"
          color="secondary"
          readonly
          class="absolute-right q-mr-md"
          icon="fitness_center"
        />
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal class="card-body-height">
      <img class="img-exercise" :src="getExerciseImage(data.id + data.imageUrl)" />

      <q-card-section v-html="data.descriptionShort" class="q-pa-sm"> </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions class="items-center" align="right">
      <q-btn
        flat
        color="light-green-9"
        size="sm"
        icon="edit"
        @click="$emit('onEditItem', data.id)"
        class="q-px-xs q-mx-xs"
      >
      </q-btn>
      <q-btn
        flat
        color="red-7"
        size="sm"
        icon="close"
        @click="$emit('onDeleteItem', data.id)"
        class="q-px-xs q-mx-xs"
      >
      </q-btn>

      <q-btn outline color="primary" size="sm">
        <NuxtLink class="no-style" :to="link(data)">подробнее</NuxtLink></q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: { Type: Object, default: {} },
  cols: { Type: Object, default: {} },
  readOnly: { Type: Boolean, default: false },
});
const emits = defineEmits(["onUpdateField", "onEditItem", "onDeleteItem"]);
const link = (data) => {
  var slug = data.id + "-" + data.name;
  const url = useSlug(slug);
  return "/exercisetemplate/" + url;
};
</script>

<style scoped>
.exercise-card {
  height: 200px;
  max-height: 200px;
  width: 100%;
}
.img-exercise {
  object-fit: cover;
  max-height: 98px;
  height: 98px;
}
.card-body-height {
  max-width: 730px;
  max-height: 98px;
  overflow: hidden;
  text-overflow: ellipsis;

  -webkit-line-clamp: 4;
  word-break: break-word;
}
</style>
