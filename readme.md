## 배열로 함수형 다루기

배열을 다루는 함수를 직접 만들어봄
1. map
2. filter
3. concatAll == flat?
4. reduce
5. zip



#### map   
```js
const map = (array, fn) => {
    let results = []
    for (const value of array)
        results.push(fn(value))
    return results
}

const filter = (array, fn) => {
    let results = []
    for (const value of array)
        fn(value) ? results.push(value) : undefined
    return results
}

const concatAll = (array, fn) => {
    let results = []
    for (const value of array)
        results.push.apply(results, value)

    return results
}

const reduce = (array, fn, initialValue) => {
    let accumulator;

    if (initialValue !== undefined)
        accumulator = initialValue
    else
        accumulator = array[0]

    if (initialValue === undefined)
        for (let i = 1; i < array.length; i++) {
            accumulator = fn(accumulator, array[i])
        }
    else
        for (const value of array)
            accumulator = fn(accumulator, value)

    return [accumulator]
}

const zip = (leftArr, rightArr, fn) => {
    let index, results = [];

    for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++)
        results.push(fn(leftArr[index], rightArr[index]))

    return results;
}
```

함수들을 이용하여 배열 정보 처리

```js
import { apressBooks } from '../data/apressBooks'

const goodRatingCriteria = (book) => book.rating[0] > 4.5;

const goodRatingBooks = filter(
    concatAll(
        map(apressBooks, (book) => {
            return book.bookDetails
        })
    )
, goodRatingCriteria)

console.log(goodRatingBooks)
```

함수형으로 자바스크립트 작성하는 라이브러리 참고
RxJS