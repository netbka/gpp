<template>
  <div class="fit row shadow-1 q-py-sm no-wrap ellipsis justify-between q-mb-xs">
    <div class="col-auto self-center">
      <q-btn
        icon="arrow_back_ios"
        size="sm"
        class="q-mx-xs padding-2"
        outline
        @click="back()"
      ></q-btn>
    </div>
    <div class="col-auto" v-if="!props.readOnly">
      <q-btn
        outline
        color="primary"
        class="q-mr-xs"
        icon="30fps_select"
        @click="$emit('setDuration', 30)"
        size="sm"
      />
      <q-btn
        icon="60fps_select"
        outline
        color="primary"
        class="q-mr-xs"
        @click="$emit('setDuration', 60)"
        size="sm"
      />
      <q-btn
        outline
        color="primary"
        class="q-mr-xs"
        label="90"
        @click="$emit('setDuration', 90)"
        size="sm"
      />
    </div>
    <div class="col-auto">
      <q-btn
        :disable="store.getDuration == 0"
        icon="outlined_flag"
        outline
        @click="$emit('start')"
        class="q-mr-xs"
        color="secondary"
        size="sm"
        >Go</q-btn
      >
      <!-- <q-btn
        icon="library_add"
        outline
        @click="$emit('addGroup')"
        class="q-mr-xs"
        color="green-7"
        size="sm"
      ></q-btn> -->
      <q-btn
        v-if="!props.readOnly"
        icon="save"
        outline
        @click="$emit('onSaveTraining')"
        color="light-blue-9"
        size="sm"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();
const back = async () => {
  await navigateTo({ path: "/" + router.currentRoute.value.fullPath.split("/")[1] });
  //console.log();
};
const store = trainingStore();
</script>

<style></style>
