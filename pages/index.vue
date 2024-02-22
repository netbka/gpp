<template>
  <div class="row back_main">
    <div class="col-5">
      <h1 class="text-white text-bold leading-tight q-pa-md">
        Dr Now. Connecting healthcare.
      </h1>
      <p class="text-h3">
        Video appointments available! Connect with your doctor from anywhere.
      </p>
      <!-- <NuxtLink to="/doctors" class="flex gap-2"> Book Appointment </NuxtLink> -->
    </div>
    <div class="col-7">
      <div class="">
        <img :src="background" alt="" class="window-height pic" />
      </div>
    </div>
  </div>
</template>

<script setup>
import background from "~/assets/images/mainpage_small.webp";
</script>

<style>
.bg-blue-teal-gradient {
  background: rgb(49, 130, 206);
  background: linear-gradient(
    90deg,
    rgba(49, 130, 206, 1) 0%,
    rgba(56, 178, 172, 1) 100%
  );
}

.pic {
  top: 0;
  position: absolute;
}
</style>
