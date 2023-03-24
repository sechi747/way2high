<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello World')
</script>

<template>
  <div class="w-full h-full fcc">
    <span class="base text-24px font-bold font-mono">{{ msg }}</span>
  </div>
</template>
