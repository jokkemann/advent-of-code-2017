let { createKnotHash } = require('./helpers')

console.log(solve())
function solve() {
	let input = 'wenycdww'

	let grid = getBinaryGrid(input)

	return {
		task1: task1(grid),
		task2: task2(grid)
	}
}

function getBinaryGrid(input) {
	let grid = []
	for (let i = 0; i < 128; i++) {
		let hash = createKnotHash(`${input}-${i}`)
		let binaryRow = hash.match(/.{1,2}/g).map(part => {
			// convert hex to binary
			let num = parseInt(part, 16).toString(2)
			// Left-pad the binary number with seroes
			return '00000000'.substr(num.length)+num
		}).reduce((a,b) => a.concat(b))
		grid.push(binaryRow)
	}
	return grid
}

function task1(grid) {
	return grid.reduce((a, b) => a+b.split('').filter(c => c === '1').length, 0)
}

function task2(grid) {

	// Connected-component labeling
	let queue = []
	let labels = {}
	let currentLabel = 1
	for (let i = 0; i < grid.length; i++ ) {
		let row = grid[i]
		for (let j = 0; j < row.length; j++) {
			let elem = row[j]

			if (elem === '1') {
				let lblKey = `${i}:${j}`
				if (!labels[lblKey]) {
					labels[lblKey] = currentLabel
					queue.push(lblKey)
					while(queue.length > 0) {
						let currElemKey = queue.shift()
						let neighbours = getNeighbours(currElemKey, grid)
						neighbours.forEach(n => {
							if (!labels[n.key]) {
								labels[n.key] = currentLabel
								queue.push(n.key)
							}
						})
					}
					currentLabel++
				}
			}

		}

	}

	let groups = 0
	Object.keys(labels).forEach(lblKey => {
		if (labels[lblKey] > groups) {
			groups = labels[lblKey]
		}
	})
	return groups
}

function getNeighbours(key, grid) {
	let indices = key.split(':')
	let i = parseInt(indices[0])
	let j = parseInt(indices[1])
	let neighbours = []

	// west
	if (j > 0) {
		addNeighbour(i, j-1)
	}
	// north
	if (i > 0) {
		addNeighbour(i-1, j)
	}
	// east
	if (j < grid[i].length - 1) {
		addNeighbour(i, j+1)
	}
	// south
	if (i < grid.length - 1) {
		addNeighbour(i+1, j)
	}

	function addNeighbour(r, c) {
		if(grid[r][c] === '1') {
			neighbours.push({
				key: `${r}:${c}`,
				val: grid[r][c]
			})
		}
	}

	return neighbours
}

