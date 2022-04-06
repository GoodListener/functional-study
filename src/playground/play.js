import {curry, filter} from "../lib/es-functional";

const add = (x,y,z) => x + y + z

const addCurried = curry(add)

const multiple = (a,b,c) => a * b * c

const multipleCurried = curry(multiple)

const curriedMul1 = multipleCurried(1)

console.log(curriedMul1(2)(3))

const curriedFilter = curry(filter)

const isThree = curriedFilter(a => a === 3)

const result = isThree([1,2,3])

console.log(result)
console.log(isThree([1,2,3,4,3,5,2,3]))
