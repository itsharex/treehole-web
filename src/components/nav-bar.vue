<script setup lang="ts">
import {ArrowBackRound} from "@vicons/material";
import router from "../router";
</script>

<template>
  <div class="bar blur">
    <n-button text @click="router.go(-1)" style="margin-left: 16px">
      <template #icon>
        <n-icon size="22">
          <ArrowBackRound/>
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  height: 3rem;
  width: 100%;
  position: sticky;
  top: 0;
}
</style>