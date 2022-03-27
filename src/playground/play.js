import {map, filter, concatAll} from '../lib/es-functional.js'
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