import { get } from 'lodash'

interface Person {
  name: string
  age: number
}

const me: Person = {
  name: 'sechi',
  age: 23,
}

function printInfo(info: Person): void {
  console.log(info)
  get(info, 'name')
}

printInfo(me)
