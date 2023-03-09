/**
 * 观察者模式
 * 与发布-订阅模式的区别在于观察者模式中的Subject会直接触及到Observer
 */
interface Subject {
  observers: Array<Observer>
  state: number
  add: (observer: Observer) => void
  remove: (observer: Observer) => void
  notify: () => void
}

interface Observer {
  update: (subject: Subject) => void
}

class ConcreteSubject implements Subject {
  public observers: Array<Observer> = []
  public state = 0

  public add(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer)
    if (observerIndex !== -1)
      return console.log('已订阅')

    this.observers.push(observer)
    console.log('订阅成功')
  }

  public remove(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer)
    if (observerIndex === -1)
      return console.log('订阅者未订阅')

    this.observers.splice(observerIndex, 1)
    console.log('订阅者已移除')
  }

  public notify(): void {
    console.log('通知所有订阅者')
    for (const observer of this.observers)
      observer.update(this)
  }

  public someLogic() {
    this.state = Math.floor(Math.random() * 10 + 1)

    console.log(`我更改了我的状态：state=${this.state}`)
    this.notify()
  }
}

class ConcreteObserver implements Observer {
  public update(subject: Subject) {
    if (subject.state <= 5)
      console.log('观察者A作出回应')
  }
}

const subject = new ConcreteSubject()

const observerA = new ConcreteObserver()
subject.add(observerA)

subject.someLogic()

subject.remove(observerA)

subject.someLogic()
