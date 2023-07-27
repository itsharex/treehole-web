<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {AccountInfo, getAccountInfo} from "../../api/account";
import {VerifiedFilled} from "@vicons/material";
import NavBar from "../../components/nav-bar.vue";

const message = useMessage()
const {t} = useI18n()

const accountInfo = reactive({} as AccountInfo)

onMounted(() => {
  getAccountInfo().then(res => {
    accountInfo.campus_name = res.data.campus_name
    accountInfo.verified = res.data?.verified
  })
})
</script>

<template>
  <div>
    <nav-bar />
    <div class="view padding-1">
      <div class="account" >
        <n-text type="success" >
          <strong>
            {{ accountInfo.campus_name }}
          </strong>
        </n-text>
        <n-icon v-if="accountInfo.verified" :color="'#18a058'" size="18">
          <VerifiedFilled/>
        </n-icon>
        <n-button v-if="accountInfo.verified" round type="primary" disabled style="margin-left: auto" >
          已认证
        </n-button>
        <n-button v-else round type="primary" style="margin-left: auto" >
          去认证
        </n-button>
      </div>
      <n-h2 prefix="bar">
        <n-text type="success">
          Stars
        </n-text>
      </n-h2>
      <div style="height: 2000px"></div>
    </div>
  </div>
</template>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
}

.account {
  display: flex;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  align-items: center;
}
</style>