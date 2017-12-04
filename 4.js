let fs = require('fs')

let input = fs.readFileSync('./inputs/4.txt').toString().split('\n').filter(s => s !== '').map(s => s.trim())

function numberOfValidPassPhrases(inputStrings) {
	return inputStrings.reduce((acc, s) => {
		let keys = {}

		s.split(' ').forEach(w => {
			if (keys[w] !== undefined) {
				keys[w]++
			} else {
				keys[w] = 0
			}
		})
		return Object.keys(keys).every(k => keys[k] === 0) ? acc + 1 : acc
	}, 0)
}

function numberOfValidPassPhrasesUsingAnagrams(inputStrings) {
	return inputStrings.reduce((acc, s) => {

		let keys = {}

		s.split(' ').map(w => w.split('').sort().join('')).forEach(w => {
			if (keys[w] !== undefined) {
				keys[w]++
			} else {
				keys[w] = 0
			}
		})
		return Object.keys(keys).every(k => keys[k] === 0) ? acc + 1 : acc
	}, 0)
}

console.log('task 1:', numberOfValidPassPhrases(input))

console.log('task 2:', numberOfValidPassPhrasesUsingAnagrams(input))
