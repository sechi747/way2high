interface IDrink {
  name: string
  make(): void
}

class Tea implements IDrink {
  name: string
  constructor(name: string) {
    this.name = name
  }

  make(): void {
    console.log('make tea')
  }
}

class Juice implements IDrink {
  name: string
  constructor(name: string) {
    this.name = name
  }

  make(): void {
    console.log('make juice')
  }
}

/**
 * 首先要理解什么是简单工厂模式。
 * 所谓简单工厂就是将创建对象的过程简单封装，使用者不必关心对象是怎么创建的，只需要传入参数就可以得到相应的对象。
 * 缺点：1.灵活性不强，不支持传入不同参数。2.不方便拓展，如果想增加一种类型必须修改工厂，违反开闭原则。
 */

class SimpleDrinkFactory {
  static createDrink(type: string): Tea | Juice {
    switch (type) {
      case 'tea':
        return new Tea('tea')
      case 'juice':
        return new Juice('juice')
      default:
        return new Tea('tea')
    }
  }
}

const tea1: Tea = SimpleDrinkFactory.createDrink('tea')
tea1.make()

const juice1: Juice = SimpleDrinkFactory.createDrink('juice')
juice1.make()

/**
 * 而工厂方法模式则是将工厂作为一个父类，并通过不同的工厂子类来生产不同的对象。
 * 相比简单工厂，工厂方法的拓展性更强，且符合开闭原则。想增加类型的话只需要新建一个工厂即可。
 * 缺点：1.每增加一种类型需要同时创建具体的产品类和与之对应的工厂类，会大幅增加复杂度。2.一个工厂类只能创建一种具体的产品。
 */
interface IDrinkFactory {
  createDrink(): IDrink
}

class TeaFactory implements IDrinkFactory {
  createDrink(): Tea {
    return new Tea('tea')
  }
}

class JuiceFactory implements IDrinkFactory {
  createDrink(): Juice {
    return new Juice('juice')
  }
}

const tea2 = new TeaFactory().createDrink()
tea2.make()

const juice2 = new JuiceFactory().createDrink()
juice2.make()

export default {}
