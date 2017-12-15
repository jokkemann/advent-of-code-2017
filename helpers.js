module.exports = {
	createKnotHash,
	performHashAlgorithm
}

const arr = Array(256).fill(0).map((n, i) => i)
const padding = [17, 31, 73, 47, 23]

function createKnotHash(input){
	let hashArr = arr.slice()
	const lengthSequence = input.split('').map(s => s.charCodeAt(0)).concat(padding)
	let pos = 0
	let skip = 0

	for(let i = 0; i < 64; i++) {
		let res = performHashAlgorithm(lengthSequence, pos, skip, hashArr)
		hashArr = res.arr
		pos = res.pos
		skip = res.skip
	}
	let newArr = []
	for (let i = 0; i < 16; i++) {
		newArr.push(hashArr.splice(0, 16).reduce((a,b) => a ^ b))
	}
	return newArr.map(s => toHex(s)).join('')
}

function performHashAlgorithm(input, pos, skip, inputArr) {
	let hashArr = inputArr.slice()
	input.forEach(length => {
		hashArr = pinchTwist(hashArr, pos, length)
		if (pos + length + skip > hashArr.length) {
			pos = (pos + length + skip) % hashArr.length
		} else {
			pos += length + skip
		}
		skip++

	})
	return {arr: hashArr, pos, skip}
}

function pinchTwist(inputArr, pos, length) {
	hashArr = inputArr.slice()
	if (pos + length > hashArr.length) {
		const positionsToEnd = hashArr.length - pos
		let arrToRotate = hashArr.splice(pos, positionsToEnd).concat(hashArr.splice(0, length - positionsToEnd)).reverse()

		// push the first part of the rotated numbers to the end of the array
		hashArr.push(...arrToRotate.splice(0, positionsToEnd))

		// put the last part of the rotated numbers to the start of the array
		hashArr.unshift(...arrToRotate)
	} else {
		let rotated = hashArr.slice(pos, length+pos).reverse()
		hashArr.splice(pos, length, ...rotated)
	}
	return hashArr
}

function toHex(num) {
	return ('00' + num.toString(16)).substr(-2);
}
