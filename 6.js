let fs = require('fs')

let input = fs.readFileSync('./inputs/6.txt').toString().trim()

let cycles = 0

let seen = []

const redistribute = (arr) => {
	let seenIndex = seen.indexOf(arr.toString())
	if (seenIndex === -1) {
		seen.push(arr.toString())
		let max = Math.max.apply(null, arr)
		let i = arr.indexOf(max)

		arr[i] = 0

		let j = i+1
		while(max) {
			if (j === arr.length) {
				j = 0
			}
			arr[j++] += 1
			max--
		}
		process.nextTick(() => redistribute(arr))
	}
	else {
		console.log({
			task1: seen.length,
			task2: seen.length - seenIndex
		})
	}
}
redistribute(input.split(/\s/).map(s => Number(s)))
