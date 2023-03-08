/**
 * 发布-订阅模式
 * 与观察者模式的不同之处在于发布-订阅模式中发布者不会直接触及订阅者，而是通过一个第三方（事件总线）来进行通信
 */
interface EventFace {
  on: (name: string, callback: Function) => void
  emit: (name: string, ...args: Array<any>) => void
  off: (name: string, callback: Function) => void
  once: (name: string, callback: Function) => void
}

interface List {
  [key: string]: Array<Function>
}
class Dispatch implements EventFace {
  list: List

  constructor() {
    this.list = {}
  }

  on(name: string, callback: Function) {
    const callbackList: Array<Function> = this.list[name] || []
    callbackList.push(callback)
    this.list[name] = callbackList
  }

  emit(name: string, ...args: Array<any>) {
    const handlers = this.list[name]
    console.log('handlers::', handlers)
    if (handlers) {
      // 这里浅拷贝的目的是为了避免通过 once 安装的监听器在移除的过程中出现handlers执行顺序问题
      const handlersCopy = handlers.slice()
      handlersCopy.forEach((fn) => {
        fn.apply(this, args)
      })
    }
    else {
      console.log('该事件未监听')
    }
  }

  off(name: string, callback: Function) {
    const handlers = this.list[name]
    if (handlers && callback) {
      const index = handlers.findIndex(fn => fn === callback)
      handlers.splice(index, 1)
    }
    else {
      console.log('该事件未监听')
    }
  }

  once(name: string, callback: Function) {
    const wrapper = (...args: Array<any>) => {
      callback.apply(this, args)
      this.off(name, wrapper)
    }
    this.on(name, wrapper)
  }
}

const eventBus = new Dispatch()

eventBus.on('consoleName', (name: string) => {
  console.log(`my name is ${name}`)
})

eventBus.once('consoleOnce', (...arg: Array<any>) => {
  console.log(arg, 'once')
})

eventBus.emit('consoleName', 'sechi')
eventBus.emit('consoleOnce', 1, true, 'sechi')
