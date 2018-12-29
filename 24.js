const fs = require('fs')

let file = './inputs/24.txt'

let input = fs.readFileSync(file).toString().trim().split(/\n/)

function parseZero(e) {
	let [a, b] = e.split('/')

	return a == 0 || b == 0
}

let bridges = getBridge({ strength: 0, length: 0}, input, 0)

let maxBridge = bridges.sort((a, b) => b.strength - a.strength)[0].strength
console.log('task1', maxBridge)

let maxLen = 0
bridges.map(b => b.length).forEach(l => {
	if (l > maxLen) maxLen = l
})

let task2 = bridges.filter(b => b.length === maxLen).sort((a,b) => b.strength - a.strength)[0].strength
console.log('task2', task2)

function getBridge(bridge, pieces, connector) {

	let bridges = []

	for (let i = 0; i < pieces.length; i++) {
		let [a, b] = pieces[i].split('/').map(s => parseInt(s))
		if (a === connector || b === connector) {
			//console.log('found', a, b)
			let newBridge = {
				strength: bridge.strength + a + b,
				length: bridge.length + 1
			}
			bridges.push(newBridge)

			let leftpieces = pieces.slice()
			leftpieces.splice(i, 1)
			let newConnector = a === connector ? b : a

			bridges = bridges.concat(getBridge(newBridge, leftpieces, newConnector))
		}
	}

	return bridges
}

function findNum(num, arr) {
	if (arr.length === 0) {
		return -1
	}
	
	for (let i = 0; i < arr.length; i++) {
		let [x, y] = arr[i].split(/\//)
		if (x === num) {
			console.log(y, arr[i])
		}
		else if (y === num) {
			console.log(x, arr[i])
		}

		return 0
	}

	return -1

}

function findChain(arr, i, out) {
	let list = arr.slice()
	console.log(i, list)

	let field = list.splice(i, 1)[0]

	out.push[field]
}
