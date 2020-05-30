/**
 * ES2020 实验
 * 参考文章：
 * https://juejin.im/post/5eba14d1e51d4540bb61748d
 * https://zhuanlan.zhihu.com/p/109120813
 */

/**
 * 可选链操作符相关代码
 */
const OptionalChainingFC = () => {
    const test = {
        name: "foo",
        age: 25,
        address: {
            number: 44,
            street: "Sesame Street",
            city: {
                name: "Fake City",
                lat: 40,
                lon: 74
            }
        }
    }

    if (test.address.city.name) {
        // City Name exists!
        console.log("City name exists!");
    }


    // Cannot read property 'schoolName' of undefined
    // if (test.address.school.schoolName) {
    //     console.log('schoolName name exists')
    // }

    // 之前的做法是
    if (test.address && test.address.school && test.address.school.schoolName) {
        console.log("City name exists!");
    }

    // ES2020语法是 
    // 我们将十分长的 && 链，浓缩为更加简洁易读的可选链运算符。如果链中的任何值是null或者 undefined，则表达式仅返回undefined。
    if (test?.address?.school?.schoolName) {
        console.log("City name exists!");
    }

    // 可选的链接运算符非常强大。请看以下示例可以使用它的其他方式：
    let obj = {
        propName: 123,
        customMethod() {
            console.log('customMethod')
        }
    }
    const nestedProp = obj?.['prop' + 'Name']; // computed properties

    const result = obj.customMethod?.(); // functions

    const arrayItem = arr?.[42]; // arrays
}

/**
 * 空位合并运算符相关代码 （Nullish coalescing Operator）
 */
const nullishCoalescingOperatorFC = () => {
    const person = {
        name: "John",
        age: 20,
        squadNumber: 100
    };

    const squadNumber = person.squadNumber || "unassigned";

    console.log(`${person.name}s squad number is ${squadNumber}`);


    // "Johns squad number is 100"

    const person1 = {
        name: "Dave",
        age: 30,
        squadNumber: 0
    };

    const squadNumber1 = person1.squadNumber || "unassigned";

    console.log(`${person1.name}s squad number is ${squadNumber1}`);


    // "Daves squad number is unassigned"
    /**
     * 发生这种情况是因为0，导致我们false条件的||被调用。
     * 一般情况下的解决方法是
     */


    const squadNumber2 = person1.squadNumber >= 0 ? person1.squadNumber : "unassigned";

    console.log(`${person1.name}s squad number is ${squadNumber2}`);

    /**
     * ES2020解决方案
     * 运算符 ?? 可以更好地确保我们的值是null或undefined。
     */
    // Nullish Coalescing Operator
    // If person.squadNumber is null or undefined
    // set squadNumber to unassigned
    const squadNumber3 = person1.squadNumber ?? 'unassigned';

    console.log(`${person1.name}s squad number is ${squadNumber3}`);


}

// globalThis
const globalThisFC = () => {
    // globalThis 是一个全新的标准方法用来获取全局 this 。之前开发者会通过如下的一些方法获取：

    // 全局变量 window：是一个经典的获取全局对象的方法。但是它在 Node.js 和 Web Workers 中并不能使用
    // 全局变量 self：通常只在 Web Workers 和浏览器中生效。但是它不支持 Node.js。一些人会通过判断 self - 是否存在识别代码是否运行在 Web Workers 和浏览器中
    // 全局变量 global：只在 Node.js 中生效
    // const _this = (typeof window !== "undefined"
    //     ? window
    //     : (typeof process === 'object' &&
    //         typeof require === 'function' &&
    //         typeof global === 'object')
    //         ? global
    //         : this);
    // console.log(_this)


    // es2020
    console.log(globalThis)
    globalThis.something = 'hello world'
}

// BigInt
const bigIntFC = () => {
    // JavaScript可以处理的最大数量为2^53。就是这样9007199254740991，
    // 或者您可以使用更好记一点的Number.MAX_SAFE_INTEGER。
    //console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
    //console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
    //console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 - wut
    //console.log(Number.MAX_SAFE_INTEGER + 3); // 9007199254740994 - WUT


    let bigNumber = BigInt(Number.MAX_SAFE_INTEGER) + 2n; // 9007199254740993n 
    let bigNumber1 = BigInt(1234);

    console.log(bigNumber + bigNumber1)
    // BigInt的运算要注意，它在某些方面类似于Number，可以使用一些基本的运算符号进行数学运算。但是不能使用单目运算符（+ -）和无符号右移（>>>）。

    // 在将BigInt转换Number类型时如果BigInt的数值大于Number类型的安全范围会导致精度的丢失。

    // BigInt不能与Number类进行直接运行，系统不会进行隐式转换，如果需要必须手动转换成同意类型（一般来说没有人会用BigInt与Number直接进行运算）

    /**
     * BigInt在Json中的使用
     * 对任何 BigInt 值使用 JSON.stringify() 都会引发 TypeError，因为默认情况下 BigInt 值不会在 JSON 中序列化。
     * 但是，如果需要，可以实现 toString 方法：
 
     *  */
    // JSON.stringify({ a: 1n })
    JSON.stringify({ a: BigInt(1).toString() })

}
const ES2020 = () => {
    // 可选链操作符
    // OptionalChainingFC()

    // 空位合并运算符
    // nullishCoalescingOperatorFC()

    // globalThis
    // globalThisFC()


    // BigInt
    bigIntFC()

}

export default ES2020;