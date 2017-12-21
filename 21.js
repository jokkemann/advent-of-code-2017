const fs = require('fs')

let file = './inputs/21.txt'

const input = fs.readFileSync(file).toString().trim()

console.log(solve(input))

function solve(input) {
	const startPattern = 
		`.#.
		 ..#
		 ###`.split(/\n/).map(r => r.trim())

	return {
		task1: task1(input, startPattern),
		task2: task2(input, startPattern)
	}

}
function task1(input, pattern) {
	return countStars(iterate(input, pattern, 5))
}
function task2(input, pattern) {
	return countStars(iterate(input, pattern, 18))
}
function countStars(pattern) {
	return pattern.reduce((a,b) => a + b.split('').filter(s => s === '#').length, 0)
}
function iterate(input, pattern, count) {
	let rules = input.split(/\n/).map(parseRule).reduce((a, b) => a.concat(getPermutations(b.in).map(a_perm => ({ in: a_perm, out: b.out }))), [])

	for (let i = 0; i < count; i++) {
		let split = splitSquare(pattern)
		let changed = []
		split.forEach((s, i) => {
			let r = rules.find(rule => sqCompare(s, rule.in))
			changed.push(r.out)

		})
		pattern = joinSubsquares(changed)

		//printSquare(pattern)
	}

	return pattern
}

function sqCompare(a, b) {
	if (a.length !== b.length) {
		return false
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i].length !== b[i].length) {
			return false
		}
		for (let j = 0; j < a[i].length; j++) {
			if (a[i][j] !== b[i][j]) {
				return false
			}
		}
	}
	return true
}

function getPermutations(split) {
	return [
		split,
		flipX(split),
		rotate(split),
		flipX(rotate(split)),
		rotate(rotate(split)),
		flipX(rotate(rotate(split))),
		rotate(rotate(rotate(split))),
		flipX(rotate(rotate(rotate(split))))
	]
}

function splitSquare(square) {
	let n = square.length % 2 === 0 ? 2 : 3
	let ret = []

	let side = square.length
	let subSquares = []
	for (let i = 0; i < side; i += n) {
		for (let j = 0; j < side; j += n) {
			let subSquare = []
			for (let k = 0; k < n; k++) {
				subSquare.push(square[k+i].substr(j, n))
			}
			subSquares.push(subSquare)
		}
	}

	return subSquares
}

function joinSubsquares(subSquares) {
	let square = []
	if (subSquares.length === 1) {
		return subSquares[0]
	}
	let num = Math.sqrt(subSquares.length)
	for (let i = 0; i < subSquares.length; i+= num) {
		for (let j = 0; j < subSquares[0].length; j++) {
			let row = []
			for (let k = 0; k < num; k++) {
				row.push(subSquares[i+k][j])
			}
			square.push(row.join(''))
		}
	}
	return square
}

function parseRule(s) {
	let match = s.match(/(.*)\s\=\>\s(.*)/)
	return {
		in: match[1].split('/'),
		out: match[2].split('/')
	}
}

function flipX(square) {
	return square.map(r => r.split('').reverse().join(''))
}
function rotate(square) {
	let ret = []
	square.forEach(r => ret.push(['']))
	for (let i = 0; i < ret.length; i++) {
		for (let j = 0; j < ret.length; j++) {
			ret[i] += square[ret.length - j - 1][i]
		}
	}
	return ret
}
function printSquare(sq) {
	console.log(squareToString(sq))
	console.log()
}
function squareToString(sq) {
	return sq.join('\n')
}
