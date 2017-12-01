var fs = require('fs')
var input = fs.readFileSync('./inputs/1.txt').toString().trim()

function getCaptcha(inputString) {
	var sum = 0
	var sum2 = 0
	inputString.split('').forEach((c, j) => {
		var nextIndex = j+1
		if (nextIndex === inputString.length) {
			nextIndex = 0
		}
		if (c === inputString[nextIndex]) {
			sum += parseInt(c)
		}

		var halfway = inputString.length / 2
		var halfIndex = j + halfway
		if (halfIndex >= inputString.length) {
			halfIndex = j - halfway
		}
		if (c === inputString[halfIndex]) {
			sum2 += parseInt(c)
		}
	})
	return {sum, sum2}
}

console.log(getCaptcha(input))
