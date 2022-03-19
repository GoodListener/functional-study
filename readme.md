## 고차함수 (High Order Function) =? HOC (High Order Component)

---

###1. 고차함수란
자바스크립트에서 함수는 데이터 (일급객체)
자바스크립트의 데이터 형은
- Number 
- String 
- Boolean 
- Object 
- null 
- undefined
- ...

이 있는데 

### 함수도 데이터다. 

**일급객체: 데이터의 저장 반환 전달이 가능

함수 저장
``` js
let fn = () => {} // 변수에 함수 저장
typeof fn // "function"
fn() // 함수 동작
```

### 함수는 전달이 가능하다.

전달 예시
```js
let tellType = (arg) => {
    console.log(typeof arg)
}

let dataFn = () => {
    console.log("I'm a function")
}

tellType(dataFn) // function
```

전달한 함수 실행 가능
```js 
let tellType = (arg) => {
    if (typeof arg === 'function') {
        arg()
    } else {
        console.log('The passed data is ' + arg)
    }
}

tellType(dataFn) // I'm a function
``` 

### 함수는 반환(return)이 가능하다
반환 가능
```js
let dataFn = (arg) => {
    console.log(arg)
}

// Fn => dataFn
let returnFn = () => dataFn

returnFn()("I'm a function")
```
---
### 추상화

고차함수를 통한 추상화

```js
// 객체 반복을 추상화
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
```
