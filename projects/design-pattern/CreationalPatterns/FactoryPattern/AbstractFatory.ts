/**
 * 抽象工厂模式可以用来创建一系列对象。
 * 比如一家餐厅可以同时提供饮品和食物，而饮品又可以和食物组成套餐。
 * 我们可以先声明两个接口：饮品和食物，并且让两类产品的变体都继承这个接口。
 * 然后我们需要声明抽象工厂，它包含了生产饮品和生产食物这两个构造方法。
 * 最后我们只需要基于抽象工厂来创建不同的工厂类，并通过工厂类来返回我们所需的套餐。
 * 缺点：需要定义很多接口和类，代码会变得很复杂。
 */
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

interface IFood {
  name: string
  make(): void
}

class FriedChicken implements IFood {
  name: string

  constructor(name: string) {
    this.name = name
  }

  make(): void {
    console.log('make FriedChicken')
  }
}

class Hamburg implements IFood {
  name: string

  constructor(name: string) {
    this.name = name
  }

  make(): void {
    console.log('make hamburg')
  }
}

interface IMealFactory {
  createDrink(): IDrink
  createFood(): IFood
}

class MealAFactory implements IMealFactory {
  createDrink(): Tea {
    return new Tea('tea')
  }

  createFood(): FriedChicken {
    return new FriedChicken('fried chicken')
  }
}

class MealBFactory implements IMealFactory {
  createDrink(): Juice {
    return new Juice('juice')
  }

  createFood(): Hamburg {
    return new Hamburg('hamburg')
  }
}

const mealAFactory = new MealAFactory()
mealAFactory.createDrink().make()
mealAFactory.createFood().make()
const mealBFactory = new MealBFactory()
mealBFactory.createDrink().make()
mealBFactory.createFood().make()

export default {}
