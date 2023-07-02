!
<template>
  <button
    class="border-2 rounded-lg px-2 py-1 bg-slate-200 focus:bg-[#0e9f6e] focus:text-white transition-colors duration-500"
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
