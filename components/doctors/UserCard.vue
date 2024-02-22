<template>
  <q-card flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="avatarSrc" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <div class="row">
          <div class="col-6">
            <q-item-label>{{ model.firstName }} {{ model.lastName }} </q-item-label>
            <q-item-label caption>{{ model.speciality?.name }} </q-item-label>
          </div>
          <div class="col-6 text-right">
            <q-chip square dense color="accent" outline>
              <q-avatar icon="place" color="" />
              {{ model.city }}
            </q-chip>
          </div>
        </div>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-8">
        <div class="text-subtitle1">Career summary</div>
        <span v-html="model.biography"></span>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        <div class="text-subtitle1">Specialities</div>
        <q-chip
          outline
          color="accent"
          text-color="white"
          icon="event"
          v-for="(item, index) in model.profilesMedicalSubSpecialities"
          :key="item.id"
        >
          {{ item.name }}
        </q-chip>
      </q-card-section>
    </q-card-section>
    <q-separator />

    <q-card-actions>
      <q-btn :to="toRoute" flat>Schedule </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { getProfile } from "~/composables/profileUpd";

const props = defineProps({
  modelValue: {
    type: Object,
  },
});
const { modelValue } = props;
const model = ref(modelValue);
const toRoute = ref(
  "/doctors/" +
    model.value.user_id +
    "-" +
    model.value.firstName +
    "-" +
    model.value.lastName
);
let avatarSrc = ref("");
avatarSrc.value = await getProfile(model.value.avatarPath);
</script>

<style></style>
