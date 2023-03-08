/**
 * 策略模式
 * 下面代码实现折扣处理逻辑
 */
type DiscountType = 'pre' | 'onSale' | 'back'

interface PriceCalculator {
  (originPrice: number): number
}

type PriceProcessor = Record<DiscountType, PriceCalculator>

const priceProcessor: PriceProcessor = {
  pre(originPrice) {
    if (originPrice >= 100)
      return originPrice - 20

    return originPrice * 0.9
  },
  onSale(originPrice) {
    if (originPrice >= 100)
      return originPrice - 30

    return originPrice * 0.8
  },
  back(originPrice) {
    if (originPrice >= 200)
      return originPrice - 50

    return originPrice
  },
}

function askPrice(tag: DiscountType, originPrice: number) {
  return priceProcessor[tag](originPrice)
}

console.log(askPrice('pre', 100)) // 80
console.log(askPrice('onSale', 80)) // 64
