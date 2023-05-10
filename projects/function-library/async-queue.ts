interface asyncTask {
  asyncFunc: () => Promise<any>
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
}

class AsyncQueue {
  private asyncList: asyncTask[] = []
  private inProgress = false

  add(asyncFunc: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.asyncList.push({ asyncFunc, resolve, reject })
      if (!this.inProgress)
        this.execute()
    })
  }

  execute() {
    if (this.asyncList.length > 0) {
      const currentAsyncTask = this.asyncList.shift()

      currentAsyncTask!.asyncFunc()
        .then((result) => {
          currentAsyncTask!.resolve(result)
          this.execute()
        })
        .catch((err) => {
          currentAsyncTask!.reject(err)
          this.execute()
        })

      this.inProgress = true
    }
    else {
      this.inProgress = false
    }
  }
}

const asyncQueue = new AsyncQueue()

const promiseFunc = (value: number, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(value)
      resolve(value)
    }, delay)
  })
}

asyncQueue.add(() => promiseFunc(0, 2000))
asyncQueue.add(() => promiseFunc(1, 500))
asyncQueue.add(() => promiseFunc(2, 1000))
