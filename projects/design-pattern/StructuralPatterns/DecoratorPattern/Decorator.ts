/**
 * 装饰器模式
 * JavaScript的装饰器的运行是在编译时而不是运行时
 * 方法装饰器先于类装饰器
 */
function funcDecorator(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('funcTarget', target) // 此处的Target是Button.prototype，即类的原型对象。正常来讲应该是修饰Button实例上的onClick方法，但装饰器在编译时运行，而实例是运行时才生成的。
  console.log('name', name) // 目标属性名
  console.log('descriptor', descriptor) // 可以当做Object.defineProperty的第三个参数，{value,writable,enumerable,configurable,get,set}
  const originalMethod = descriptor.value
  descriptor.value = function () {
    console.log('apply funcDecorator')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

function classDecorator(target: any) {
  console.log('classTarget', target)
  target.type = 'primary'
  return target
}

@classDecorator
class Button {
  @funcDecorator
  onClick(num: number) {
    console.log(`你点击了${num}次`)
  }
}

const button = new Button()
button.onClick(7)
// @ts-expect-error show decorator result
console.log('button type:::', Button.type)
