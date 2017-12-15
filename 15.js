let fakeA = 65, fakeB = 8921
let realA = 722, realB = 354

const bitmap = parseInt('1111111111111111', 2)
const factorA = 16807, factorB = 48271, divisor = 2147483647

console.log(solve())
function solve() {
	return {
		task1: task1(realA, realB, 40000000),
		task2: task2(realA, realB, 5000000)
	}
}

function task1(a, b, pairs) { 
	let judge = 0

	for (let i = 0; i < pairs; i++) {
		a = calcNew(a, factorA)

		b = calcNew(b, factorB)

		let a16 = a & bitmap
		let b16 = b & bitmap

		if (a16 === b16) {
			judge++
		}
	}

	return judge
}

function calcNew(num, factor) { 
	num *= factor
	num %= divisor

	return num
}

function task2(a, b, pairs) {
	let judgeA = []
	let judgeB = []

	let score = 0
	while(judgeA.length < pairs || judgeB.length < pairs) {
		a = calcNew(a, factorA)
		if (judgeA.length < pairs && a % 4 === 0) {
			let a16 = a & bitmap
			judgeA.push(a16)
		}
		b = calcNew(b, factorB)
		if (judgeB.length < pairs && b % 8 === 0) {
			let b16 = b & bitmap
			judgeB.push(b16)
		}
	}

	for (let i = 0; i < judgeA.length; i++) {
		if (judgeA[i] === judgeB[i]) {
			score++
		}
	}
	return score
}


