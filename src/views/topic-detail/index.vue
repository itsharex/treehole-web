<script setup lang="ts">

import NavBar from "../../components/nav-bar.vue";
import TCard from "../../components/t-card.vue";
</script>

<template>
  <div>
    <nav-bar />
    <div class="flex padding-1 max-width-1280">
      <t-card data="" />
    </div>
  </div>
</template>

<style scoped>
.flex{
  display: flex;
  flex-direction: column;
}
</style>