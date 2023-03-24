<script setup lang="ts">
import { useRouter } from 'vue-router'
import ToggleColorMode from './ToggleColorMode.vue'

const router = useRouter()

const menuList = [
  { title: '首页', pathName: 'HomePage' },
  { title: '演练场', pathName: 'Playground' },
]

const changePath = (pathName: string) => router.push({ name: pathName })
</script>

<template>
  <div
    w-200px py-30px
    border="r-1 r-solid gray-300/50 important-dark:gray-300/20"
    f-c-c
  >
    <ToggleColorMode mb-24px />

    <button v-for="(menu, index) of menuList" :key="index" btn font-mono w-150px mb-16px @click="changePath(menu.pathName)">
      {{ menu.title }}
    </button>
  </div>
</template>
