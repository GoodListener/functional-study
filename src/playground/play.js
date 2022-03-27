import {forEach, tap, once, unary, memoize} from '../lib/es-functional.js'

tap('fun')(it => console.log('value is ' + it))

forEach([1,2,3], value =>
    tap(value)(() => {
        console.log(value)
    })
)

const doPayment = once(() => {
    return 'true'
})

console.log(doPayment())

console.log(doPayment())

function test (a,[b,c]) {
    console.log(a,b,c)
}

console.log(test.length)

const factorial = n => {
    if (n === 0) {
        return 1;
    }

    return n * factorial(n - 1)
}

const fastFactorial = memoize(n => {
    if (n === 0) {
        return 1;
    }

    return n * fastFactorial(n - 1)
})

console.log(new Date().getTime())
console.log(fastFactorial(2500))
console.log(new Date().getTime())