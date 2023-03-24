<script setup lang="ts">
import Aside from '@/components/Aside.vue'
</script>

<template>
  <div w-screen h-screen flex>
    <Aside />
    <div flex-1>
      <RouterView />
    </div>
  </div>
</template>
