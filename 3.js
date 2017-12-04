function getCorners(input) {
	let layers = Math.ceil(Math.sqrt(input))
	if (layers % 2 === 0) {
		layers += 1
	}
	let bottomRight = layers * layers
	let bottomLeft = bottomRight - layers + 1
	let topLeft = bottomLeft - layers + 1
	let topRight = topLeft - layers + 1

	return {
		size: layers,
		bottomRight,
		bottomLeft,
		topLeft,
		topRight
	}
}

function getCoords(num) {
	let corners = getCorners(num)

	let coords = {
		x: 0,
		y: 0
	}
	let max = Math.floor(corners.size / 2)
	if (num > corners.bottomLeft) {
		coords.y = -max
		coords.x = num - corners.bottomRight + max
	}
	else if (num > corners.topLeft) {
		coords.x = -max
		coords.y = num - corners.bottomLeft + max
	}
	else if (num > corners.topRight) {
		coords.y = max
		coords.x = corners.topLeft - num - max
	}
	else {
		coords.x = max
		coords.y = corners.topRight - num - max
	}
	
	return coords
}

let coords = getCoords(325489)
console.log(Math.abs(coords.x) + Math.abs(coords.y))
