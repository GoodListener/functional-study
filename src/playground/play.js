import {curry, filter, map, partial, compose, concatAll, composeN, pipe} from "../lib/es-functional";
import {apressBooks} from "../data/apressBooks";

let filterOutStandingBooks = (book) => book.rating[0] === 5
let filterGoodBooks = book => book.rating[0] > 4.5;
let filterBadBooks = book => book.rating[0] < 3.5;

let projectTitleAndAuthor = book => ({ title: book.title, author: book.author })
let projectAuthor = book => ({ author: book.author })
let projectTitle = book => ({ title: book.title })

let queryGoodBooks = partial(filter, undefined, filterGoodBooks)
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor)
let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks)

const booksDetails = concatAll(
    map(apressBooks, (book) => {
      return book.bookDetails
    })
)
console.log(titleAndAuthorForGoodBooks(booksDetails))

/////

let splitIntoSpaces = str => str.split(' ');
let count = array => array.length;
const countWords = compose(count, splitIntoSpaces)

console.log(countWords('hello world hi papa'))

let oddOrEven = ip => ip % 2 ? 'even' : 'odd'

const oddOrEvenWords = composeN(oddOrEven, count, splitIntoSpaces)

console.log(oddOrEvenWords('hello wordls hi papa gg'));

/////

const oddOrEvenWords22 = pipe(splitIntoSpaces, count, oddOrEven)

console.log(oddOrEvenWords22('hello worlds hi papa gg dd'))

/////

const double = n => n * 2
const increment = n => n + 1
const ntimes = n => n * n

const result = ntimes(double(increment(double(double(5)))))
console.log(result);

// const result2 = 5 |> double |> double |> increment |> double |> ntimes
// console.log(result2)
// 앞으로 가능해질거다.