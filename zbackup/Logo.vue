<template>
  <div class="flex">
    <NuxtLink to="/" class="flex gap-2">
      <img :src="logo" class="h-10" /> <slot></slot
    ></NuxtLink>
  </div>
</template>
<script setup>
import logo from "/logo110.png";
</script>
