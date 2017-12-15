const arr = Array(256).fill(0).map((n, i) => i)

const { createKnotHash, performHashAlgorithm } = require('./helpers')

const task1 = (input) => {
	let res = performHashAlgorithm(input.split(',').map(s => parseInt(s)), 0, 0, arr)
	return res.arr[0] * res.arr[1]
}

console.log(solve())

function solve() {
	const fs = require('fs')
	const input = fs.readFileSync('./inputs/10.txt').toString().trim()

	return {
		task1: task1(input),
		task2: createKnotHash(input)
	}
}




