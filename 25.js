
let state = 'A'
let num = 12919244

let slots = new Array(num*2).fill(0)
let pos = num

for (let i = 0; i < num; i++) {
	switch(state) {
		case 'A':
			if (slots[pos] === 0) {
				slots[pos] = 1
				pos++
				state = 'B'
			}
			else {
				slots[pos] = 0
				pos--
				state = 'C'
			}
			break
		case 'B':
			if (slots[pos] === 0) {
				slots[pos] = 1
				pos--
				state = 'A'
			}
			else {
				slots[pos] = 1
				pos++
				state = 'D'
			}
			break
		case 'C':
			if (slots[pos] === 0) {
				slots[pos] = 1
				pos++
				state = 'A'
			}
			else {
				slots[pos] = 0
				pos--
				state = 'E'
			}
			break
		case 'D':
			if (slots[pos] === 0) {
				slots[pos] = 1
				pos++
				state = 'A'
			}
			else {
				slots[pos] = 0
				pos++
				state = 'B'
			}
			break
		case 'E':
			if (slots[pos] === 0) {
				slots[pos] = 1
				pos--
				state = 'F'
			}
			else {
				slots[pos] = 1
				pos--
				state = 'C'
			}
			break
		case 'F':
			if (slots[pos] === 0) {
				slots[pos] = 1
				pos++
				state = 'D'
			}
			else {
				slots[pos] = 1
				pos++
				state = 'A'
			}
			break
		}
}
console.log(slots.filter(s => s === 1).length)
