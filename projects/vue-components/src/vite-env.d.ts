/// <reference types="vite/client" />
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $message: {
      show: (content: string, duration?: number) => void
    }
  }
}
