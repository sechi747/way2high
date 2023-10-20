<script setup lang="ts">
import VueSvg from './assets/vue.svg'
import RawText from './components/RawText.vue?raw'
import HelloWorld from '@/components/HelloWorld.vue'
import StyleUrl from '@/style/common.scss?url'
</script>

<template>
  <div class="pt-20px fccc">
    <VueSvg />
    <img width="350" height="200" src="@/assets/EventLoop.png">
    <div class="title">
      Playground
      <span class="sub-title">with Vite</span>
    </div>
    <HelloWorld :msg="StyleUrl" />
    <div class="mt-20px w-400px h-200px overflow-y-auto whitespace-pre" border="1px solid primary rounded-8px">
      {{ RawText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  color: $theme-color;
  .sub-title {
    font-size: 16px;
  }
}
</style>
