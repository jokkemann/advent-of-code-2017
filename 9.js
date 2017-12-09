const fs = require('fs')

const file = './inputs/9.txt'
const input = fs.readFileSync(file).toString().split(/\n/).map(s => s.trim()).filter(s => s !== '')

input.map(parseLine).forEach(s => console.log(s))
function parseLine(line) {

	let level = 0
	let score = 0

	let groups = 0
	let garbage = false
	let removedChars = 0

	for (let i = 0; i < line.length; i++) {
		let c = line[i]
		if (garbage) {
			removedChars++
		}

		switch(c) {
		case '{':
			if (!garbage) {
				level++
				groups++
				score += level
			}
		break
		case '}':
			if(!garbage) {
				level--
			}
		break
		case '!':
			i++
			if (garbage) {
				removedChars--
			}
		break
		case '<':
			garbage = true
		break
		case '>':
			garbage = false
			removedChars--
		break
		}
	}
	return {
		task1: score,
		task2: removedChars
	}
}


