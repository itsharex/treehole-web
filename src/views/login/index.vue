<template>
  <div>
    <nav-bar/>
    <div class="padding-1 max-width-1280">
      <n-h1 prefix="bar">
        <n-text type="success">
          {{ $t('login.text') }}
        </n-text>
      </n-h1>
      <n-space vertical size="large">
        <form>
          <n-space vertical size="large">
            <n-input round :placeholder="$t('input.mail')" v-model:value.trim="formValue.email"/>
            <!--suppress TypeScriptValidateTypes -->
            <n-input round :placeholder="$t('input.password')" v-model:value="formValue.password" type="password"
                     :input-props="{ autocomplete: 'on' }"/>
          </n-space>
        </form>
        <n-space style="display: flex;flex-direction: row-reverse" size="small">
          <n-button type="primary" round style="min-width: 5rem" @click="handleLogin">{{ $t('login.text') }}</n-button>
          <n-button round style="min-width: 5rem" @click="router.push('/register')">{{ $t('register') }}</n-button>
        </n-space>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import {login, LoginData} from "../../api/account";
import {useI18n} from "vue-i18n";
import crypto from "crypto-js";
import {setToken} from "../../utils/auth";
import router from "../../router";
import NavBar from "../../components/nav-bar.vue";

const formValue = reactive<LoginData>({} as LoginData)

const message = useMessage()
const {t} = useI18n()

const handleLogin = () => {
  const value = Object.assign({}, formValue)
  if (!value.email) {
    message.error(t('input.mail'))
    return
  }
  if (!value.password) {
    message.error(t('input.password'))
    return
  }
  value.password = crypto.SHA256(value.password).toString()
  login(value).then(res => {
    message.success(t('login.success'))
    setToken(res.data.token)
    const {redirect, ...othersQuery} = router.currentRoute.value.query
    router.push({
      path: (redirect as string) || '/',
      query: {
        ...othersQuery,
      }
    })
  })
}
</script>

<style scoped>

</style>