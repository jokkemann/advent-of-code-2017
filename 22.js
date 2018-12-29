const fs = require('fs')

let file = './examples/22.txt'
file = './inputs/22.txt'

const input = fs.readFileSync(file).toString().trim().split(/\n/).map(r => r.split(''))

console.log(solve(input))

function solve(input) {

	return {
		task1: task1(input),
		task2: task2(input)
	}
}

function task1(input) {
	let gridSize = 10000
	let grid = new Array(gridSize).fill([])
	for (let i = 0; i < gridSize; i++) {
		grid[i] = new Array(gridSize).fill('.')
	}
	let half = grid.length / 2

	let pos = [half, half]
	let side = input.length

	/*
	grid.forEach(r => {
		console.log(r)
		//console.log(r.slice(start, start+side))
	})
	*/
	let start = Math.round(half - side / 2)
	for (let i = 0; i < side; i++) {
		var row = input[i]
		for (let j = 0; j < side; j++) {
			//console.log(i, j, start+i, start+j)
			let c = input[i][j]
			//console.log('c', c)
			if (c === '#') {
				//console.log('switch')
				grid[start+i][start+j] = c
			}
		}
	}
	//grid.slice(start, start+side).forEach(r => {
	/*
	console.log('grid after')
	grid.forEach(r => {
		console.log(r)
		//console.log(r.slice(start, start+side))
	})
	*/
	let inf = 0
	let dir = 'U'
	for (let i = 0; i < 10000000; i++) {
		let curPos = grid[pos[1]][pos[0]]
		if (curPos === '#') {
			dir = dir === 'U' ? 'R' : dir === 'R' ? 'D' : dir === 'D' ? 'L' : 'U'
			grid[pos[1]][pos[0]] = 'F'
		}
		else if (curPos === 'W') {
			grid[pos[1]][pos[0]] = '#'
			inf++
		}
		else if (curPos === 'F') {
			dir = dir === 'U' ? 'D' : dir === 'R' ? 'L' : dir === 'D' ? 'U' : 'R'
			grid[pos[1]][pos[0]] = '.'
		}
		else {
			dir = dir === 'U' ? 'L' : dir === 'L' ? 'D' : dir === 'D' ? 'R': 'U'
			grid[pos[1]][pos[0]] = 'W'
		}
		if(dir === 'U') {
			pos[1]--
		}
		else if (dir === 'R') {
			pos[0]++
		}
		else if (dir === 'D') {
			pos[1]++
		}
		else {
			pos[0]--
		}
	}
	console.log(inf)
}

function task2(input) {
	return 0
}
