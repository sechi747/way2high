<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div>
    <div class="text-primary">
      count: {{ count }}
    </div>
    <button type="button" @click="count++">
      increase +
    </button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
