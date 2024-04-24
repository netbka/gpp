<template>
  <q-btn-dropdown v-show="user" stretch flat icon="account_circle">
    <div class="row q-pa-sm width-profile wrap justify-center items-center content-start">
      <div class="col-grow self-center">
        <!-- <div class="text-center">
          <q-avatar size="72px">
            <img :src="profile" />
          </q-avatar>
        </div> -->
        <!-- <div class="text-subtitle2 q-mt-md q-mb-xs text-center ellipsis">
          {{ store.currentItem.firstName }} {{ store.currentItem.lastName }}
        </div> -->
        <div class="q-py-sm">
          <q-btn
            label="Мой профиль"
            outline
            size="sm"
            v-close-popup
            class="full-width"
            to="/profile"
          />
        </div>
        <q-btn
          color="primary"
          label="Выход"
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

  <q-btn stretch flat label="Вход" v-show="!user" to="/auth" />
</template>

<script lang="ts" setup>
const user = useSupabaseUser();

const { logout } = useAuthUser();

const logoff = async () => {
  logout();
};
</script>

<style>
.nounderline {
  text-decoration: none !important;
}
.borders {
  border: 1px solid #000;
  padding: 1px;
  text-decoration: none !important;
}

.width-profile {
  min-width: 150px;
  max-width: 150px;
  padding: 8px;
}
</style>
