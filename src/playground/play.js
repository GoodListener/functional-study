/*
const Container = function(val) {
  this.value = val;
}

let testValue = new Container(3)
console.log(testValue)

const a = 3
console.log(new Container(a))

const obj = { test : 'blur' }
console.log(new Container(obj))

Container.of = function (value) {
  return new Container(value);
}

testValue = Container.of('testValue')
console.log(testValue)

const goodContainer = Container.of(Container.of('good'))
console.log(goodContainer)

Container.prototype.map = function (fn) {
  return Container.of(fn(this.value))
}

const addGoods = goodContainer
  .map((goodContainer) => goodContainer.value + goodContainer.value)
  .map((value) => value.split(''))
console.log(addGoods)

*/
///////

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

import request from 'sync-request'

let getTopTenRedditPosts = (type) => {
  let response
  try {
    response = JSON.parse(request('GET', `https://www.reddit.com/r/subreddits/${type}.json?limit=10`).getBody('utf-8'))
  } catch (err) {
    response = {
      message: 'wrong',
      errorCode: err['statusCode']
    }
  }
  return response
}


const posts = getTopTenRedditPosts('new')

console.log(posts)

let getTopTenSubRedditData = (type) => {
  let response = getTopTenRedditPosts(type);
  return MayBe.of(response).map(arr => arr['data'])
    .map(arr => arr['children'])
    .map(arr => arr.map(item => {
      return {
        title: item['data'].title,
        url: item['data'].url
      }
    }))
}

const subRedditDatas = getTopTenSubRedditData('new') // handling exception
console.log(subRedditDatas)

const Nothing = function(val) {
  this.value = val;
}

Nothing.of = function(val) {
  return new Nothing(val);
}

Nothing.prototype.map = function(fn) {
  return this
}

const Some = function(val) {
  this.value = val;
}

Some.of = function(val) {
  return new Some(val)
}

Some.prototype.map = function (fn) {
  return Some.of(fn(this.value))
}

const Either = {
  Some: Some,
  Nothing: Nothing
}

let getTopTenSubRedditPostsEither = (type) => {
  let response
  try {
    response = Some.of(JSON.parse(request('GET', `https://www.reddit.com/r/subreddits/${type}.json?limit=10`).getBody('utf-8')))
  } catch (err) {
    response = Nothing.of({ message: 'Something went wrong', errorCode: err['statusCode']})
  }
  return response
}

let getTopTenSubRedditDataEither = (type) => {
  let response = getTopTenSubRedditPostsEither(type);
  return response.map(arr => arr['data'])
    .map(arr => arr['children'])
    .map(arr => arr.map(item => {
      return {
        title: item.data.title,
        url: item.data.url
      }
    }))
}

console.log(getTopTenSubRedditDataEither('new'))