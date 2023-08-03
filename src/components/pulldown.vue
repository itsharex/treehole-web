<script setup lang="ts">
import {useEventListener} from "@vueuse/core";

let startY = 0
const distance = ref(0)

const emits = defineEmits<{
  (event: 'refresh'): void
}>()

useEventListener(document, 'touchstart', (e) => {
  startY = e.touches[0].clientY
}, {passive: true})

useEventListener(document, 'touchmove', (e) => {
  const scrollTop = document.documentElement.scrollTop
  if (scrollTop > 0) {
    return
  }
  distance.value = e.touches[0].clientY - startY
}, {passive: true})

useEventListener(document, 'touchend', (e) => {
  if (e.changedTouches[0].clientY - startY > 200) {
    emits('refresh')
    distance.value = 0
  }
}, {passive: true})

</script>

<template>
  <div class="pull-down-refresh">
    {{ distance > 200 ? '释放刷新' : '下拉刷新👇' }}
  </div>
</template>

<style scoped>
.pull-down-refresh {
  display: flex;
  justify-content: center;
  position: relative;
  top: -0.5rem;
  height: fit-content;
  z-index: -1;
}
</style>