const forEach = (array, fn) => {
    for (const value of array) {
        fn(value)
    }
}

const map = (fn, array) => {
    let results = []
    for (const value of array)
        results.push(fn(value))
    return results
}

const filter = (fn, array) => {
    let results = []
    for (const value of array)
        fn(value) ? results.push(value) : undefined
    return results
}

const concatAll = (array, fn) => {
    let results = []
    for (const value of array)
        results.push.apply(results, value)

    return results
}

const reduce = (array, fn, initialValue) => {
    let accumulator;

    if (initialValue !== undefined)
        accumulator = initialValue
    else
        accumulator = array[0]

    if (initialValue === undefined)
        for (let i = 1; i < array.length; i++) {
            accumulator = fn(accumulator, array[i])
        }
    else
        for (const value of array)
            accumulator = fn(accumulator, value)

    return [accumulator]
}

const zip = (leftArr, rightArr, fn) => {
    let index, results = [];

    for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++)
        results.push(fn(leftArr[index], rightArr[index]))

    return results;
}

const binaryCurry = fn => a => b => fn(a, b)

// const curry = fn => {
//     const recur = (...args) => args.length < fn.length ? () => recur(args.concat([].slice.call(arguments))) : fn(...args)
//     return recur
// }

const curry = fn => {
    if (typeof fn !== 'function') {
        throw Error('No function provided')
    }

    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function() {
                return curriedFn.apply(null, args.concat([].slice.call(arguments)))
            }
        }
        return fn.apply(null, args);
    }
}

// 실행 순서
// const add = a,b,c => a + b + c
// curry(add)
// addCurried(1)(2)(3)
// 1 일 때

const partial = (fn, ...args) => (...fullArguments) => {
    let count = 0;
    for (let i = 0; i < args.length && count < fullArguments.length; i++)
        if (args[i] === undefined)
            args[i] = fullArguments[count++];
    return fn.apply(null, args)
}

export {
    forEach,
    map,
    filter,
    concatAll,
    reduce,
    zip,
    binaryCurry,
    curry,
    partial
}