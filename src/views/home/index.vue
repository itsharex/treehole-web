<template>
  <div>
    <div class="bar blur">
      <div class="max-width-1280" style="display: flex;">
        <h3 @click.stop="router.push('/')" style="margin-left: 1.5rem;cursor: pointer">
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
    <n-empty v-if="!topic.length" size="huge" :description="t('developing')" style="position: relative;top: 45vh">

    </n-empty>
    <div class="padding-1" style="display: flex;flex-direction: column">
      <t-list class="relative-top-3" in-refresh :refresh="getData" :is-loading="isLoading" :topic="topic"/>
      <n-button v-show="topic.length" class="post" circle type="primary" @click.stop="active = !active">
        <template #icon>
          <n-icon size="32">
            <CreateFilled/>
          </n-icon>
        </template>
      </n-button>
      <n-drawer style="border-radius:1rem 1rem 0 0" v-model:show="active" :placement="placement" resizable
                default-height="500">
        <n-drawer-content class="max-width-1280" :title="t('topic-edit.title')" closable>
          <n-input type="textarea" :placeholder="t('topic-edit.placeholder')" maxlength="2048" show-count
                   :autosize="{minRows:10}" v-model:value="text" style="border-radius: 1rem">
          </n-input>
          <template #footer>
            <n-button round type="primary" @click="handleSubmit" style="min-width: 5rem">
              {{ t('topic-edit.submit') }}
            </n-button>
          </template>
        </n-drawer-content>
      </n-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {getTopic, postTopic, TopicList} from "../../api/topic";
import {AccountCircleOutlined, CreateFilled} from "@vicons/material";
import router from "../../router";
import {useI18n} from "vue-i18n";
import TList from "../../components/t-list.vue";
import {useInfiniteScroll} from "@vueuse/core/index";
import type {DrawerPlacement} from "naive-ui";

const topic = ref<TopicList>([] as TopicList)

const message = useMessage()
const {t} = useI18n()
const isLoading = ref(false)
const active = ref(false)
const text = ref()
const placement = ref<DrawerPlacement>('bottom')
let canLoad = false

const getData = () => {
  getTopic(10, 0).then(res => {
    topic.value = res.data
    if (res.data.length >= 10) {
      canLoad = true
    }
  })
}


getData()
useInfiniteScroll(document,
    () => {
      if (router.currentRoute.value.path === '/')
        if (canLoad) {
          onLoadMore()
        }
    },
    {
      interval: 1000,
    },
)


const onLoadMore = () => {
  isLoading.value = true
  getTopic(10, <number>topic.value?.length).then(res => {
    if (res.data.length < 10) {
      message.info(t('topic.noMore'))
      canLoad = false
    }
    topic.value?.push(...res.data)
  }).finally(() => {
    isLoading.value = false
  })
}

const handleSubmit = () => {
  const value = text.value.trim()
  if (!value) {
    message.error(t('topic-edit.input'))
    return
  }
  if (value.length > 2048) {
    message.error(t('topic-edit.limit'))
    return
  }
  postTopic({content: value}).then(() => {
    text.value = ''
    active.value = false
    getData()
    message.success(t('topic-edit.success'))
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

.relative-top-3 {
  position: relative;
  top: 3rem
}
</style>