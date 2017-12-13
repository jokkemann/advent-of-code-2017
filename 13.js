const fs = require('fs')

let file = './example13.txt'

file = './inputs/13.txt'

const input = fs.readFileSync(file).toString().trim()

let state = parseFw(input)

console.log(solve(state))

function solve(state) {

	return {
		task1: task1(state, 0).sev,
		task2: task2(state)
	}
}

function task2(state) {

	let delay = -1
	let sev = -1
	let isCaught = false
	do {
		let calc = task1(state, ++delay)
		sev = calc.sev
		isCaught = calc.isCaught
	} while (isCaught || sev !== 0)

	return delay
}

function task1(state, delay) {

	let sev = 0
	let isCaught = false

	state.forEach(s => {
		let stepsForFullLap = (s.range - 2) * 2 + 2
		stepsForFullLap = Math.max(1, stepsForFullLap)
		if ((delay + s.depth) % stepsForFullLap == 0) {
			sev += s.depth * s.range
			isCaught = true
		}
	})

	return {sev, isCaught}
}

function parseFw(input) {

	let board = input.split('\n').map(parseLine)

	return board

}
function parseLine(line) {

	let match = line.match(/(\d+)\: (\d+)/)
	let depth = parseInt(match[1])
	let range = parseInt(match[2])

	return {
		depth,
		range
	}
}
