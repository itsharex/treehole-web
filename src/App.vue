<script setup lang="ts">
document.oncontextmenu = () => false
</script>

<template>
  <n-message-provider>
    <router-view v-slot="{ Component,route }">
      <!--      <transition :name="route.meta.transition">-->
      <component v-if="route.meta.ignoreCache" :is="Component" :key="route.fullPath"/>
      <keep-alive v-else>
        <component :is="Component" :key="route.path"/>
      </keep-alive>
      <!--      </transition>-->
    </router-view>
  </n-message-provider>
</template>

<style scoped>

</style>
