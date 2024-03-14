<template>
  <div></div>
</template>

<script lang="ts" setup>
import { QSpinnerBall } from "quasar";
import { useQuasar } from "quasar";
const $q = useQuasar();
const messages = [" 5", " 4", " 3", " 2", " 1"];
const currentMessageIndex = ref(0);

const start = async () => {
  const audio = new Audio("/sound/5sec.mp3");
  audio.play();
  for (const message of messages) {
    $q.loading.show({
      message:
        '<div class="text-h4">Начинаем через</div>' +
        '<div class="text-h1">' +
        message +
        "</div>",
      spinner: QSpinnerBall,
      html: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    audio.play();
    $q.loading.hide();
  }
};
defineExpose({
  start,
});
</script>

<style></style>
