<template>
  <div>
    <div class="bar blur">
      <div class="max-width-1280" style="display: flex;">
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
    </div>
    <div class="padding-1" style="display: flex;flex-direction: column">
      <t-list :is-loading="isLoading" :can-load="canLoad" :topic="topic" :on-load-more="onLoadMore"
              style="position: relative;top:72px"/>
      <n-button class="post" circle type="primary" @click.stop="router.push('/topic/edit')">
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
import router from "../../router";
import {useI18n} from "vue-i18n";
import TList from "../../components/t-list.vue";

const topic = ref<TopicList>([] as TopicList)

const message = useMessage()
const {t} = useI18n()
const canLoad = ref(false)
const isLoading = ref(false)

onMounted(() => {
  getTopic(10, 0).then(res => {
    topic.value = res.data
    if (res.data.length >= 10) {
      canLoad.value = true
    }
  })
})

const onLoadMore = () => {
  isLoading.value = true
  getTopic(10, <number>topic.value?.length).then(res => {
    if (res.data.length < 10) {
      message.info(t('topic.noMore'))
      canLoad.value = false
    }
    topic.value?.push(...res.data)
  }).finally(() => {
    isLoading.value = false
  })
}
</script>

<style scoped>
.bar {
  position: fixed;
  width: 100%;
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