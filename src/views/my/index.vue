<script setup lang="ts">
import {isLogin} from "../../utils/auth";
import router from "../../router";

onMounted(() => {
  if (!isLogin()) {
    router.push('/login')
  }
})
</script>

<template>
  my
</template>

<style scoped>

</style>