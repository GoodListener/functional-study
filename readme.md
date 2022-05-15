## 모나드

문제를 해결하며 진행   

문제: 검색쿼리용 Reddit 댓글 가져오기

1. 검색
2. 검색 결과에서 children 에서 댓글 api link 가져오기
3. 링크 URL을 통해 댓글 배열을 반환
4. 타이틀과 댓글 배열을 결합

```js
let searchReddit = (search) => {
  let response
  try {
    response = JSON.parse(
      request('GET', `https://www.reddit.com/search.json?q=${encodeURI(search)}`)
        .getBody('utf8'))
  } catch (err) {
    response = { message: 'Something went wrong', errorCode: err['statusCode']}
  }
  return response
}
```

MayBe 함수자로 감싸서 레딧 댓글을 가져와서 데이터를 다루기
```js
const MayBe = function (val) {
  this.value = val;
}

MayBe.of = function(val) {
  return new MayBe(val)
}

MayBe.prototype.isNothing = function () {
  return (this.value === null || this.value === undefined)
}

MayBe.prototype.map = function (fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
}

MayBe.prototype.join = function() {
  return this.isNothing() ? MayBe.of(null) : this.value
}

MayBe.prototype.chain = function(fn) {
  return this.map(fn).join()
}
```

```js
let getComments = (link) => {
  let response
  try {
    response = JSON.parse(
      request('GET', `https://www.reddit.com${link}`)
        .getBody('utf8'))
  } catch (err) {
    response = { message: 'Something went wrong', errorCode: err['statusCode'] }
  }
  return response
}
```
---
MayBe로 감싸서 레딧 검색 결과 가져오기
```js
let mergeViaMayBe = (searchText) => {
  let redditMayBe = MayBe.of(searchReddit(searchText))
  let ans = redditMayBe
    .map(arr => arr['data'])
    .map(arr => arr['children'])
    .map(arr => arr.map(item => {
      return {
        title: item.data.title,
        permalink: item.data.permalink
      }
    }))
  return ans
}
```
---
chain을 통해 가져온 결과를 연결
```js
const linkToJson = (link) => {
  return link.substring(0, link.lastIndexOf('/')) + '.json';
}
// 책에 있는 예제로 가져오면 에러나서 소스 살짝 수정 ( 레딧 api 명세가 달라져서 발생하는 듯 )
```
결과 배열의 길이를 연결하여 length를 반환
```js
let mergeViaChain = (searchText) => {
  let redditMayBe = MayBe.of(searchReddit(searchText))
  let ans = redditMayBe.map(arr => arr['data'])
    .map(arr => arr['children'])
    .map(arr => arr.map(item => {
      return {
        title: item.data.title,
        permalink: item.data.permalink
      }
    }))
    .chain(obj => obj.map(item => {
      return {
        title: item.title,
        comments: MayBe.of(getComments(linkToJson(item.permalink))).chain(item => {
          return item.length
        })
      }
    }))
  return ans
}
```

모나드란 ? : 체인을 갖고있는 함수자가 모나드다.