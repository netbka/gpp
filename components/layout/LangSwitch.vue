<template>
  <q-btn-dropdown
    color="primary"
    :label="i18nLocale.localeProperties.value.shortname"
    :icon="'img:' + selectLanguageFlag(i18nLocale.locale.value)"
  >
  <!--  -->
    <q-list>
    
      <q-item clickable v-close-popup v-for="item in locales" :key="item.code">
      <NuxtLink :to="switchLocalePath(item.code)" class="no-style">
        <q-item-section >
        <div class="row justify-between">
         
          <div class="col-shrink">
          
          <img
              :src="selectLanguageFlag(item.code)"
              sizes="'(max-width: 20px) 20px, (max-width: 20px) 20px, 20px'"
              style="max-height: 20px"
              fit="scale-down"
              class="q-pr-lg"
            >
            </img>
            <!--</div>
              <div class="col"> -->
          
             {{ item.name }}
            
          
          </div>
        </div>
          

          <!-- <q-item-label>{{ item.shortname }}</q-item-label> -->
        </q-item-section>
        </NuxtLink>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts" setup>
const { locales, locale, setLocale } = useI18n();
const cookieLocale = useCookieLocale()
const language = computed({
  get: () => locale.value,
  set: (value) => {
    
    cookieLocale.value = value;
    setLocale(value);
    
  },
});
const switchLocalePath = useSwitchLocalePath();
const i18nLocale = useI18n();

//console.log(selectLanguageFlag(i18nLocale.locale.value));
//.localeProperties.value);
</script>

<style></style>
