<template>
  <div>
    <BaseDialogForm ref="form" class="no-padding">
      <div class="row">
        <div class="col-12">
          <q-input
            bg-color="white"
            dense
            outlined
            v-model="store.currentItem.name"
            label="Название упражнения *"
            :rules="[(val) => !!val || 'Нужно указать значение']"
            :disable="store.loading"
            :input-style="{ fontSize: '12px' }"
          />
        </div>
      </div>
    </BaseDialogForm>
  </div>
</template>

<script lang="ts" setup>
import { usePlanStore } from "~/stores/plan";
const store = usePlanStore();
const form = ref(null);

const show = () => {
  form.value.show();
};
defineExpose({
  show,
});
</script>

<style></style>
