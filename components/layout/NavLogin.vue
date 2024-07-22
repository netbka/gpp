<template>
  <q-btn-dropdown
    v-show="isLoggedIn()"
    stretch
    flat
    data-nosnippet
    dropdown-icon="img:/icons/account.svg"
  >
    <div class="row q-pa-sm width-profile wrap justify-center items-center content-start">
      <div class="col-grow self-center">
        <div class="q-py-sm">
          <!-- <q-btn
            :label="$t('navbarlogin.profile')"
            outline
            size="sm"
            v-close-popup
            class="full-width"
            to="/profile"
          /> -->
          <NuxtLinkLocale
            v-close-popup
            class="no-style q-px-md text-sm button-like-span full-width text-primary text-uppercase"
            to="/profile"
          >
            <span>{{ $t("navbarlogin.profile") }}</span>
          </NuxtLinkLocale>
        </div>
        <q-btn
          color="primary"
          :label="$t('navbarlogin.logoff')"
          push
          outline
          size="sm"
          v-close-popup
          @click="logoff"
          class="full-width"
        />
      </div>
    </div>
  </q-btn-dropdown>

  <q-btn
    stretch
    flat
    :label="$t('navbarlogin.enter')"
    v-show="!isLoggedIn()"
    :to="localePath('/auth')"
    data-nosnippet
  />
</template>

<script lang="ts" setup>
//const user = useSupabaseUser();

const { logout, isLoggedIn } = useAuthUser();

const logoff = async () => {
  logout();
};
</script>

<style>
.button-like-span {
  display: inline-block; /* Allow setting width and height */
  padding: 5px 16px; /* Adjust padding as needed */
  border: 1px solid #008dda; /* Define border */
  border-radius: 4px; /* Add rounded corners */
  cursor: pointer; /* Set cursor to pointer on hover */
  text-align: center; /* Center text alignment */
  text-decoration: none; /* Remove underline */
  color: #000; /* Set text color */
  background-color: #5db3ff3d; /* Set background color */
  font-weight: 300; /* Make text bold (optional) */
  transition: all 0.2s ease-in-out; /* Add smooth transition on hover */
  font-size: 10px;
}
.width-profile {
  min-width: 150px;
  max-width: 150px;
  padding: 8px;
}
</style>
