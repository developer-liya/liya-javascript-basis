/**
 * ES2018新特性
 * https://www.jianshu.com/p/b54e5075b5e4
 * https://juejin.im/post/5b2a186cf265da596d04a648
 */

// Rest/Spread 属性
const spreadFC = () => {

    // ES2015引入了Rest参数和扩展运算符。三个点（...）仅用于数组。
    // Rest参数语法允许我们将一个布丁数量的参数表示为一个数组。

    const values = [99, 100, -1, 48, 16];
    console.log(Math.max(...values)); // 100

    // ES2018为对象解构提供了和数组一样的Rest参数（）和展开操作符，一个简单的例子：
    const myObject = {
        a: 1,
        b: 2,
        c: 3
    };

    // 对象解构
    const { a, ...x } = myObject;
    console.log(a, x)
    // a = 1
    // x = { b: 2, c: 3 }

    // 或者你可以使用它给函数传递参数：
    restParam({
        a: 1,
        b: 2,
        c: 3
    });

    function restParam({ a, ...x }) {
        // a = 1
        // x = { b: 2, c: 3 }
        console.log(a, x)
    }
    // 跟数组一样，Rest参数只能在声明的结尾处使用。此外，它只适用于每个对象的顶层，如果对象中嵌套对象则无法适用。
    // 扩展运算符可以在其他对象内使用，例如：
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { ...obj1, z: 26 };
    // obj2 is { a: 1, b: 2, c: 3, z: 26 }

}

// 正则表达式命名捕获组（Regular Expression Named Capture Groups）
const matchGroupFC = () => {
    // JavaScript正则表达式可以返回一个匹配的对象——一个包含匹配字符串的类数组，例如：以YYYY - MM - DD的格式解析日期：
    const
        reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        match = reDate.exec('2018-04-30'),
        year = match[1], // 2018
        month = match[2], // 04
        day = match[3]; // 30
    console.log(match)

    // 这样的代码很难读懂，并且改变正则表达式的结构有可能改变匹配对象的索引。

    // ES2018允许命名捕获组使用符号 ? <name>，在打开捕获括号(后立即命名，示例如下：

    const matchFC = () => {
        const
            reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
            match = reDate.exec('2018-04-30'),
            year = match.groups.year,  // 2018
            month = match.groups.month, // 04
            day = match.groups.day;   // 30
        console.log(match)
    }
    matchFC()

    // 任何匹配失败的命名组都将返回undefined。

    // 命名捕获也可以使用在replace()方法中。例如将日期转换为美国的 MM - DD - YYYY 格式：
    const replaceFC = () => {
        const
            reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
            d = '2018-04-30',
            usDate = d.replace(reDate, '$<month>-$<day>-$<year>');
        console.log(usDate)
    }
    replaceFC()

}

// 正则表达式反向断言（lookbehind）
const lookbehindFC = () => {
    // 目前JavaScript在正则表达式中支持先行断言（lookahead）。这意味着匹配会发生，但不会有任何捕获，
    // 并且断言没有包含在整个匹配字段中。例如从价格中捕获货币符号：
    const
        reLookahead = /\D(?=\d+)/,
        match = reLookahead.exec('$123.89');

    console.log(match[0]); // $

    // ES2018引入以相同方式工作但是匹配前面的反向断言（lookbehind），这样我就可以忽略货币符号，单纯的捕获价格的数字：

    const behindFC = () => {
        const
            reLookbehind = /(?<=\D)\d+/,
            match = reLookbehind.exec('$123.89');

        console.log(match[0]); // 123.89
    }
    behindFC()

    // 以上是 肯定反向断言，非数字\D必须存在。同样的，还存在 否定反向断言，表示一个值必须不存在，例如：
    const behindNegFC = () => {
        const
            reLookbehindNeg = /(?<!\D)\d+/,
            match = reLookbehindNeg.exec('$123.89');

        console.log(match[0]); // null
    }
    behindNegFC()
}

// 正则表达式dotAll模式
const dotAllFC = () => {
    // 正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现，例如：
    console.log(/hello.world/.test('hello\nworld'));  // false
    console.log(/hello.world/s.test('hello\nworld')); // true

}

// 正则表达式 Unicode 转义
const unicodeFC = () => {
    // 到目前为止，在正则表达式中本地访问 Unicode 字符属性是不被允许的。
    // ES2018添加了 Unicode 属性转义——形式为\p{... } 和\P{... } ，
    // 在正则表达式中使用标记 u(unicode) 设置，在\p块儿内，可以以键值对的方式设置需要匹配的属性而非具体内容。例如：
    const reGreekSymbol = /\p{Script=Greek}/u;
    console.log(reGreekSymbol.test('π')); // true

}

// Promise.finally()
const finallyFC = () => {
    // 一个Promise调用链要么成功到达最后一个.then() ，要么失败触发.catch() 。
    // 在某些情况下，你想要在无论Promise运行成功还是失败，运行相同的代码，例如清除，删除对话，关闭数据库连接等。

    // .finally()允许你指定最终的逻辑：
    function doSomething() {
        fetch('http://example.com/endpoint')
            .then()
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                // finish here!
                console.log(123)
            });
    }
    doSomething()
}

// 异步迭代
// 如果一个异步函数中包含一个循环，循环里的每一次迭代是发起一个异步请求。那么怎么保证在本次迭代的请求结束后，再进入下一次迭代呢？?
const awaitFC = () => {

    function process(array) {
        array.forEach(async i => {
            console.log(`#${i} request start`)
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`)
            const json = await res.json()
            console.log(`#${i} request end`, json)
        })
    }
    // 执行后，发现结果并不对：

    // 原因是，数组的 forEach 方法每遍历一次，都是以回调的方式处理当前成员的，每个迭代之间没有关联，都是各自执行的。
    // 因此，请求是按照遍历顺序发出的，然而各个请求有不同的响应时间，打印顺序跟请求顺序可能是不一样的。

    // 使用for of  配合await 使用可以解决
    async function process1(array) {
        for (let i of array) {
            console.log(`#${i} request start`)
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`)
            const json = await res.json()
            console.log(`#${i} request end`, json)
        }
    }
    // 原因是，在异步函数中我们可以使用 await 关键字，
    // 像书写同步代码一样，书写异步代码。也就是说，等待当前异步代码返回后，再进行后续的逻辑操作。


    // ES2018 对迭代异步函数进行了增强，引入了异步迭代器。与普通迭代器不同的是，
    // 异步迭代器的 next 方法返回的是一个 Promise。语法是 for..await..of，我们将上面的例子换个写法：

    async function process3(array) {
        const reqs = array.map(async id => {
            console.log(`#${id} request start`)
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            return res.json()
        })
        for await (let json of reqs) {
            console.log(json)
        }
    }
    // 这种写法总是能保证输出结果和遍历顺序是一致的。


}

const ES2018 = () => {

    // spreadFC()

    // matchGroupFC()

    // lookbehindFC()

    // dotAllFC()

    // unicodeFC()

    finallyFC()

}

export default ES2018