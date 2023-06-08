<script setup lang="ts">
import {isLogin} from "../../utils/auth";
import router from "../../router";
import {useI18n} from "vue-i18n";

const message = useMessage()
const {t} = useI18n()

onBeforeMount(() => {
  if (!isLogin()) {
    message.info(t('login.first'))
    router.push('/login')
  }
})
</script>

<template>
  <div>
my
  </div>
</template>

<style scoped>

</style>