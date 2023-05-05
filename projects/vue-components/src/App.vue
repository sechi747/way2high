<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const global = getCurrentInstance()!.appContext.config.globalProperties

const showMessage = () => {
  global.$message.show('Hello World.')
}
</script>

<template>
  <button @click="showMessage">
    show message
  </button>
</template>

<style scoped>
</style>
