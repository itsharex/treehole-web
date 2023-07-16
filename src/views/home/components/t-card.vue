<script setup lang="ts">
import {StarBorderFilled, VerifiedFilled} from "@vicons/material";
import {Topic} from "../../../api/home";
import dayjs from "dayjs";

defineProps<{
  data: Topic
}>()
</script>

<template>
  <div class="card">
    <div class="top-bar">
      <n-text type="success" class="mr-8">
        <strong>
          T#{{ data.id }}
        </strong>
      </n-text>
      <n-text type="success" class="mr-4">
        {{ data.campus }}
      </n-text>
      <n-icon v-show="data.verified" :color="'#18a058'" size="18">
        <VerifiedFilled/>
      </n-icon>
      <n-icon :color="'#ffb74d'" size="24" style="margin-left: auto">
        <StarBorderFilled/>
      </n-icon>
    </div>
    <div>
      <n-text :depth="'3'" style="font-size: smaller">
        {{ dayjs(data.created_at).fromNow() }}
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

.top-bar {
  display: flex;
  align-items: center;
}

.mr-8 {
  margin-right: 8px;
}

.mr-4 {
  margin-right: 4px;
}
</style>