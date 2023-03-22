<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello World')
</script>

<template>
  <div class="w-full h-screen fcc">
    <span class="text-24px font-bold text-primary">{{ msg }}</span>
  </div>
</template>
