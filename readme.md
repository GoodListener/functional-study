## 커링과 부분 적용(파셜)

용어 정리   

1. 단항함수   
인자 하나만 갖는 함수
2. 이항함수   
인자를 두개 갖는 함수
3. 가변인자함수   
다양한 개수의 인자를 갖는 함수


#### 커링
```js
const add = (x,y) => x + y;
const addCurried = x => y => x + y; // currying function

console.log(addCurried(2)(3)) // 6

const binaryCurry = fn => a => b => fn(a, b)
// 이항함수를 중첩된 단항함수로 변경시키는 함수

const addCurried2 = binaryCurry(add)

console.log(addCurried2(2)(3)) // 6
```

#### 다항함수를 다루기 위한 커링
```js
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

// 참고: apply는 함수를 call하면서 인자들을 단일 배열로 변환시켜 실행한다.

// 좀 더 보기쉽게 가능할까..?

const add = (x,y,z) => x + y + z
const curriedAdd = curry(add)

curriedAdd(1)(2)(3)

const filter = (fn, array) => {
    const result = []
    for (const value of array) {
        fn(value) ? result.push(arr) : undefined
    }
    return result;
}

const curriedFilter = curry(filter)

const isThree = curriedFilter(a => a === 3)

console.log(isThree([1,2,3,4,3,5,2,3]))
// [3,3,3]
```

#### 커리의 실 사용 (함수 합성)
```js
// 1. 배열에서 숫자 검색

// match 함수
let match = curry((expr, str) => str.match(expr))
let hasNumber = match(/[0-9]+/)

let curriedFilter = curry(filter)

const findNumberInArray = curriedFilter(hasNumber)

const foundNumberString = findNumberInArray(['js', 'number1'])

console.log(foundNumberString)
```

#### 커리의 실 사용 (함수 합성)
```js
// 1. 배열에서 숫자 검색

// match 함수
let match = curry((expr, str) => str.match(expr))
let hasNumber = match(/[0-9]+/)

let curriedFilter = curry(filter)

const findNumberInArray = curriedFilter(hasNumber)

const foundNumberString = findNumberInArray(['js', 'number1'])

console.log(foundNumberString) // ['number1']

// 2. 배열 제곱
// 기존 풀이방식
console.log(map(x => x * x, [1,2,3,4,5]))

const curriedMap = curry(map)
const squareAll = curriedMap(x => x * x)
console.log(squareAll([1,2,3,4,5])) // [1,4,9,16,25]
```

#### 데이터 플로우.. (partial 로 들어가기)
```js
setTimeout(() => console.log('do task 1'), 10)
setTimeout(() => console.log('do task 2'), 10)

const curriedTimeout = curry(setTimeout)
// setTimeout을 curry로 감싸도 제대로 동작하지 않음

curriedTimeout(() => {console.log('do task 1')})(10) // not work
// 커리 함수는 가장 왼쪽에서 오른쪽의 리스트로 인자를 적용한다.

const setTimeoutWrapper = (time, fn) => {
    setTimeout(fn, time)
}

const curriedTimeout = curry(setTimeoutWrapper)(10)
// setTimeout을 wrapper함수로 감싸서 함수의 오른쪽이 우선이 되도록 하고
// curry로 감싸면 해결됨

curriedTimeout(() => console.log('do task 1')) // do task 1
```

#### 부분 함수 사용 (partial)
```js
const partial = (fn, ...partialArgs) => (...fullArguments) => {
    let args = partialArgs.slice(0); // 수정된 부분.
    let count = 0;
    for (let i = 0; i < args.length && count < fullArguments.length; i++)
        if (args[i] === undefined)
            args[i] = fullArguments[count++];
    return fn.apply(null, args)
}

const delayedTenMs = partial(setTimeout, undefined, 10)
delayedTenMs(() => console.log('do task 1')) // do task 1

// But, 버그가 있음
delayedTenMs(() => console.log('do task 2')) // do task 1 ??? 2가 아닌 1이 출력
// undefined 를 인자로 변환시키면서 partial 의 args가 변경됨..

// partial 내부의 partialArgs를 복제해서 args를 다시 만들어줌.
// 직접 array를 변경하지 못하도록 수정.
```