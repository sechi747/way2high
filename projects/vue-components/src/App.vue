<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import BackTop from './components/back-top'

const global = getCurrentInstance()!.appContext.config.globalProperties

const longText = () => {
  let text = ''
  Array.from(Array(100)).map((i) => {
    return text += (Math.random() * 10000).toString(2)
  })
  return text
}

const showMessage = () => {
  global.$message.show('Hello World.')
}
</script>

<template>
  <button @click="showMessage">
    show message
  </button>
  <div style="height: 1000px; width:500px; border: 1px solid black;">
    <div id="textArea" style="height: 100%; padding-right: 50px;  overflow-y: auto; font-size: 22px; line-break: anywhere;">
      <span>{{ longText() }}</span>
      <BackTop target="#textArea" />
    </div>
  </div>
</template>

<style scoped>
</style>
