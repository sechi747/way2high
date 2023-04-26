function fn1(next: Function) {
  console.log(1)
  next()
}

function fn2(next: Function) {
  console.log(2)
  next()
}

function fn3(next: Function) {
  console.log(3)
  next()
}

const middleware = [fn1, fn2, fn3]

function compose(middleware: Function[]) {
  function dispatch(index: number) {
    if (index === middleware.length)
      return
    const curr = middleware[index]
    curr(() => dispatch(++index))
  }
  dispatch(0)
}

compose(middleware)
