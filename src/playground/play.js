import {curry, filter, map, partial} from "../lib/es-functional";

const add = (x,y,z) => x + y + z

const addCurried = curry(add)

const multiple = (a,b,c) => a * b * c

const multipleCurried = curry(multiple)

const curriedMul1 = multipleCurried(1)

// console.log(curriedMul1(2)(3))

const curriedFilter = curry(filter)

const isThree = curriedFilter(a => a === 3)

const result = isThree([1,2,3])

// console.log(result)
// console.log(isThree([1,2,3,4,3,5,2,3]))


let match = curry((expr, str) => str.match(expr))
let hasNumber = match(/[0-9]+/)

// console.log(hasNumber('number1'))

const findNumberInArray = curriedFilter(hasNumber)

const foundNumberString = findNumberInArray(['js', 'number1'])

// console.log(foundNumberString)

const curriedMap = curry(map)

const squareAll = curriedMap(x => x * x)

// console.log(squareAll([1,2,3,4,5]))


// const curriedTimeout = curry(setTimeout)
//
// curriedTimeout(() => {console.log('do task 1')})(10) // not work

const setTimeoutWrapper = (time, fn) => {
    setTimeout(fn, time)
}

const curriedTimeout = curry(setTimeoutWrapper)(10)

curriedTimeout(() => console.log('do task 1')) // do task 1

const delayedTenMs = partial(setTimeout, undefined, 10)
delayedTenMs(() => console.log('do task 1')) // do task 1