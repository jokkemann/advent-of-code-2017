const fs = require('fs')

let file = './inputs/18.txt'
//file = './examples/18-2.txt'

const input = fs.readFileSync(file).toString().trim()

console.log(solve(input))

function solve(input) {
	
	return {
		task1: task1(input),
		task2: task2(input)
	}
}

function task1(input) {
	let res = proc(input, 1)
	return res.qs[0][res.qs[0].length - 1]
}

function task2(input) {
	let res = proc(input, 2)
	return res.sends[res.sends.length - 1]
}

function proc(input, processes) {
	let sends = new Array(processes).fill(0)
	let qs = sends.map(s => [])
	let registers = sends.map((s, i) => { p: i })
	let receiving = sends.map(s => false)

	let check = false
	let instructions = input.split(/\n/)

	return processInstructions(instructions)

	function processInstructions(instructions) {
		let registers = [
			{
				p: 0
			},
			{
				p: 1
			}
		]

		let procI = [0, 0]

		let currP = 0

		let done = false

		while (!done) {
			let s = instructions[procI[currP]]
			let thisP = currP
			const otherProc = (c) => {
				if (qs.length === 1) {
					return 0
				}
				return c === 0 ? 1 : 0
			}
			let match = s.match(/(\w+)\s(\w|\d+)(\s(.*))?/)
			let instr = match[1]
			let lhs = match[2]
			let rhs = match[3]

			let reg = registers[currP]

			switch(instr) {
				case 'snd':
					let oProc = otherProc(currP)
					let val = parseVal(lhs, reg)
					qs[oProc].push(val)
					sends[currP]++
				break
				case 'rcv':
					if (qs.length === 1) {
						done = true
					}
					if (qs[currP].length) {
						let val = qs[currP].shift()
						reg[lhs] = val
						receiving[currP] = false
					}
					else {
						receiving[currP] = true
						currP = otherProc(currP)
						if (receiving.every(r => r) && qs.every(q => q.length === 0)) {
							done = true
						}
					}
				break
				case 'set':
					reg[lhs] = parseVal(rhs, reg)
				break
				case 'add':
					reg[lhs] += parseVal(rhs, reg)
				break
				case 'mul':
					reg[lhs] *= parseVal(rhs, reg)
				break
				case 'mod':
					reg[lhs] %= parseVal(rhs, reg)
				break
				case 'jgz':
					let parsedLhs = parseVal(lhs, reg)
					if (parsedLhs > 0) {
						procI[currP] += parseVal(rhs, reg) - 1
					}
				break
			}
			if (!receiving[thisP]) {
				procI[thisP]++
			}
		}
		return {
			regs: registers,
			qs,
			sends
		}
	}
}

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
