const isPrime = num => {
	for (let i = 2; i < Math.sqrt(num); i++) {
		if (num % i === 0) return false
	}
	return true
}
let b = (81 * 100) + 100000
let c = b + 17000

let h = 0
while (b <= c) {
	if (!isPrime(b)) {
		h++
	}
	
	b+= 17
}


/*
let h = 0
for (let b = 108100; b <= 125100; b+= 17) {
let f = 1
	for (let d = 2; d <= Math.sqrt(b); d+=1) {

		for (let e = 2; e <= b/d; e++) {
			if (d * e === b) {
				f = 0
				break
			}

		}
		if (f === 0) break
	}
	if (f === 0) {
		h++
	}
}
*/
console.log(h)
