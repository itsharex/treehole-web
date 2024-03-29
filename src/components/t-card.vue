<script setup lang="ts">
import {StarBorderFilled, VerifiedFilled, StarFilled} from "@vicons/material";
import {PutStar, Topic} from "../api/topic";
import dayjs from "dayjs";
import {useI18n} from "vue-i18n";
import {useEventListener} from "@vueuse/core";
import router from "../router";

const props = defineProps<{
  data: Topic,
}>()

const message = useMessage()
const {t} = useI18n()

const handleStar = (id: number) => {
  PutStar(id).then(res => {
    if (res.data === 20001) {
      props.data.starred = true
      props.data.star_count ? props.data.star_count++ : props.data.star_count = 1
      message.success(t('star.success'))
    } else if (res.data === 20002) {
      props.data.starred = false
      if (props.data.star_count) {
        if (--props.data.star_count === 0) {
          delete props.data.star_count
        }
      }
      message.info(t('star.cancel'))
    }
  })
}

const isDetail = computed(() => {
  return router.currentRoute.value.path.indexOf('topic') !== -1
})

const handleClick = () => {
  if (isDetail.value) {
    return
  }
  router.push({
    path: '/topic/' + props.data.id,
  })
}

const el = ref<HTMLElement>()

useEventListener(el, 'mousedown', (e: MouseEvent) => {
  if (e.button === 2) {
    console.log('right click')
  }
})
</script>

<template>
  <div ref="el" class="card" @click.stop="handleClick">
    <div class="top-bar">
      <n-text type="success" class="mr-8">
        <strong>
          T#{{ data.id }}
        </strong>
      </n-text>
      <n-text type="success" class="mr-4">
        {{ data.campus }}
      </n-text>
      <n-icon v-show="data.verified" :color="'#18a058'" size="18">
        <VerifiedFilled/>
      </n-icon>
      <n-icon @click.stop="handleStar(data.id)" :color="'#ffb74d'" size="22" style="margin-left: auto">
        <StarFilled v-if="data.starred"/>
        <StarBorderFilled v-else/>
      </n-icon>
      <div style="color: #ffb74d">
        {{ data.star_count }}
      </div>
    </div>
    <div>
      <n-text :depth="'3'" style="font-size: smaller">
        {{ dayjs(data.created_at).fromNow() }}
      </n-text>
    </div>
    <div class="text-detail">{{ data.content }}</div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  max-height: 256px;
  box-shadow: 2px 2px 80px rgba(0, 0, 0, 0.07);
  transition: all 0.2s ease-in-out;
}

.text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.text-detail {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.top-bar {
  display: flex;
  align-items: center;
}

.mr-8 {
  margin-right: 8px;
}

.mr-4 {
  margin-right: 4px;
}

.card:hover {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.02),
  2px 2px 5px rgba(0, 0, 0, 0.028),
  4px 4px 10px rgba(0, 0, 0, 0.035),
  7px 7px 18px rgba(0, 0, 0, 0.042),
  13px 13px 33px rgba(0, 0, 0, 0.05),
  30px 30px 80px rgba(0, 0, 0, 0.07);
  cursor: pointer;
}
</style>