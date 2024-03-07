<template>
  <div>
    <iframe
      :src="`https://sfu.mirotalk.com/join/${props.videoId}`"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="sizing"
    >
    </iframe>
    {{ `https://sfu.mirotalk.com/join/${props.videoId}` }}
  </div>
</template>

<script setup>
const props = defineProps({
  videoId: {
    type: String,
    required: true,
    default: "talk",
  },
});
</script>
<style>
.sizing {
  min-width: 400px;
  min-height: 600px;
}
</style>
