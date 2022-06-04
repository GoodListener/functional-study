/*
const async1 = (callback) => {
  setTimeout(() => {
    callback('data');
  }, 300)
}

const async2 = (callback) => {
  setTimeout(() => {
    callback('data2');
  }, 200)
}

const async3 = (callback) => {
  setTimeout(() => {
    callback('data3');
  }, 100)
}

async1((data) => {
  async2((data2) => {
    async3((data3) => {
      // console.log(data + data2 + data3);
    })
  })
})

// generator function

function* gen() {
  yield 'first gen'
  yield 'second gen'
  yield 'third gen'
}

let generatorResult = gen()

console.log(generatorResult.next())
console.log(generatorResult.next())

let generatorSequence = gen()

// 제네레이터 반복문
for (let value of generatorSequence) {
  console.log(value)
}
// first gen
// second gen
// third gen

// 전개 가능
let genResult = [...gen()]

genResult.forEach(value => console.log(value))

// 제네레이터에 데이터 전달.
function* sayFullName() {
  let firstName = yield;
  let secondName = yield;
  console.log(firstName + secondName)
}

let fullName = sayFullName()

fullName.next()
fullName.next('test')
fullName.next('man')
*/
// 비동기 구문

let generator;
let getDataOne = () => {
  setTimeout(() => {
    generator.next('dummy data one')
  }, 1000)
}

let getDataTwo = () => {
  setTimeout(() => {
    generator.next('dummy data two')
  }, 1000)
}


function* main() {
  let dataOne = yield getDataOne();
  let dataTwo = yield getDataTwo();
  console.log('data one: ', dataOne);
  console.log('data two: ', dataTwo);
}

generator = main()

generator.next()
// async await 이랑 똑같다?

// async await 이 더 진보된 방법이다? ??
// 제네레이터만의 장점을 다 보여주진 못했음
// 마플의 개발자 책을 보면 좋을듯
