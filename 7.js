let fs = require('fs')

//let file = './example7.txt'
let file = './inputs/7.txt'

let input = fs.readFileSync(file).toString().split('\n').filter(s => s !== '')

let nodes =[]

input.forEach(prog => {
	let node = parseNode(prog)
	nodes.push(node)
})

let allChildren = nodes.map(a => a.children).reduce((a,b) => {
	return a.concat(b)
})
let root = nodes.filter(n => n.children.length > 0).find(n => !allChildren.includes(n.name))
console.log('task1', root.name)

root.children.map(c => parseWeight(nodes.find(n => n.name === c)))
console.log(root.children)

// since traversing recursively, we will traverse the children before we handle the current node
// This means that the first time we find an unbalanced node, it will be at the "first" possible
// node that gives meaning to adjust
function parseWeight(node) {
	let children = nodes.filter(n => node.children.includes(n.name))
	let childrenWeight = children.map(c => {
		return {
			node: c,
			totalWeight: parseWeight(c)
		}
	})
	if (childrenWeight.length > 0 && !allAreSame(childrenWeight.map(cw => cw.totalWeight))) {
		console.log('weight fault', childrenWeight.map(cw => {
			return {
				name: cw.node.name,
				nodeWeight: cw.node.weight,
				total: cw.totalWeight
			}
		}))
	}
	return node.weight + childrenWeight.reduce((a, b) => a+b.totalWeight, 0)
}

function allAreSame(arr) {
	if (arr.length === 0) return true
	for (let i = 0; i < arr.length; i++) {

		if (arr[i] !== arr[0]) {
			return false
		}
	}
	return true

}
function parseNode(prog) {
	let matches = prog.match(/(\w+)\s\((\d+)\)(\s\-\>\s(.*))?/)

	return {
		name: matches[1],
		weight: Number(matches[2]),

		children: matches[4] ? matches[4].split(', ') : []
	}
}
