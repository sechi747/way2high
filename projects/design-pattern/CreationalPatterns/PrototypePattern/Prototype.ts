/**
 * JavaScript的“面向对象”系统本身就是靠原型模式建立起来的。
 * JavaScript中所有通过prototype来实现的对象创建与继承其实都是原型模式的实现。
 * Object.create()方法就是天然的原型模式的实现。
 */
class Person {
  public name: string
  public age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  public sayHi(): void {
    console.log(`Hi, I'm ${this.name}. I'm ${this.age} years old.`)
  }

  public clone(): Person {
    return Object.create(this)
  }
}

const p1 = new Person('sechi', 23)
const p2 = p1.clone()
p2.name = 'ihces'
p2.age = 32
p1.sayHi() // Hi, I'm sechi. I'm 23 years old.
p2.sayHi() // Hi, I'm ihces. I'm 32 years old.

/**
 * JavaScript中的class语法其实只是语法糖。
 * 下面两种写法其实是等价的。
 */
class Dog {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  eat() {
    console.log('狗粮真好吃')
  }
}

function Cat(name: string) {
  // @ts-expect-error simulate JS env
  this.name = name
}
Cat.prototype.eat = function () {
  console.log('猫粮真好吃')
}

export default {}
