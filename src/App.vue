<script lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import AdminHeaderLayoutVue from "./components/AdminHeaderLayout.vue";
export default {
  components: {
    AdminHeaderLayoutVue,
  },
  setup() {
    const router = useRoute();
    const isLoginPage = computed(() => {
      return router.path !== "/";
    });
    return {
      isLoginPage,
    };
  },
};
</script>

<template>
  <div>
    <AdminHeaderLayoutVue v-if="isLoginPage" />
    <router-view />
  </div>
</template>

<style scoped></style>
