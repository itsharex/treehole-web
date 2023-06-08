<script setup lang="ts">
import {StarBorderFilled} from "@vicons/material";
interface Topic {
  id: number,
  created_at: string,
  content: string,
}

defineProps<{
  data: Topic
}>()
</script>

<template>
  <div class="card">
    <div class="top-bar">
      <n-text type="success">
        <strong>
          T#{{ data.id }}
        </strong>
      </n-text>
      <n-icon :color="'#ffb74d'" :size="24" style="margin-left: auto">
        <StarBorderFilled />
      </n-icon>
    </div>
    <div>
      <n-text :depth="'3'" style="font-size: smaller">
        {{ data.created_at }}
      </n-text>
    </div>
    <div class="text">{{ data.content }}</div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  max-height: 256px;
}

.text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.top-bar{
  display: flex;
  align-items: center;
}
</style>