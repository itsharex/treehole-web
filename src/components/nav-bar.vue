<script setup lang="ts">
import {ArrowBackRound} from "@vicons/material";
import router from "../router";
</script>

<template>
  <div class="bar blur">
    <div class="max-width-1280" style="display: flex;height: 100%">
      <n-button text @click="router.go(-1)" style="margin-left: 16px">
        <template #icon>
          <n-icon size="22">
            <ArrowBackRound/>
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<style scoped>
.bar {
  height: 3rem;
  width: 100%;
  position: sticky;
  top: 0;
}
</style>