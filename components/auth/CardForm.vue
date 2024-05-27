<template>
  <q-card class="card-default">
    <q-card-section>
      <div class="text-h5 text-center">{{ heading }}</div>
      <div class="text-overline text-center">{{ subheading }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-sm">
      <q-form @submit="$emit('onSubmit')">
        <slot></slot>
      </q-form>
    </q-card-section>
    <q-card-actions align="around">
      <slot name="actions"></slot>
    </q-card-actions>
    <q-card-section v-if="showSocial">
      <q-separator />
      <div class="row q-mt-sm">
        <div class="col">
          <q-btn
            align="between"
            @click="socialLogin('google')"
            label="Google"
            class="full-width btn_google"
            :style="{ backgroundImage: 'url(' + website_google_icon() + ')' }"
          >
          </q-btn>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-btn
            align="between"
            @click="socialLogin('facebook')"
            label="Facebook"
            class="full-width btn_fb"
            :style="{ backgroundImage: 'url(' + website_fb_icon() + ')' }"
          >
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  showSocial: {
    type: Boolean,
    default: true,
  },

  heading: {
    type: String,
  },
  subheading: {
    type: String,
  },
});
const store = authStore();
const { login, loginWithSocialProvider } = useAuthUser();
const socialLogin = async (provider: string) => {
  loginWithSocialProvider(provider);
};
</script>

<style scoped>
.btn_fb {
  min-width: 260px;
  color: #fff;
  /* background-image: url(/icons/facebook-icon.svg); */
  background-position: 10px center !important;
  background-repeat: no-repeat !important;
  background-size: 24px !important;
  margin-bottom: 20px !important;
  padding-left: 42% !important;
  text-shadow: none !important;
  background-color: #3b5998 !important;
  border-width: 1px;
  border-color: gray !important;
  border-style: ridge;
}
.btn_google {
  min-width: 260px;

  /* background-image: url(/icons/google-icon.svg); */
  background-position: 10px center !important;
  background-repeat: no-repeat !important;
  background-size: 24px !important;
  margin-bottom: 20px !important;
  padding-left: 42% !important;
  text-shadow: none !important;

  border-width: 1px;
  border-color: grey !important;
  border-style: ridge;
}
</style>
