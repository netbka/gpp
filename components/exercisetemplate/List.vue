<template>
  <div>
    <q-scroll-area class="scroll-height" :bar-style="barStyle()">
      <q-list bordered class="rounded-borders full-height max-height">
        <div v-for="(muscleGroup, muscleGroupName) in groupedData" :key="muscleGroupName">
          <q-item-label
            header
            class="text-subtitle1 text-weight-bold text-black text-uppercase q-pa-md"
            >{{ muscleGroupName }}</q-item-label
          >
          <div v-for="exercise in muscleGroup" :key="exercise.id">
            <q-item>
              <q-item-section top>
                <q-item-label lines="1" class="no-wrap ellipsis">
                  <InputText
                    v-model="exercise.name"
                    @updatedb="updateItem('name', exercise.name, exercise.id)"
                  ></InputText>
                  <span class="text-grey-8 q-ml-sm self-center">
                    {{ exercise.duration }} сек.</span
                  >
                </q-item-label>

                <q-item-label lines="1" class="q-mt-xs text-caption self-center">
                  <span class="self-center">
                    <q-icon :name="publicPrivateIcon(exercise.public)" size="xs"></q-icon>
                    {{
                      exercise.public
                        ? "Публичное. Могут добавить все"
                        : "Частное. Вижу только я."
                    }}</span
                  >
                </q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="edit"
                    @click="edit(exercise)"
                  />
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="confirmDelete(exercise.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-list>
    </q-scroll-area>
    <BaseYesNoDialog ref="dialog" @ok="remove"></BaseYesNoDialog>
  </div>
</template>

<script lang="ts" setup>
const dialog = ref(null);

const store = useExerciseTemplateStore();
let groupedData = computed(() => store.getGroupedArray());
const emits = defineEmits(["edit"]);
//console.log(groupedData);
await store.fetchAll();
const confirmDelete = (id) => {
  dialog.value.show(id);
};
const edit = (val) => {
  store.currentItem = val;

  emits("edit");
};

const remove = (id) => {
  store.deleteItem(id);
};

const updateItem = async (field, val, id) => {
  await store.updateItemField(field, val, id);
};

// const publicPrivateIcon = (val) => {
//   return val ? "public" : "lock";
// };
</script>

<style scoped></style>
