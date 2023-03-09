/**
 * 迭代器模式
 * 模仿[Symbol.iterator]的实现
 */
interface IteratorA<T> {
  hasNext(): boolean
  next(): { value: T; done: boolean }
}

class ArrayIterator implements IteratorA<any> {
  private list: Array<any>
  private position: number
  private length: number

  constructor(list: Array<any>) {
    this.list = list
    this.position = 0
    this.length = list.length
  }

  hasNext() {
    return this.position < this.length
  }

  next() {
    const done = this.position >= this.length
    const value = !done ? this.list[this.position++] : undefined
    return { value, done }
  }

  getPosition() {
    return this.position
  }
}

const arr = [1, 2, 3, 4, 5]

const arrayIterator = new ArrayIterator(arr)

while (arrayIterator.hasNext())
  console.log(arrayIterator.next())
