/**
 * ES2019实践
 * http://www.fly63.com/article/detial/5096
 * https://juejin.im/post/5d4ada17518825056144d865
 */


//  可选的catch
const catchOptionFC = () => {
    // 之前的做法
    // try {
    //     const obj = obj.a;
    // } catch (err) {
    //     console.log('err：', err)
    // }

    // es2019
    // 当我们不需要对 catch 返回的错误信息进行处理时，比如：我们对于一些数据处理，
    // 经常会出现格式报错，但是我们并不关心这个错误，我们只需要继续处理，或重新请求数据等。
    try {
        const obj = obj.a;
    } catch{
        console.log('error')
    }
}

// JSON.superset
const jsonSuperset = () => {
    // 由于在 ES2019 之前不支持转义行分隔符 (\u2028) 和段落分隔符 (\u2029) 字符，
    // 并且在解析过程中会报错: SyntaxError: Invalid or unexpected token。
    const PS = eval("'\u2029'")
}

// 更友好的 JSON.stringify
// 更友好的 JSON.stringify，对于一些超出范围的 Unicode 字符串，为其输出转义序列，使其成为有效 Unicode 字符串。
const jsonStringify = () => {
    // Non-BMP characters still serialize to surrogate pairs.
    JSON.stringify('')
    console.log(JSON.stringify('\uD834\uDF06'))

    // Unpaired surrogate code units will serialize to escape sequences.
    console.log(JSON.stringify('\uDF06\uD834'))
    // → '"\\udf06\\ud834"'
    console.log(JSON.stringify('\uDEAD'))
    // → '"\\udead"'
}

//  Symbol.prototype.description

const descriptionFC = () => {
    // 在 ES6 中引入 Symbol 这个基本数据类型，可以实现一些数据内省等高级功能。

    // 这次 ES10 中，为 Symbol 类型增加 Symbol.prototype.description 的一个访问器属性，
    // 用来获取 Symbol 类型数据的描述信息（description）。
    console.log(Symbol('pingan8787').description);
    // expected output: "pingan8787"

    console.log(Symbol.iterator.description);
    // expected output: "Symbol.iterator"

    console.log(Symbol.for('leo').description);
    // expected output: "leo"

    console.log(Symbol('pingan8787').description + ' and leo!');
    // expected output: "pingan8787 and leo!"

    // 也可以这样用
    let pingan = Symbol('pingan8787').description;
    console.log(pingan === 'pingan8787'); // true
}

// Function.prototype.toString
const FuncTostringFC = () => {
    // 在 ES10 之前，我们对一个函数调用 toString() 方法，返回的结果中会将注释信息去除。

    // 在 ES10 之后，函数再调用 toString() 方法，将准确返回原有内容，包括空格和注释等：
    let pingan8787 = function () {
        // do something
        console.log('leo')
    }
    console.log(pingan8787.toString());

}

// Object.fromEntries
const ObjFromEntries = () => {
    // Object.fromEntries 是 ES10 中新的静态方法，用于将键值对列表转换为对象。

    // Object.fromEntries() 方法接收一个键值对的列表参数，并返回一个带有这些键值对的新对象。

    // 这个迭代参数应该是一个能够实现 @iterator 方法的的对象，返回一个迭代器对象。它生成一个具有两个元素的类数组的对象，第一个元素是将用作属性键的值，第二个元素是与该属性键关联的值。

    // Object.fromEntries() 是 Object.entries 的反转。

    // Object.entries 和 Object.fromEntries() 互转
    (() => {
        let leo = { name: 'pingan8787', age: 10 };
        let arr = Object.entries(leo);
        console.log(arr);// [["name", "pingan8787"],["age", 10]]

        let obj = Object.fromEntries(arr);
        console.log(obj);// {name: "pingan8787", age: 10}
    })()

    // Map 转化为 Object
    const mapToObj = () => {
        const map = new Map([['name', 'pingan8787'], ['age', 10]]);
        const obj = Object.fromEntries(map);
        console.log(obj); // {name: "pingan8787", age: 10}
    }
    mapToObj()

    // Array 转化为 Object
    const arrayToObj = () => {
        const arr = [['name', 'pingan8787'], ['age', 10]];
        const obj = Object.fromEntries(arr);
        console.log(obj); // {name: "pingan8787", age: 10}
    }
    arrayToObj()

}

// String.prototype.{trimStart,trimEnd}
const stringTrim = () => {
    // String.prototype.trimStart
    // trimStart() 方法从字符串的开头删除空格，返回一个新字符串，
    // 表示从其开头（左端）剥离空格的调用字符串，不会直接修改原字符串本身。 trimLeft()是此方法的别名。
    const trimStartFC = () => {
        let pingan8787 = '   Hello pingan8787!   ';
        console.log(pingan8787);        // "   Hello pingan8787!   ";
        console.log(pingan8787.length); // 23;

        console.log(pingan8787.trimStart());        // "Hello pingan8787!   ";
        console.log(pingan8787.trimStart().length); // 20;
    }
    trimStartFC();

    // String.prototype.trimEnd
    // trimEnd() 方法从一个字符串的右端移除空白字符，返回一个新字符串，
    // 表示从其（右）端剥去空白的调用字符串，不会直接修改原字符串本身。 trimRight()是此方法的别名。
    const trimEndFC = () => {
        let pingan8787 = '   Hello pingan8787!     ';
        console.log(pingan8787);        // "   Hello pingan8787!   ";
        console.log(pingan8787.length); // 23;

        console.log(pingan8787.trimEnd())
        console.log(pingan8787.trimEnd().length)
    }
    trimEndFC()
}

// Array.prototype.{flat,flatMap}
const flatFC = () => {
    // 在 ES10 之前，我们要将一个数组打平，由于官方没有对应 API，我们可能需要 lodash
    // 或者手写循环去操作。
    // Array.prototype.flat
    const flatFunc = () => {
        // 在 ES10 中，官方新增一个 Array.prototype.flat 方法，
        //将数组第一层数据打平，也仅限第一层。如果我们需要将多层递归，则需要显式传入参数
        console.log([1, 2, 3, 4].flat());
        console.log([1, 2, 3, [1, 2, [3, [4]]]].flat());
        console.log([1, 2, [3, 23, 4, 555], [1, 2, [3, [4]]]].flat(2));
        // [1, 2, 3, 1, 2, 3, [4]]
    }
    flatFunc()

    const flatMapFc = () => {
        // 在 ES10 中，官方还增加了 Array.prototype.flatMap 方法，其实就是 flat 和 map 一起组合操作
        console.log([1, 3, 5].map(x => [x * x])); // [[1],[9],[25]]

        console.log([1, 3, 5].flatMap(x => [x * x])) // [1,9,25]
    }
    flatMapFc()
}

const ES2019 = () => {
    // catchOptionFC()

    // jsonStringify()

    // descriptionFC()

    // FuncTostringFC()

    // ObjFromEntries()

    // stringTrim()

    flatFC()
}

export default ES2019