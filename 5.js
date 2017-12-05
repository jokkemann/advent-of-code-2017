let fs = require('fs')

let input = fs.readFileSync('./inputs/5.txt').toString().split('\n').filter(s => s !== '').map(s => parseInt(s))

let task1Input = input.slice()
let steps = {task1: 0, task2: 0}
let nextIndex = 0

while (nextIndex >= 0 && nextIndex < input.length) {

	let oldIndex = nextIndex
	nextIndex += task1Input[oldIndex]
	
	task1Input[oldIndex] += 1

	steps.task1++
}

nextIndex = 0
while (nextIndex >= 0 && nextIndex < input.length) {
	let oldIndex = nextIndex
	nextIndex += input[oldIndex]

	if(input[oldIndex] >= 3) {
		input[oldIndex] -= 1
	}
	else {
		input[oldIndex] += 1
	}

	steps.task2++
}

console.log(steps)
