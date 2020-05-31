/**
 * ES2016
 * https://juejin.im/post/5b67aba0f265da0fae4f4131
 */


// Array.prototype.includes
const includesFC = () => {
    //  includes是一个Array上很有用的函数，用于快速查找数组中是否包含某个元素。(包括NaN，所以和indexOf不一样) 。
    // arr.includes(valueToFind[, fromIndex])
    console.log(['a', 'b', 'c', 'd'].includes('a'))
    console.log(['a', 'b', 'c', 'd'].includes('e'))

    // 此函数还可以传入第二个可选的参数，来指定开始搜索的索引位置：
    console.log('index---', ['a', 'b', 'c', 'd'].includes('a', 0))
    console.log('index---', ['a', 'b', 'c', 'd'].includes('a', 3))

    // fromIndex 参数值也可以为负数，那样从倒数第N个位置开始搜索指定的值。
    console.log('fromIndex---', ['a', 'b', 'c', 'd'].includes('d', -1))

    // include 方法可以在数组中找到 NaN 值：
    console.log('NaN---', ['a', 'b', 'c', 'd', NaN].includes(NaN))
}

// 幂运算符**
const powFC = () => {
    // 这个运算符是简化版的 Math.pow(x, y) 。
    console.log(9 ** 2)
    console.log(-(9 ** 2))
    console.log((-9) ** 2)

    // 注意任何数字，包括 NaN，它的0次幂都是1。如果指数是NaN，结果总是NaN，无论底数是什么。
    console.log(99 ** 0)
    console.log(NaN ** 0)
    console.log(Infinity ** 0)

    console.log(99 ** NaN)
    console.log((-8) ** NaN)
    console.log(NaN ** NaN)
}
const ES2016 = () => {
    // includesFC()

    powFC()
}

export default ES2016