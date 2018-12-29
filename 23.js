const fs = require('fs')

let file = './inputs/23.txt'
let input = fs.readFileSync(file).toString().trim().split(/\n/)
let registers = {
	a: 1,
	b: 0,
	c: 0,
	d: 0,
	e: 0,
	f: 0,
	g: 0,
	h: 0
}

let done = false
let curPos = 0
let muls = 0
while (!done) {
	let s = input[curPos]
	let match = s.match(/(\w+)\s(\w|\d+)(\s(.*))?/)
	let instr = match[1]
	let lhs = match[2]
	let rhs = match[3]

	switch (instr) {
		case 'set':
			registers[lhs] = parseVal(rhs, registers)
			break

		case 'sub':
			registers[lhs] -= parseVal(rhs, registers)
			break

		case 'mul':
			registers[lhs] *= parseVal(rhs, registers)
			muls++
			break

		case 'jnz':
			let parsedLhs = parseVal(lhs, registers)
			if (parsedLhs !== 0) {
				curPos += parseVal(rhs, registers) - 1
			}
			break
	}

	curPos++
	if (curPos === input.length) {
		done = true
	}
}
console.log(muls)
console.log(registers.h)

function parseVal(op, regs) {
	let val = parseInt(op)
	if (isNaN(val)) {
		op = op.trim()
		if (!regs[op]) {
			regs[op] = 0
		}
		val = regs[op]
	}
	return val
}

	// set, sub, mul, jnz
