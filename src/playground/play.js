import { forEach, tap } from '../lib/es-functional.js'

tap('fun')(it => console.log('value is ' + it))

forEach([1,2,3], value =>
    tap(value)(() => {
        console.log(value)
    })
)