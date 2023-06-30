import type { ExtractPropTypes } from 'vue'

export const backTopProps = {
  bottom: {
    type: Number,
    default: 50,
  },
  right: {
    type: Number,
    default: 30,
  },
  target: {
    type: String,
    default: 'window',
  },
  visibleHeight: {
    type: Number,
    default: 300,
  },
}

export type BackTopProps = ExtractPropTypes<typeof backTopProps>
