const fs = require('fs')

const input = fs.readFileSync('./inputs/11.txt').toString().trim()

//console.log(calculateMinSteps('ne,ne,ne'))
//console.log(calculateMinSteps('ne,ne,sw,sw'))
//console.log(calculateMinSteps('ne,ne,s,s'))
//console.log(calculateMinSteps('se,sw,se,sw,sw'))

console.log(calculateMinSteps(input))
function calculateMinSteps(input) {
	let [x,y,z] = [0,0,0]
	let currentPos = {x,y,z}

	let max = 0
	
	input.split(',').forEach(dir => {
		switch(dir) {
			case 'n':
				currentPos.y++
				currentPos.z--
			break
			case 'ne':
				currentPos.x++
				currentPos.z--
			break
			case 'se':
				currentPos.x++
				currentPos.y--
			break
			case 's':
				currentPos.y--
				currentPos.z++
			break
			case 'sw':
				currentPos.x--
				currentPos.z++
			break
			case 'nw':
				currentPos.x--
				currentPos.y++
			break
		}
		let distance = calcDistance(currentPos)
		if (distance > max) {
			max = distance
		}
	})

	return {
		task1: calcDistance(currentPos),
		task2: max
	}

}

function calcDistance(pos) {
	return (Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z)) / 2
}
