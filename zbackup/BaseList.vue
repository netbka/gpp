<template>
  <div>
    <q-scroll-area class="scroll-height" :bar-style="barStyle()">
      <q-list bordered class="rounded-borders full-height max-height">
        <div v-for="item in listItems" :key="item.id">
          <q-item class="q-px-xs">
            <q-item-section>
              <q-item-label
                lines="1"
                class="text-subtitle1 text-weight-bold text-black q-pa-xs"
              >
                <q-icon
                  :name="publicPrivateIcon(item.public)"
                  class="q-mr-sm float-left"
                ></q-icon>
                <InputText
                  v-model="item.name"
                  @updatedb="updateItem('name', item.name, item.id)"
                ></InputText>
              </q-item-label>
            </q-item-section>
            <q-item-section top side class="self-center">
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  class=""
                  size="12px"
                  color="secondary"
                  flat
                  dense
                  round
                  icon="fitness_center"
                  @click="editTraining(item)"
                />
                <q-btn
                  class=""
                  size="12px"
                  flat
                  dense
                  round
                  icon="edit"
                  @click="edit(item)"
                />
                <q-btn
                  class=""
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                  @click="confirmDelete(item.id)"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </div>
      </q-list>
    </q-scroll-area>
    <BaseDialogYesNo ref="dialog" @ok="remove"></BaseDialogYesNo>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["edit"]);
const dialog = ref(null);

const store = useTrainingStore();

await store.fetchAll();

let listItems = computed(() => store.getItemArray);

const editTraining = async (val) => {
  var slug = val.id + "-" + val.name;
  const url = generateSlug(slug);
  await navigateTo({ path: "/training/" + url });
};

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
</script>

<style scoped></style>
