!
<template>
  <button
    class="bg-[#009966] text-white border rounded-md text-lg flex w-full justify-center md:w-60 py-2 hover:bg-green-800"
  >
    <img class="w-7" src="../assets/admin-img/add-svgrepo-com.svg" alt="" />
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
