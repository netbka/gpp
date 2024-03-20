<template>
  <div>
    <InputText
      v-model="model"
      @updatedb="onUpdateTextField"
      v-if="type === 'text'"
    ></InputText>
    <InputNumber
      v-model="model"
      @updatedb="onUpdateNumericField"
      v-if="type === 'number'"
    ></InputNumber>
  </div>
  <!-- @updatedb="$emit('onUpdateGroup', 'name', model, el.id)" -->
</template>

<script lang="ts" setup>
const props = defineProps({
  propControlConfig: { Type: Object, default: {} },
});

let model = ref(props.propControlConfig.prop.row[props.propControlConfig.prop.col.name]);
let type = ref(props.propControlConfig.prop.col.type);

const emits = defineEmits(["onUpdateField"]);

const onUpdateTextField = () => {
  
  emits(
    "onUpdateField",
    props.propControlConfig.prop.col.name,
    model.value,
    props.propControlConfig.prop.row.id
  );
};
const onUpdateNumericField = () => {
  emits(
    "onUpdateField",
    props.propControlConfig.prop.col.name,
    Number(model.value),
    props.propControlConfig.prop.row.id
  );
};

watch(
  () => props.propControlConfig.prop.row[props.propControlConfig.prop.col.name],
  (newVal) => {
    model.value = newVal;
  },
  { deep: true }
);
</script>

<style></style>
