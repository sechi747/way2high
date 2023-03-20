<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello World')
</script>

<template>
  <div class="container">
    <span class="message">{{ msg }}</span>
  </div>
</template>

<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .message {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
