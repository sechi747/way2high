/**
 * 单例模式非常简单且常见，比如Vuex就使用了单例模式来确保store在全局只被注册一遍。
 * 核心思想就是有实例就返回，没有实例就先创建再返回。
 */
class Storage {
  private static instance: Storage
  private map: Record<string, any> = {}

  public static getInstance(): Storage {
    if (!Storage.instance)
      Storage.instance = new Storage()

    return Storage.instance
  }

  setItem(key: string, value: any) {
    this.map[key] = value
  }

  getItem(key: string) {
    return this.map[key]
  }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

console.log('storage1 === storage2?', storage1 === storage2)
storage1.setItem('name', 'sechi')
console.log('getName', storage2.getItem('name'))

export default {}
