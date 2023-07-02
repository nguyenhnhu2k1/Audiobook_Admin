import VueCookies from 'vue3-cookies'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cookies: VueCookies;
  }
}