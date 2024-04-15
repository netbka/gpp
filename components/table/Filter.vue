<template>
  <div>
    <div class="row q-my-lg">
      <div class="col-12">
        <q-input
          class="q-ml-xs"
          dense
          debounce="300"
          color="primary"
          label-color="black"
          v-model="filter"
          label="Поиск"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-my-lg q-ml-xs">
      <div class="col-12">
        <span>Сложность</span>
        <q-rating
          color="primary"
          v-model="level"
          size="1.5em"
          max="3"
          class="q-ml-md"
          icon="fitness_center"
          :color-selected="['red-12', 'red-13', 'red-14']"
        />
      </div>
    </div>

    <!-- <div class="row q-my-lg">
      <div class="col-12">
        <InputSelectMuscle v-model="muscleIds"></InputSelectMuscle>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const filter = ref("");
const level = ref(0);
const muscleIds = ref([]);
</script>

<style></style>
