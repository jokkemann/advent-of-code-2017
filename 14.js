let hasher = require('./10')

solve()
function solve() {
	let input = 'wenycdww'

	let sum = 0
	for (let i = 0; i < 128; i++) {
		let hash = hasher.createKnotHash(`${input}-${i}`)
		let binary = hash.match(/.{1,3}/g).map(part => {
			return parseInt(part, 16).toString(2)
		}).reduce((a,b) => a.concat(b))

		sum += binary.split('').filter(b => b === '1').length
	}
	console.log(sum)

}
