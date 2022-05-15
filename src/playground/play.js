import request from 'sync-request'

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

// 추가
MayBe.prototype.join = function() {
  return this.isNothing() ? MayBe.of(null) : this.value
}

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

const linkToJson = (link) => {
  return link.substring(0, link.lastIndexOf('/')) + '.json';
}

/*
const answer = mergeViaMayBe('functional programming2')
  .map(obj =>
    obj.map(item => {
      return MayBe.of({
        title: item.title,
        comments: MayBe.of(
          getComments(linkToJson(item.permalink))).join()
      })
})).join()

const comments = answer.map(result => {
  return result.map(mergeResult => {
    return mergeResult.comments.map(comment => {
      return { comment: comment }
    })
  })
})
*/

MayBe.prototype.chain = function(fn) {
  return this.map(fn).join()
}

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

const result = mergeViaChain('functional programming2')

console.log(result);

const testMayBe = MayBe.of([1,2,3])
const tResult = testMayBe.map(t => { t.push(4); return t}).chain(t => t.length)
console.log(tResult)