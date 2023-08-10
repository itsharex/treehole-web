<script setup lang="ts">
import TCard from "./t-card.vue";
import {TopicList} from "../api/topic";
import PullDown from "./pulldown.vue";
import {PropType} from "vue";

defineProps({
  topic: {
    type: Array as PropType<TopicList>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  refresh: Function,
  inRefresh: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="max-width-1280 view">
    <PullDown v-if="inRefresh && topic.length" @refresh="refresh as Function"/>
    <t-card v-for="item in topic" :key="item.id" :data="item"/>
    <n-spin v-show="isLoading" style="height: 72px;"></n-spin>
  </div>
</template>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>