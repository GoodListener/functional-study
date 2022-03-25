## 클로저와 고차함수

### 클로저란

클로저는 내부함수다.
```js
function outer() {
    function inner() {
        
    }
}
```
클로저는 스코프체인에 접근할 수 있다.

클로저의 스코프
1. 자체 선언 내에서 선언된 변수
2. 전역 변수에 접근
3. 외부 함수의 변수에 접근

```js
let scope2 = 'scope2'
function outer() {
    let scope3 = 'outer'
    function inner() {
        let scope1 = 5;
        
        console.log(scope1);
        console.log(scope2);
        console.log(scope3);
    }
    inner()
}
```
스코프 3의 경우 외부함수의 변수에 접근..  

또한 외부함수의 파라미터에도 접근할 수 있다.
```js
const fn = arg => {
    let outer = 'Visible'
    let innerFn = () => {
        console.log(outer)
        console.log(arg)
    }
    return innerFn
}

const closureFn = fn(5)
closureFn() // Visible  5
```
진행과정 :

```js
const closureFn = fn(5)
```
1. 호출시 fn은 인자 5를 받고 호출, fn 정의가 이뤄지면 innerFn을 반환
2. innerFn이 반환되면서 js실행엔진은 innerFn을 클로저로 봄
3. 스코프를 지정함 (클로저의 스코프)
4. 반환된 함수 참조는 closureFn 내에 저장
5. closureFn이 스코프체인을 통해 호출되면 arg, outer 값을 가짐
```js
closureFn()
```
6. 호출, closureFn이 생성되면 스코프/문맥을 기억한다.  

클로저는 **스코프를 기억한다 문맥을 기억한다**

### 유용한 고차함수

tap
```js
const tap = value => 
    fn => (
        typeof(fn) === "function" && fn(value),
            console.log(value)
    )
```
참고 : (exp1, exp2)는 두 인자를 실행해서 두 번째 표현식인 exp2를 반환함을 의미한다.  
tab함수는 value를 닫고 value상 클로저를 갖는 함수를 반환하며 실행한다.

---
unary   
하나의 연산에 대해서만 처리하게 하는 함수

```js
['1', '2', '3'].map(parseInt)
// [1, NaN, NaN]
```
예상하지 않은 결과가 나옴   
parseInt(string: string, radix?: number)  
map이 호출하는 element, index, arr   
parseInt함수를 호출할 때 string에 element가 전달되고
radix에 index가 전달되어 예상하지 않은 결과가 나오는 것

이럴 때 하나의 인자만 필요하므로 unary 함수를

```js
const unary = (fn) => 
    fn.length === 1
        ? fn
        : (arg) => fn(arg)

['1', '2', '3'].map(unary(parseInt))
// [1, 2, 3]
```

---

once  
함수를 한 번만 실행해야 하는 경우
```js
const once = (fn) => {
    let done = false;
    
    return function () {
        return done ? undefined : ((done = true), fn.apply(this, arguments))
    }
}

const doPayment = once(() => { console.log('payment is done') })

doPayment()
// payment is done

doPayment()
// undefined
```

memoize
```js

```


















































