## 컴포지션과 파이프라인

#### 컴포지션

유닉스 철학 중   
1. 각 프로그램이 한 가지 작업을 잘하게 하라. 새로운 작업을 하려면 새로운 기능을 추가해 오래된 프로그램을 복잡하게 하지 말고 새로 만들어라
2. 모든 프로그램의 출력이 아직 알려지지 않은 다른 프로그램의 입력이 될 것으로 예상한다.
----
   

#### 작은 단위의 함수를 연결하는 compose 함수
```js
const compose = (a, b) => (c) => a(b(c))

// 문자열 parse float 후 반올림하기
let data = parseFloat("3.56")
let number = Math.round(data)

// compose로 함수 결합
let number = compose(Math.round, parseFloat) // parseFloat의 결과를 Math.round에 넣는다.
// 순서가 역순

number("3.56") // 4
```

#### 여러 인자를 갖는 함수의 결합은 curry와 partial
```js
let filterGoodBooks = book => book.rating[0] > 4.5;

let projectTitleAndAuthor = book => ({ title: book.title, author: book.author })

let queryGoodBooks = partial(filter, undefined, filterGoodBooks)
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor)
let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks)

const booksDetails = concatAll(
    map(apressBooks, (book) => {
      return book.bookDetails
    })
)
console.log(titleAndAuthorForGoodBooks(booksDetails))
```

#### 여러 함수의 결합
```js
const composeN = (...fns) => 
  value => 
    reduce(fns.reverse(), (acc, fn) => fn(acc), value)

let splitIntoSpaces = str => str.split(' ');
let count = array => array.length;
const countWords = compose(count, splitIntoSpaces)

console.log(countWords('aa bb cc dd')) // 4

let oddOrEven = ip => ip % 2 ? 'even' : 'odd'

const oddOrEvenWords = composeN(oddOrEven, count, splitIntoSpaces)

console.log(oddOrEvenWords('aa bb cc dd ee')); // ['even']
```

#### 파이프라인, 시퀀스
```js
const pipe = (...fns) =>
  value => 
    reduce(fns, (acc, fn) => fn(acc), value)
// reverse없는 composeN

const oddOrEvenWords22 = pipe(splitIntoSpaces, count, oddOrEven)

console.log(oddOrEvenWords22('aa bb cc dd ee'))
```
pipe함수는 compose에서 reverse만 뺀 것과 동일   

#### 컴포지션의 특징
- 결합법칙이 성립
```text
수학공식..

x * (y * z) = (x * y) * z = xyz
```

```js
compose(f, compose(g,h)) == compose(compose(f,g), h)
```
이므로 앞의 composeN으로 적용한 함수들을 compose로 묶어서 처리시 이런 형태가 가능함    
    

#### 파이프라인 연산자
```js

const double = n => n * 2
const increment = n => n + 1
const ntimes = n => n * n

const result = ntimes(double(increment(double(double(5)))))
console.log(result);

const result2 = 5 |> double |> double |> increment |> double |> ntimes
console.log(result2)
// 파이프라인 tc39 proposals 검토 확인하면 될듯
```

