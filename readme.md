## 커링과 부분 적용

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