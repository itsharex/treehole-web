<template>
  <div class="view">
    <div class="bar">
      <n-h1 prefix="bar">
        <n-text type="success">
          TreeHole
        </n-text>
      </n-h1>
      <n-button text style="margin-left: auto;margin-right: 1rem" @click="router.push('/my')">
        <template #icon>
          <n-icon size="32">
            <AccountCircleOutlined/>
          </n-icon>
        </template>
      </n-button>
    </div>
    <t-card v-for="item in topic" :key="item.id" :data="item"/>
    <n-button class="post" circle type="primary" @click="router.push('/topic/edit')">
      <template #icon>
        <n-icon size="32">
          <CreateFilled/>
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getTopic, TopicList} from "../../api/home";
import {AccountCircleOutlined, CreateFilled} from "@vicons/material";
import TCard from "./components/t-card.vue";
import router from "../../router";

const topic = ref<TopicList>()

onMounted(() => {
  getTopic(10, 0).then(res => {
    topic.value = res.data
  })
})
</script>

<style scoped>
.bar {
  display: flex;
  align-items: baseline;
}

.view {
  display: flex;
  flex-direction: column;
  height: 100%;
//overflow: auto;
}

.post {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 64px;
  height: 64px;
  opacity: 0.9;
}
</style>