import type { App, Plugin } from 'vue'
import { createApp } from 'vue'
import Message from './message.vue'

function createMessage(options: { content: string; duration?: number }) {
  const app = createApp(Message, {
    content: options.content,
    duration: options.duration,
  })

  const instance = app.mount(document.createElement('div')) as InstanceType<typeof Message>
  instance.visible = true
  document.body.appendChild(instance.$el)
}

export const MessagePlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$message = {
      show: (content: string, duration?: number) => createMessage({ content, duration }),
    }
  },
}
