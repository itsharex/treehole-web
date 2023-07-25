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
    <t-card @handleStar="handleStar" v-for="item in topic" :key="item.id" :data="item"/>
    <n-button class="post" circle type="primary" @click="router.push('/topic/edit')">
      <template #icon>
        <n-icon size="32">
          <CreateFilled/>
        </n-icon>
      </template>
    </n-button>
    <div style="text-align: center">
      1.0.0
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getTopic, PutStar, TopicList} from "../../api/home";
import {AccountCircleOutlined, CreateFilled} from "@vicons/material";
import TCard from "./components/t-card.vue";
import router from "../../router";
import {useI18n} from "vue-i18n";

const topic = ref<TopicList>()

const message = useMessage()
const {t} = useI18n()

onMounted(() => {
  getTopic(10, 0).then(res => {
    topic.value = res.data
  })
})

const handleStar = (id: number) => {
  PutStar(id).then(res => {
    if (res.data === 20001) {
      for (let item of topic.value as TopicList) {
        if (item.id === id) {
          item.starred = true
          item.star_count ? item.star_count++ : item.star_count = 1
          break
        }
      }
      message.success(t('star.success'))
    } else if (res.data === 20002) {
      for (let item of topic.value as TopicList) {
        if (item.id === id) {
          item.starred = false
          if (item.star_count) {
            if (--item.star_count === 0) {
              delete item.star_count
            }
          }
          break
        }
      }
      message.info(t('star.cancel'))
    }
  })
}
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