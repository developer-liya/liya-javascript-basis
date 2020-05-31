/**
 * ES2017 新特性
 * https://www.sitepoint.com/es2017-whats-new/
 * https://blog.csdn.net/weixin_42437900/article/details/87981967
 */

// 使用Object.values()遍历对象的属性值，无需使用使用属性名：
const objValueFC = () => {

    let obj = { a: 1, b: 2, c: 3 }
    Object.values(obj).forEach(item => console.log(item))
}

// 使用Object.entries()遍历对象的属性名和属性值：
const entryFC = () => {

    let obj = { a: 1, b: 2, c: 3 };
    Object.entries(obj).forEach(([key, value]) => {
        console.log(`key: ${key}: value-${value}`)
    })
}

// Object.getOwnPropertyDescriptors()
// Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符。
const objGetOwnProPertyDescFC = () => {
    const myObject = {
        prop1: 'hello',
        prop2: 'world'
    };

    const descriptors = Object.getOwnPropertyDescriptors(myObject);

    console.log(descriptors.prop1.writable); // true
    console.log(descriptors.prop2.value);    // 'world'
}

//  padStart() padEnd()
const padFuncFC = () => {
    const padStartFC = () => {

        const str1 = '5';

        console.log(str1.padStart(2, '0'));
        // expected output: "05"

        const fullNumber = '2034399002125581';
        const last4Digits = fullNumber.slice(-4);
        const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

        console.log(maskedNumber);
        'abc'.padStart(5);         // '  abc'
        'abc'.padStart(5, '-');     // '--abc'
        'abc'.padStart(10, '123'); // '1231231abc'
        'abc'.padStart(1);         // 'abc'
    }
    padStartFC()

    const padEndFC = () => {
        'abc'.padEnd(5);           // 'abc  '
        'abc'.padEnd(5, '-');       // 'abc--'
        console.log('abc'.padEnd(10, '123'));   // 'abc1231231'
        console.log('abc'.padEnd(1));           // 'abc'
    }
    padEndFC()
}

// Trailing Commas are Permitted 对象或者函数入参最后可以加逗号
const TrailingFC = () => {
    // ES2017 is happy!
    const a = [1, 2, 3,];

    const b = {
        a: 1,
        b: 2,
        c: 3,
    };

    function c(one, two, three, ) { };
}

// Async functions
const asyncFC = () => {
    async function doSomething() {
        const
            response1 = await doSomething1(),
            response2 = await doSomething2(response1),
            response3 = await doSomething3(response2);
    }
}

// ShareArrayBuffer和Atomics用于从共享内存位置读取和写入
const BufferFc = () => {
    // SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象，
    // 它们都可以用来在共享内存（shared memory）上创建视图。
    // 与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。

    // new SharedArrayBuffer(length)

    let sab = new SharedArrayBuffer(1024);
    console.log(sab)

    // Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。
    // 这些原子操作属于 Atomics 模块。与一般的全局对象不同，Atomics 不是构造函数，因此不能使用 new 操作符调用，
    // 也不能将其当作函数直接调用。Atomics 的所有属性和方法都是静态的（与 Math  对象一样）。

    // Atomics[Symbol.toStringTag]

    // 该属性的值为“Atomics”。

}


const ES2017 = () => {
    // objValueFC()

    // entryFC()

    // objGetOwnProPertyDescFC()

    // padFuncFC()

    BufferFc()
}

export default ES2017;