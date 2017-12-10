const arr = Array(256).fill(0).map((n, i) => i)

const fs = require('fs')
const input = fs.readFileSync('./inputs/10.txt').toString().trim()

const padding = [17, 31, 73, 47, 23]

const task1 = (arr, input) => {
	let res = performHashAlgorithm(input.split(',').map(s => parseInt(s)), 0, 0, arr)
	return res.arr[0] * res.arr[1]
}

const task2 = (arr, input) => {
	return createKnotHash(input, arr)
}

console.log({
	task1: task1(arr, input),
	task2: task2(arr, input)
})

function performHashAlgorithm(input, pos, skip, inputArr) {
	let arr = inputArr.slice()
	input.forEach(length => {
		arr = pinchTwist(arr, pos, length)
		if (pos + length + skip > arr.length) {
			pos = (pos + length + skip) % arr.length
		} else {
			pos += length + skip
		}
		skip++

	})
	return {arr, pos, skip}
}

function createKnotHash(input, inputArr){
	let arr = inputArr.slice()
	const lengthSequence = input.split('').map(s => s.charCodeAt(0)).concat(padding)
	let pos = 0
	let skip = 0

	for(let i = 0; i < 64; i++) {
		let res = performHashAlgorithm(lengthSequence, pos, skip, arr)
		arr = res.arr
		pos = res.pos
		skip = res.skip
	}
	let newArr = []
	for (let i = 0; i < 16; i++) {
		newArr.push(arr.splice(0, 16).reduce((a,b) => a ^ b))
	}
	return newArr.map(s => toHex(s)).join('')
}

function pinchTwist(arr, pos, length) {
	arr = arr.slice()
	if (pos + length > arr.length) {
		const positionsToEnd = arr.length - pos
		let arrToRotate = arr.splice(pos, positionsToEnd).concat(arr.splice(0, length - positionsToEnd)).reverse()

		// push the first part of the rotated numbers to the end of the array
		arr.push(...arrToRotate.splice(0, positionsToEnd))

		// put the last part of the rotated numbers to the start of the array
		arr.unshift(...arrToRotate)
	} else {
		let rotated = arr.slice(pos, length+pos).reverse()
		arr.splice(pos, length, ...rotated)
	}
	return arr
}

function toHex(num) {
	return ('00' + num.toString(16)).substr(-2);
}
