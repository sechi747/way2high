<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Options {
  fontSize?: number
  fontFamily?: string
}

const msg = ref('Playground')

const list = ['北京工业大学(A)', '清华大学(77)', '北京大学', '中国人民大学7as', '7中国海洋大学', '山东科技大学']

const outsideList = ref<string[]>([])

// 获取真实文本长度
const getActualWidthOfText = (text: string, options: Options = {}): number => {
  const { fontSize = 16, fontFamily = 'Microsoft YaHei' } = options
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx!.font = `${fontSize}px ${fontFamily}`
  return ctx!.measureText(text).width
}

onMounted(() => {
  let spareWidth = 400 // 剩余可用的宽度
  const marginX = 20
  for (const item of list) {
    const textWidth = getActualWidthOfText(item) + marginX
    spareWidth = spareWidth - textWidth
    if (spareWidth >= 0)
      outsideList.value.push(item)
    else
      break
  }
  console.log('outsideList:::', outsideList.value)
})
</script>

<template>
  <div w-full h-full f-c-c>
    <div text-24px font-bold base font-mono mt-24px>
      {{ msg }}
    </div>

    <div flex-1 fcc>
      <div w-400px h-40px flex flex-wrap>
        <span v-for="(n, index) of list" :key="index" m-10px base>{{ n }}</span>
      </div>
    </div>
  </div>
</template>
