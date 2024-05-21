<template>
  <q-btn-dropdown
    v-show="user"
    stretch
    flat
    data-nosnippet
    dropdown-icon="img:/icons/account.svg"
  >
    <div class="row q-pa-sm width-profile wrap justify-center items-center content-start">
      <div class="col-grow self-center">
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

  <q-btn stretch flat label="Вход" v-show="!user" to="/auth" data-nosnippet />
</template>

<script lang="ts" setup>
const user = useSupabaseUser();

const { logout } = useAuthUser();

const logoff = async () => {
  logout();
};
</script>

<style>
.width-profile {
  min-width: 150px;
  max-width: 150px;
  padding: 8px;
}
</style>
