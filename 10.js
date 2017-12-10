let arr = Array(256).fill(0).map((n, i) => i)

const fs = require('fs')
//let input = [3, 4, 1, 5]
let input = fs.readFileSync('./inputs/10.txt').toString().split(',').map(s => parseInt(s))

let pos = 0
let skip = 0

input.forEach(i => {
	arr = pinchTwist(arr, pos, i)
	if (pos + i + skip > arr.length) {
		pos = pos + i + skip - arr.length
	} else {
		pos += i + skip
	}
	skip++

})
console.log('task1', arr[0] * arr[1])

function pinchTwist(arr, pos, length) {
	arr = arr.slice()
	if (pos + length > arr.length) {
		let positionsToEnd = arr.length - pos
		let arrToRotate = arr.splice(pos, positionsToEnd).concat(arr.splice(0, length - positionsToEnd)).reverse()
		arr.push(...arrToRotate.splice(0, positionsToEnd))
		arr.unshift(...arrToRotate)
	} else {
		let rotated = arr.slice(pos, length+pos).reverse()
		arr.splice(pos, length, ...rotated)
	}
	return arr
}

