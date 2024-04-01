<template>
  <q-td class="text-center q-pa-xs">
    <q-btn
      dense
      outline
      size="sm"
      :icon="propExecuteBtn.icon"
      :color="propExecuteBtn.color"
      :label="propExecuteBtn.label"
      @click="$emit('executeItem')"
      v-if="propExecuteBtn.visible"
    >
      <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propExecuteBtn.tooltip }}
      </q-tooltip> -->
    </q-btn>

    <q-btn
      dense
      flat
      size="sm"
      :color="propEditBtn.color"
      @click="$emit('editItem')"
      :icon="propEditBtn.icon"
      v-if="propEditBtn.visible"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propEditBtn.tooltip }}
      </q-tooltip>
    </q-btn>

    <q-btn
      dense
      flat
      size="sm"
      :color="propCustomBtn.color"
      @click="$emit('customAction')"
      :icon="propCustomBtn.icon"
      v-if="propCustomBtn.visible"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propCustomBtn.tooltip }}
      </q-tooltip>
    </q-btn>
    <q-btn
      dense
      flat
      size="sm"
      :color="propDeleteBtn.color"
      @click="$emit('deleteItem')"
      :icon="propDeleteBtn.icon"
      v-if="propDeleteBtn.visible"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propDeleteBtn.tooltip }}
      </q-tooltip>
    </q-btn>
  </q-td>
</template>

<script lang="ts" setup>
const emits = defineEmits(["executeItem", "editItem", "customAction", "deleteItem"]);
const props = defineProps({
  propExecuteBtn: {
    Type: Object,
    default: {
      icon: "play_circle_outline",
      tooltip: "Старт",
      visible: true,
      label: "",
    },
  },
  propEditBtn: {
    Type: Object,
    default: { icon: "icon", tooltip: "Edit", visible: false, color: "green" },
  },
  propCustomBtn: {
    Type: Object,
    default: { icon: "", tooltip: "", visible: false, label: "" },
  },
  propDeleteBtn: {
    Type: Object,
    default: { icon: "delete", tooltip: "Delete", visible: false },
  },
});
</script>
