<template>
  <div ref="scroll" style="height: 100vh;overflow-y: auto">
    <div class="bar blur max-width-1280">
      <h3 style="margin-left: 1.5rem">
        <n-text type="success">
          TreeHole
        </n-text>
      </h3>
      <n-button text style="margin-left: auto;margin-right: 1.5rem" @click="router.push('/my')">
        <template #icon>
          <n-icon size="28">
            <AccountCircleOutlined/>
          </n-icon>
        </template>
      </n-button>
    </div>
    <div class="view padding-1 max-width-1280">
      <t-card v-for="item in topic" :key="item.id" :data="item"/>
      <n-spin v-if="canLoad"></n-spin>
      <n-button class="post" circle type="primary" @click="router.push('/topic/edit')">
        <template #icon>
          <n-icon size="32">
            <CreateFilled/>
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getTopic, TopicList} from "../../api/topic";
import {AccountCircleOutlined, CreateFilled} from "@vicons/material";
import TCard from "../../components/t-card.vue";
import router from "../../router";
import {useI18n} from "vue-i18n";
import {useInfiniteScroll} from "@vueuse/core";

const topic = ref<TopicList>()

const message = useMessage()
const {t} = useI18n()
const scroll = ref<HTMLElement>()
let canLoad = ref(false)

onMounted(() => {
  getTopic(10, 0).then(res => {
    topic.value = res.data
    if (res.data.length >= 10) {
      canLoad.value = true
    }
  })
})

useInfiniteScroll(scroll,
    () => {
      if (canLoad.value) {
        getTopic(10, <number>topic.value?.length).then(res => {
          if (res.data.length < 10) {
            message.info(t('topic.noMore'))
            canLoad.value = false
          }
          topic.value?.push(...res.data)
        })
      }
    },
    {
      interval: 1000,
    },
)
</script>

<style scoped>
.bar {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
}

.view {
  display: flex;
  flex-direction: column;
}

.post {
  position: sticky;
  align-self: end;
  bottom: 1rem;
  width: 64px;
  height: 64px;
  box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.5);
}
</style>