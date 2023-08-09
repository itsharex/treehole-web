<script setup lang="ts">
import NavBar from "../../components/nav-bar.vue";
import TCard from "../../components/t-card.vue";
import {GetOneTopic, Topic} from "../../api/topic";
import router from "../../router";

const data = reactive({
  topic: {} as Topic,
})

GetOneTopic(Number(router.currentRoute.value.params.id)).then(res => {
  data.topic = res.data
})
</script>

<template>
  <div>
    <nav-bar/>
    <div class="flex padding-1 max-width-1280">
      <t-card :data="data.topic"/>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
}
</style>