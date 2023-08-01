<script setup lang="ts">
import TCard from "./t-card.vue";
import {TopicList} from "../api/topic";
import {useInfiniteScroll} from "@vueuse/core";

const props = defineProps<{
  topic: TopicList,
  canLoad: boolean,
  isLoading: boolean,
  onLoadMore: Function,
}>()

useInfiniteScroll(document,
    () => {
      if (props.canLoad) {
        props.onLoadMore()
      }
    },
    {
      interval: 1000,
    },
)
</script>

<template>
  <div class="max-width-1280 view">
    <t-card v-for="item in topic" :key="item.id" :data="item"/>
    <n-spin v-if="isLoading" style="height: 72px;"></n-spin>
  </div>
</template>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
}
</style>