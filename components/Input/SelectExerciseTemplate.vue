<template>
  <div style="display: inline">
    <span v-show="visibleEdit" class="float-left">
      <q-select
        bg-color="white"
        dense
        v-model="model"
        use-input
        hide-selected
        fill-input
        style="width: 250px; padding: 0 !important"
        input-style=""
        class="super-small float-right"
        option-value="id"
        option-label="name"
        :options="options"
        @filter="filterFn"
        @update:model-value="setModel"
      >
        <template v-slot:after>
          <q-icon size="sm" name="done" @click="save()" class="cursor-pointer" />
          <q-icon size="sm" name="clear" @click="remove(this)" class="cursor-pointer" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label> {{ scope.opt.name }} </q-item-label>
              <q-item-label caption>
                <b v-if="!(scope.opt.muscle === undefined)"
                  >{{ scope.opt.muscle.name }}
                </b>
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> Не нашел </q-item-section>
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
let model = ref({ name: "" });
model = Object.assign({}, props.data);

const visibleEdit = ref(false);
visibleEdit.value = props.editable;

const emits = defineEmits(["onUpdateExercise", "onDeleteExercise"]);

const options = ref([]);
const store = exerciseTemplateStore();

options.value = Object.assign([], store.itemArray);

const changeVisibility = () => {
  if (props.readOnly) return;
  //if (props.modelValue.length === 0) return;
  visibleEdit.value = !visibleEdit.value;
};

const filterFn = (val, update, abort) => {
  update(() => {
    if (val.length === 0) {
      options.value = [...store.itemArray];

      return;
    }
    const needle = val.toLocaleLowerCase();
    options.value = searchExercise(options.value, needle);
  });
};
const setModel = (val) => {
  model = val;
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

<style></style>
