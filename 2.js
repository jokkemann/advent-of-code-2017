const fs = require('fs')
//const input = ['5 1 9 5', '7 5 3', '2 4 6 8']
//const input = ['5 9 2 8', '9 4 7 3', '3 8 6 5']

const input = fs.readFileSync('./inputs/2.txt').toString().split('\n').filter(s => s !== '').map(s => s.trim())

function getChecksum(input) {
        let sum = 0
        let sum2 = 0
        input.forEach((s) => {
                let numbers = s.split(/\s/).map(num => parseInt(num))
                numbers.sort((a, b) => b - a)

                sum += numbers[0] - numbers[numbers.length - 1]

                for (let i = 0; i < numbers.length; i++) {
                        let number = numbers[i]
                        let result = getQuotient(number, numbers.slice(i+1))
                        if (result) {
                                sum2 += result
                                break;
                        }
                }
        })


        return { task1: sum, task2: sum2 }
}

function getQuotient(number, list) {
        let divisor = list.find(n => number % n === 0)
        return divisor ? number / divisor : 0
}

console.log(getChecksum(input))
