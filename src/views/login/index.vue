<template>
  <n-h1 prefix="bar">
    <n-text type="success">
      Login
    </n-text>
  </n-h1>
  <n-space vertical size="large">
    <n-input round :placeholder="$t('input.mail')">

    </n-input>
    <n-input round :placeholder="$t('input.password')">

    </n-input>
    <n-button type="primary">{{ $t('login') }}</n-button>
  </n-space>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>