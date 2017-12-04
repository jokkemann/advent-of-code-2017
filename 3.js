function generateSpiral(size, lookFor) {
	if (size % 2 === 0) {
		size++
	}

	let found = 0

	let matrix = new Array(size)
	let sumMatrix = new Array(size)
	for (let i = 0; i < matrix.length; i++) {
		matrix[i] = new Array(size)
		matrix[i].fill(0)

		sumMatrix[i] = new Array(size)
		sumMatrix[i].fill(0)
	}

	let x = y = offset = Math.floor(size / 2)
	let dir = 'R'
	matrix[y][x] = 1
	sumMatrix[y][x] = 1
	let layer = 1

	let n2 = size * size

	for (let i = 1; i < n2; i++) {
		if (dir === 'R') {
			x++
			if (Math.abs(x - offset) === layer) {
				dir = 'U'
			}
		}
		else if (dir === 'U') {
			y--
			if (Math.abs(y - offset) === layer) {
				dir = 'L'
			}
		}
		else if (dir === 'L') {
			x--
			if (Math.abs(x - offset) === layer) {
				dir = 'D'
			}
		}
		else if (dir === 'D') {
			y++
			if (Math.abs(y - offset) === layer) {
				dir = 'R'
				layer++
			}
		}

		matrix[y][x] = i+1
		if (!found) {
			sumMatrix[y][x] = getSumOfNeighbours(sumMatrix, x, y)
			if (sumMatrix[y][x] > lookFor) {
				found = sumMatrix[y][x]
			}
		}
	}
	return {matrix, found}
}

function getSumOfNeighbours(matrix, x, y) {
	let sum = 0

	for (let i = y - 1; i <= y + 1; i++) {
		for (let j = x - 1; j <= x+1; j++) {
			if (matrix[i] && matrix[i][j]) {
				sum += matrix[i][j]
			}
		}
	}
	return sum
}

function printMatrix(matrix) {
	matrix.forEach(row => console.log(row))
}

function generateSpiralUntil(num) {
	let size = Math.ceil(Math.sqrt(num))
	let answer = generateSpiral(size, num)
	return answer
}

function findManhattanDistanceTo(num) {
	let answer = generateSpiralUntil(num)
	let matrix = answer.matrix
	let offset = Math.floor(matrix.length / 2)
	let result = 0
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			if (matrix[i][j] === num) {
				result = Math.abs(i - offset) + Math.abs(j - offset)
				break
			}
		}
		if (result) {
			break
		}
	}
	return { task1: result, task2: answer.found }
}

function solve() {
	console.log(findManhattanDistanceTo(325489))
}

solve()
