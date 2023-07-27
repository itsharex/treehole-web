<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {postTopic} from "../../api/home";
import router from "../../router";
import NavBar from "../../components/nav-bar.vue";

const {t} = useI18n()
const text = ref('')
const message = useMessage()

const handleSubmit = () => {
  const value = text.value.trim()
  if (!value) {
    message.error(t('topic-edit.input'))
    return
  }
  if (value.length > 255) {
    message.error(t('topic-edit.limit'))
    return
  }
  postTopic({content: value}).then(() => {
    router.push('/')
    message.success(t('topic-edit.success'))
  })
}
</script>

<template>
  <div>
    <nav-bar />
    <div class="padding-1" style="display: flex;flex-direction: column;">
      <n-input type="textarea" :placeholder="t('topic-edit.placeholder')" maxlength="255" show-count
               :autosize="{minRows:5}" v-model:value="text" style="border-radius: 1rem">
      </n-input>
      <n-button round type="primary" @click="handleSubmit" style="align-self: end;margin-top: 1rem;min-width: 5rem">
        {{ t('topic-edit.submit') }}
      </n-button>
    </div>
  </div>
</template>

<style scoped>
</style>