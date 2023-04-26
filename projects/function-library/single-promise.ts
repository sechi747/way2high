/**
 * promise单例模式
 */
let currentPromise: Promise<string> | null = null
let count = 0

const fetchData = async () => {
  if (currentPromise)
    return currentPromise
  count++

  currentPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(`success${count}`)
    }, 2000)
  })

  try {
    const result = await currentPromise
    currentPromise = null
    return result
  }
  catch {
    currentPromise = null
  }
}

fetchData().then((res) => {
  console.log('res1', res) // success1
})
fetchData().then((res) => {
  console.log('res2', res) // success1
})

setTimeout(async () => {
  const res = await fetchData()
  console.log('lazy res', res) // success2
}, 2000)
