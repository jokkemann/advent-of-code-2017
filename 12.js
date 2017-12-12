const fs = require('fs')

let file = './inputs/12.txt'
//file = './example12.txt'

const input = fs.readFileSync(file).toString().trim()

console.log(solve(input))

function solve(input) {

	let list = input.split('\n').map(parse)
	return {
		task1: findProgramsContainingProgramX(list,0).length,
		task2: task2(list)
	}
}

function findProgramsContainingProgramX(list, x) {


	let progsToCheckFor = [x]

	let alreadyHandled = []

	let num = 1
	while(progsToCheckFor.length > 0) {
		let prog = progsToCheckFor.pop()
		alreadyHandled.push(prog)
		let newProgs = list.filter(i => i.refs.includes(prog) && !alreadyHandled.includes(i.prog))
		num += newProgs.length
		progsToCheckFor.push(...newProgs.filter(n => !progsToCheckFor.includes(n.prog) && !alreadyHandled.includes(n.prog)).map(n => n.prog))
		//console.log(newProgs, progsToCheckFor, alreadyHandled)
	}

	return alreadyHandled
}

function parse(input) {
	let match = input.match(/^(\d+)[^\w]+(\d.*)$/)
	return {
		prog: parseInt(match[1]),
		refs: match[2].split(', ').map(s => parseInt(s))
	}
	//return input.split(' <-> ').map(s => ({prog: s[0], refs: s[1].split(', ')}))
}

function task2(list) {

	
	let groups = []

	let remainingProgs = list.map(p => p.prog)

	while (remainingProgs.length > 0) {
		let progsInGroup = findProgramsContainingProgramX(list, remainingProgs[0])

		progsInGroup.forEach(p => {
			let i = remainingProgs.indexOf(p)
			remainingProgs.splice(i, 1)
		})

		groups.push(progsInGroup)

	}

	return groups.length
}
