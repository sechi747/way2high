<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'Message',
  props: {
    content: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 1500,
    },
  },

  setup(props) {
    const visible = ref(false)
    let timer: number

    function addTimer() {
      timer = window.setTimeout(() => {
        visible.value = false
      }, props.duration)
    }

    function removeTimer() {
      window.clearTimeout(timer)
    }

    watch(() => visible.value, (val) => {
      if (val)
        addTimer()
    })

    return {
      visible,
      addTimer,
      removeTimer,
    }
  },
})
</script>

<template>
  <transition name="message">
    <div v-if="visible" class="s-message-container" @mouseenter="removeTimer" @mouseleave="addTimer">
      <span>{{ content }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.s-message-container {
  position: fixed;
  top: 24px;
  left: 50%;
  background-color: rgb(12, 10, 16);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  z-index: 9999;
}

.message-enter-active,
.message-leave-active {
  transition: opacity 0.5s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
}
</style>
