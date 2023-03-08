/**
 * 代理模式有四种分类：1.事件代理 2.虚拟代理 3.缓存代理 4.保护代理
 */

/**
 * 网络请求缓存
 */
class HttpService {
  async sendRequest(method: string, url: string, body?: BodyInit) {
    console.log(`Request info: method -> ${method}, url -> ${url}`)
    return fetch(url, {
      method,
      body,
    }).then(response => response.json())
  }
}

class HttpServiceProxy {
  private httpService: HttpService
  private dataCache: Map<string, any> = new Map()

  constructor() {
    this.httpService = new HttpService()
  }

  async sendRequest(method: string, url: string, body?: BodyInit) {
    const cacheKey = `${method}:${url}`
    if (this.dataCache.has(cacheKey)) {
      console.log(`Use key: ${cacheKey} to get cached data`)
      return this.dataCache.get(cacheKey)
    }
    const response = await this.httpService.sendRequest(method, url, body)
    this.dataCache.set(cacheKey, response)
    return response
  }
}

const httpServiceProxy = new HttpServiceProxy()
async function getTodoDetail(todoId: number) {
  return httpServiceProxy.sendRequest(
    'get',
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
  )
}
(async function main() {
  console.log(await getTodoDetail(1))
  console.log(await getTodoDetail(1))
})()

/**
 * 给LocalStorage设置过期时间
 */
interface CacheItem {
  now: number
  value: string
  maxAge: number
}

class LocalStorageProxy {
  setItem(key: string, value: unknown, maxAge = 0) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        maxAge,
        now: Date.now(),
      }),
    )
  }

  getItem(key: string): string | null {
    const item = localStorage.getItem(key)
    if (!item)
      return null
    const cachedItem = JSON.parse(item) as CacheItem
    const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge
    isExpired && this.removeItem(key)
    return isExpired ? null : cachedItem.value
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}

const storageProxy = new LocalStorageProxy()
storageProxy.setItem('name', 'sechi', 1000)
console.log(storageProxy.getItem('name'))
setTimeout(() => {
  console.log(storageProxy.getItem('name'))
}, 1000)
