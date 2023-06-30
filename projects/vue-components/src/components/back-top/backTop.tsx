import { computed, defineComponent, onMounted, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { backTopProps } from './types'
import './index.scss'

export const BackTop = defineComponent({
  name: 'BackTop',
  props: backTopProps,
  setup(props, { slots }) {
    const { bottom, right, target, visibleHeight } = props

    const isVisible = ref(false)
    const targetRef = ref<HTMLElement | null>(null)
    const backTopRef = ref<HTMLElement | null>(null)

    const position = computed(() => ({ bottom: `${bottom}px`, right: `${right}px` }))

    const scrollToTop = () => {
      targetRef.value && targetRef.value.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    const handleVisible = () => {
      const scrollTop = targetRef.value!.scrollTop
      if (scrollTop >= visibleHeight)
        isVisible.value = true

      if (scrollTop < visibleHeight && isVisible.value)
        isVisible.value = false
    }

    onMounted(() => {
      targetRef.value = target === 'window' ? document.body : document.querySelector(target)

      if (visibleHeight === 0) {
        isVisible.value = true
        return
      }

      if (!targetRef.value)
        throw new Error(`${target} is not existed`)

      if (targetRef.value!.parentElement)
        targetRef.value.parentElement.style.position = 'relative'

      backTopRef.value!.style.position = 'absolute'

      useEventListener(targetRef.value, 'scroll', handleVisible)
    })

    return () =>
      <>
        <div ref={backTopRef} class="s-back-top-container" style={{ ...position.value, display: isVisible.value ? 'block' : 'none' }} onClick={scrollToTop}>
          <div class="s-back-top-base">
            {slots.default ? slots.default() : '↑'}
          </div>
        </div>
      </>
  },
})
