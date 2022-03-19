
const forEach = (array, fn) => {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
}

const forEachObject = (obj, fn) => {
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            // 인자로 key, value를 이용해서 fn을 호출
            fn(property ,obj[property])
        }
    }
}

const unless = (predicate, fn) => {
    if (!predicate)
        fn()
}

const times = (times, fn) => {
    for (let i = 0; i < times; i++) {
        fn(i)
    }
}

const every = (arr, fn) => {
    let result = true;
    for (const value of arr) {
        result = result && fn(value)
    }
    return result
}

// 고차함수 클로저 사용으로
// sort에서 해당 property값을 기억
const sortBy = property => {
    return (a, b) => {
        const result = (a[property] < b[property]) ? -1 :
            (a[property] > b[property]) ? 1 : 0;
        return result
    }
}

export {
    forEach,
    forEachObject,
    unless,
    times,
    every,
    sortBy
}