<template>
  home
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {getTopic} from "../../api/home";

onMounted(() => {
  getTopic(10,0).then(res => {
    console.log(res)
  })
})
</script>

<style scoped>

</style>