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
const ES2020 = () => {
    // 可选链操作符
    // OptionalChainingFC()

    // 空位合并运算符
    nullishCoalescingOperatorFC()


}

export default ES2020;