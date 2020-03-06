export function iterations(data) {
    console.log('Running iterations...')
    function fn(num) {
        if (num % 500000000 === 0) console.log(num)
        return num + 1
    }
    var iterations = 1000000000
    for (var i = 0; i < iterations; i++) {
        fn(i)
    }
    console.log('Iterations complete.')
    return data
}
