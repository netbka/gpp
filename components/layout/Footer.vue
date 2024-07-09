<template>
  <q-footer elevated class="bg-grey-1 text-primary gt-xs">
    <q-toolbar class="m-l">
      <q-toolbar-title class="row">
        <div class="col-grow text-body2 self-center">
          <NuxtLink class="no-style text-caption" to="/privacy-policy/">{{
            $t("navbarfooter.policy")
          }}</NuxtLink>
        </div>

        <div class="col-auto text-body2 self-center">
          <span
            >{{ $t("navbarfooter.i") }}<q-icon name="favorite" color="red" />{{
              $t("navbarfooter.sport")
            }}</span
          >
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
