
console.log(solve())

function solve() {
    return {
        task1: task1(394),
        task2: task2(394)
    }
}
function task1(steps) {

    let state = [0]
    let currentPos = 0
    for (let i = 1; i <= 2017; i++) {
        currentPos = ((currentPos + steps) % i) + 1
        state.splice(currentPos, 0, i)
    }
    if (currentPos === state.length) {
        return state[0]
    }
    return state[currentPos+1]
}

function task2(steps) {
    let currentPos = 0
    let pos1 = 0
    for (let i = 1; i <= 50000000; i++) {
        currentPos = ((currentPos + steps) % i) + 1
        if (currentPos === 1) {
            pos1 = i
        }
    }

    return pos1
}

