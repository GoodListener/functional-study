import {forEach, forEachObject, sortBy, times, unless} from '../lib/es-functional.js'

const array = [1,2,3]
forEach(array, (data) => {
    // 데이터는 forEach 함수에서 현재 함수의 인자로 전달된다.
})

const obj = {a:1, b:2}

forEachObject(obj, (key, value) => {
    console.log(key + ":" + value)
})

times(100, n => {
    unless(n % 2, () => {
        console.log(n, 'is even')
    })
})

const people = [
    {
        firstName: 'asdftest',
        lastName: 'gosdf'
    },
    {
        firstName: 'aldkjf',
        lastName: 'sdfs'
    },
    {
        firstName: 'binasdf',
        lastName: 'sdfabtr'
    }
]

people.sort(sortBy('firstName'))

console.log(people);