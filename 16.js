const fs = require('fs')

const file = './inputs/16.txt'

const input = fs.readFileSync(file).toString().trim()

const programs = new Array(16).fill(0).map((e, i) => String.fromCharCode('a'.charCodeAt(0)+i))

console.log(solve(input))
function solve(input) {
	return {
		task1: task1(input, programs),
		task2: task2(input, programs)
	}
}

function task2(input, programs) {
	let progs = programs.slice()
	let j = 0

	// figure out how many times it takes for a loop
	do {
		progs = task1(input, progs).split('')
		j++
	} while (progs.join('') !== programs.join(''))

	for (let i = 0; i < (1000000000 % j); i++) {
		progs = task1(input, progs).split('')
	}
	return progs.join('')
}

function task1(input, programs) {
	let progs = programs.slice()
	let moves = input.split(',')
	moves.forEach(m => {
		progs = performMove(m, progs)
	})
	return progs.join('')
}

function performMove(move, progs) {
	if (move.startsWith('s')) {
		// spin
		let match = move.match(/^\w(\d+)$/)
		let fromEnd = -parseInt(match[1])
		progs = progs.splice(fromEnd).concat(progs)
	}
	else if (move.startsWith('x')) {
		// exchange
		let match = move.match(/^x(\d+)\/(\d+)$/)
		let start = parseInt(match[1])
		let end = parseInt(match[2])

		progs = swap(progs, start, end)
	}
	else if (move.startsWith('p')) {
		// partner
		let match = move.match(/^p(\w)\/(\w)$/)
		let startProg = match[1]
		let endProg = match[2]

		let start = progs.indexOf(startProg)
		let end = progs.indexOf(endProg)
		progs = swap(progs, start, end)
	}
	return progs

}

function swap(arr, a, b) {
	let temp = arr[a]
	arr[a] = arr[b]
	arr[b] = temp
	return arr
}
