<template>
  <div style="display: inline">
    <!-- style="width: 350px; padding: 0 !important" -->
    <span v-show="visibleEdit" class="float-left parent">
      <q-select
        bg-color="white"
        dense
        v-model="model"
        use-input
        hide-selected
        fill-input
        input-style=""
        class="super-small float-right child"
        option-value="id"
        option-label="name"
        :options="options"
        @filter="filterFn"
        @update:model-value="setModel"
        input-debounce="100"
        ref="selectExerciseTemplate"
      >
        <template v-slot:after>
          <q-icon size="sm" name="done" @click="save()" class="cursor-pointer" />
          <q-icon size="sm" name="clear" @click="remove(this)" class="cursor-pointer" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-img
                :src="getImageFromStorage('exerciseTemplate', scope.opt.id)"
                fit="scale-down"
                :error-src="errorImage"
                style="max-width: 65px; height: 65px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ scope.opt.name }} </q-item-label>
              <q-item-label caption>
                <span
                  v-for="muscle in scope.opt.exerciseTemplateMuscle"
                  :key="muscle.id"
                  class="text-weight-bold"
                >
                  {{ muscle.name + " " }}
                </span>
              </q-item-label>
              <q-item-label caption
                ><span class="text-weight-thin">сложность:</span>
                <q-rating
                  v-model="scope.opt.level"
                  size="1em"
                  max="3"
                  readonly
                  class="q-mr-md"
                  icon="fitness_center"
                  :color-selected="['red-12', 'red-13', 'red-14']"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
          <div style="display: flex; justify-content: center">
            <q-separator style="width: 90%"></q-separator>
          </div>
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Не нашел в базе
              <div>
                <q-btn
                  outline
                  size="sm"
                  icon="add"
                  label="добавить?"
                  @click="addCustomExercise"
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </span>
    <span
      v-show="!visibleEdit"
      :class="['text-weight-light inline', { 'border-edit': !readOnly }]"
      @click="changeVisibility"
    >
      {{ model.name }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import errorImage from "/exerciseSmall.png";
const props = defineProps({
  data: {
    type: [Object],
    //default: 0,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const selectExerciseTemplate = ref(null);
let model = ref({ name: "" });
model = Object.assign({}, props.data);

const emits = defineEmits([
  "onUpdateExercise",
  "onDeleteExercise",
  "onAddCustomExercise",
]);

const options = ref([]);
const store = exerciseTemplateStore();

options.value = Object.assign([], store.itemArray);

let searchVal = ref("");
const addCustomExercise = () => {
  emits("onAddCustomExercise", props.data.id, searchVal.value);
};

const filterFn = (val, update, abort) => {
  update(() => {
    if (val.length === 0) {
      options.value = [...store.itemArray];

      return;
    }
    const needle = val.toLocaleLowerCase();
    options.value = searchExercise(store.itemArray, needle);
    searchVal.value = val;
  });
};
const setModel = (val) => {
  model = val;
};

const visibleEdit = ref(false);
visibleEdit.value = props.editable;
const changeVisibility = () => {
  if (props.readOnly) return;
  //if (props.modelValue.length === 0) return;
  visibleEdit.value = !visibleEdit.value;
};

const save = () => {
  if (model.name.length < 1) {
    notifyMsgNegative("Нужно выбрать значение");
    return;
  }

  visibleEdit.value = !visibleEdit.value;

  emits("onUpdateExercise", props.data.id, model);
};
const remove = (val) => {
  if (!model.name) {
    notifyMsgNegative("Нужно выбрать значение");
    return;
  }
  visibleEdit.value = !visibleEdit.value;
};
</script>

<style scoped>
.parent {
  width: 100%;
  display: flex; /* Enable Flexbox for the parent */
}

.child {
  flex: 0 0 100%; /* Set flex properties for the child element */
}
@media (min-width: 768px) {
  .child {
    max-width: 640px;
  }
}
</style>
