<script setup lang="ts">
onMounted(() => {
  document.oncontextmenu = () => false
})
</script>

<template>
  <n-message-provider>
    <router-view v-slot="{ Component,route }">
      <!--      <transition name="scale" mode="out-in">-->
      <component v-if="route.meta.ignoreCache" :is="Component" :key="route.fullPath"/>
      <keep-alive v-else>
        <component :is="Component" :key="route.fullPath"/>
      </keep-alive>
      <!--      </transition>-->
    </router-view>
  </n-message-provider>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
