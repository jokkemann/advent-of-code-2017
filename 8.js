const fs = require('fs')

const input = fs.readFileSync('./inputs/8.txt').toString().split('\n').map(s => s.trim()).filter(s => s !== '')

const instructions = input.map(s => parseInstruction(s))

let registers = {}
instructions.map(i => i.name).forEach(n => registers[n] = 0)

let maxSeen = Number.MIN_VALUE
instructions.forEach(execute)

let registerVals = Object.keys(registers).map(k => registers[k])
let solutions = {
	task1: Math.max(...registerVals),
	task2: maxSeen
}
console.log(solutions)

function parseInstruction(s) {
	let match = s.match(/^(\w+)\s(\w+)\s([-]?\d+)\s\w+\s(\w+)\s([\!\<\>\=]+)\s([-]?\d+)$/)

	return {
		name: match[1],
		instr: match[2],
		size: Number(match[3]),
		lhs: match[4],
		op: match[5],
		rhs: Number(match[6])
	}
}

function execute(i) {
	
	const shouldExecute = parseOperation(i)
	
	if (shouldExecute) {
		if (i.instr === 'inc') {
			registers[i.name] += i.size
		}
		else {
			registers[i.name] -= i.size
		}
		if (registers[i.name] > maxSeen) {
			maxSeen = registers[i.name]
		}
	}

}

function parseOperation(i) {
	let lhs = registers[i.lhs]
	switch(i.op) {
	case '==':
		return lhs === i.rhs
	break
	case '!=':
		return lhs !== i.rhs
	break
	case '<':
		return lhs < i.rhs
	break
	case '>':
		return lhs > i.rhs
	break
	case '<=':
		return lhs <= i.rhs
	break
	case '>=':
		return lhs >= i.rhs
	break
	default:
		console.log('error reading instruction', i.op)
	}
}
