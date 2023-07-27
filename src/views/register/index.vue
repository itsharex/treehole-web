<script setup lang="ts">
import {getCampusList, register, RegisterData, sendGr, SendGrData} from "../../api/account";
import {grKey, setToken} from "../../utils/auth";
import {useI18n} from "vue-i18n";
import {onlyAllowNumber} from "../../utils/validate";
import router from "../../router";
import NavBar from "../../components/nav-bar.vue";

const formValue = reactive<RegisterData>({} as RegisterData)
const pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
const message = useMessage()
const {t} = useI18n()
const disabled = ref(false)
const grText = ref()
const campusList = ref([])
const campusListLoading = ref(false)

onBeforeMount(() => {
  grText.value = t('input.getCode')
})

const gr = (email: string) => {
  const data: SendGrData = {
    email,
  }
  sendGr(data).then(() => {
    message.success(t('sendGr.success'))
    let time = 90
    disabled.value = true
    setInterval(() => {
      if (time === 0) return
      time--
      grText.value = `${time}s`
    }, 1000)
    setTimeout(() => {
      grText.value = t('input.getCode')
      disabled.value = false
    }, time * 1000)
  })
}

const handleGetCode = () => {
  const email = formValue.email?.trim()
  if (!email) {
    message.error(t('input.mail'))
    return
  }
  if (!pattern.test(email)) {
    message.error(t('input.mailErr'))
    return
  }
  gr(email)
}

const handleReg = () => {
  const value = Object.assign({}, formValue)
  if (!value.email) {
    message.error(t('input.mail'))
    return
  }
  if (!value.captcha) {
    message.error(t('input.captcha'))
    return
  }
  if (!value.password) {
    message.error(t('input.password'))
    return
  }
  register(value).then(res => {
    message.success(t('register.success'))
    setToken(res.data.token)
    router.replace('/')
  })
}

const handleSearch = (value: string) => {
  value = value.trim()
  if (!value) {
    campusList.value = []
    return
  }
  campusListLoading.value = true
  getCampusList({name: value}).then(res => {
    campusList.value = res.data.campus
  }).finally(() => {
    campusListLoading.value = false
  })
}
</script>

<template>
  <div>
    <nav-bar />
    <div class="padding-1">
      <n-h1 prefix="bar">
        <n-text type="success">
          {{ $t('register.text') }}
        </n-text>
      </n-h1>
      <n-space vertical size="large">
        <form>
          <n-space vertical size="large">
            <n-input :placeholder="$t('input.mail')" v-model:value="formValue.email">
              <template #suffix>
                <n-button :disabled="disabled" text type="success" @click="handleGetCode">{{ grText }}</n-button>
              </template>
            </n-input>
            <n-input :placeholder="$t('input.captcha')" v-model:value="formValue.captcha"
                     :allow-input="onlyAllowNumber"/>
            <!--suppress TypeScriptValidateTypes -->
            <n-input :placeholder="$t('input.password')" v-model:value="formValue.password" type="password"
                     :input-props="{ autocomplete: 'off' }"/>
            <n-select filterable clearable remote v-model:value="formValue.campusId" :placeholder="$t('input.campus')"
                      :options="campusList" :loading="campusListLoading" @search="handleSearch" label-field="name"
                      value-field="id"/>
          </n-space>
        </form>
        <n-space style="display: flex;flex-direction: row-reverse" size="small">
          <n-button style="min-width: 5rem" type="primary" @click="handleReg">{{ $t('register') }}</n-button>
        </n-space>
      </n-space>
    </div>
  </div>
</template>

<style scoped>

</style>