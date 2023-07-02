<template>
  <button
    class="bg-gray-200 text-red-800 border rounded-md text-lg flex w-full justify-center md:w-60 py-2 hover:bg-red-100"
  >
    {{ name }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    name: String,
  },
});
</script>

<style></style>
