const fs = require('fs')

let file = './inputs/19.txt'

let input = fs.readFileSync(file).toString()

let lines = input.split(/\n/).filter(s => s !== '').map(r => r.split(''))
let pos = [0, lines[0].indexOf('|')]

let dir = 'D'

let done = false
let chars = ''
let i = 0
while (!done) {
    let [y, x] = pos
    if (lines[y][x] === '+') {
        if (dir === 'D' || dir === 'U') {
            if (x === 0 || lines[y][x+1] !== ' ') {
                dir = 'R'
            }
            else if (x === lines[y].length - 1 || lines[y][x-1] !== ' ') {
                dir = 'L'
            }
            else {
                done = true
            }
        }
        else if (dir === 'R' || dir === 'L') {
            // console.log(y, lines.length)
            if (y === 0 || lines[y+1][x] !== ' ') {
                dir = 'D'
            }
            else if (y === lines.length - 1 || lines[y-1][x] !== ' ') {
                dir = 'U'
            }
            else {
                done = true
            }
        }
    }
    else if (lines[y][x] === ' ') {
        done = true
    }
    if (dir === 'D') {
        y++
    }
    else if (dir === 'R') {
        x++
    }
    else if (dir === 'U') {
        y--
    }
    else if (dir === 'L') {
        x--
    }
    pos = [y, x]
    // console.log(pos, lines[y][x])
    if (!lines[y][x]) {
        done = true
    }
    else {
        let match = lines[y][x].match(/[A-Za-z]/)
        if (match) {
            // console.log(match)
            chars += match[0]
        }
    }
    i++
}
console.log({
    task1: chars,
    task2: i-1
})
