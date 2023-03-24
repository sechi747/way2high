<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useGlobalColorMode } from '@/composables/useGlobalColorMode'

const color = useGlobalColorMode()

const buttonTitle = ref('')

const toggleColor = () => color.value = color.value === 'dark' ? 'light' : 'dark'

watchEffect(() => buttonTitle.value = color.value === 'dark' ? 'switch to light mode' : 'switch to dark mode')
</script>

<template>
  <i
    :title="buttonTitle"
    class="icon-btn i-carbon-sun hover:text-amber"
    dark="i-carbon-moon hover:text-white "
    @click="toggleColor"
  />
</template>
