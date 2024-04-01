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
    </q-item>

    <q-separator />

    <q-card-section horizontal class="card-body-height">
      <img class="img-exercise" :src="getExerciseImage(data.id + data.imageUrl)" />

      <q-card-section> {{ data.description }} </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions class="items-center" align="right">
      <q-btn
        rounded
        flat
        color="secondary"
        size="sm"
        icon="edit"
        @click="$emit('editItem', data.id)"
      >
      </q-btn>

      <q-btn outline color="primary" size="sm">
        <NuxtLink class="no-style" :to="'/exercisetemplate/' + data.id"
          >подробнее</NuxtLink
        ></q-btn
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
const emits = defineEmits(["onUpdateField", "editItem"]);
</script>

<style scoped>
.exercise-card {
  height: 196px;
  max-height: 196px;
  width: 100%;
}
.img-exercise {
  object-fit: cover;
  max-height: 94px;
  height: 94px;
}
.card-body-height {
  max-height: 102px;
}
</style>
