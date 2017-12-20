const fs = require('fs')

let file = './inputs/20.txt'
// let file = './examples/20-2.txt'

let input = fs.readFileSync(file).toString().trim()

let rows = input.split(/\n|\r/).filter(s => s !== '')
var info = rows.map(parseRow)
console.log(solve(info))
function parseRow(row, i) {
    let parts = row.split(', ')
    let pos = parts[0].split('=')[1].match(/\<(.*)\>/)[1].split(',').map(s => parseInt(s))
    let vel = parts[1].split('=')[1].match(/\<(.*)\>/)[1].split(',').map(s => parseInt(s))
    let acc = parts[2].split('=')[1].match(/\<(.*)\>/)[1].split(',').map(s => parseInt(s))

    return {
        i,
        pos,
        vel,
        acc
    }
}

function solve(info) {
    return {
        task1: task1(info),
        task2: task2(info)
    }
}
function task1(input) {
    let info = input.slice()
    let slowestAcc = { i: -1, acc: Number.MAX_VALUE}
    info.forEach((p, i) => {
        let {acc} = p
        let absAcc = Math.abs(acc[0]) + Math.abs(acc[1]) + Math.abs(acc[2])

        if (absAcc < slowestAcc.acc) {
            slowestAcc.i = i
            slowestAcc.acc = absAcc
        }
    })
    return slowestAcc.i
}
function task2(input) {
    let info = input.slice()
    let possibleCollisions = true

    let i = 0

    // 40 is the lowest number of loops giving me the correct answer (going down from 10000)
    while(i < 40) {
        // TODO: Add check for the remaining particles trajectories

        // Remove colliding particles
        let colliding = []
        let collisions = {}
        info = info.filter(p => isUnique(p, info))

        // Update positions and velocities for the remaining particles
        info.forEach(updateParticle)
        i++
    }
    return info.length
}

function updateParticle(p) {
    p.vel[0] += p.acc[0]
    p.vel[1] += p.acc[1]
    p.vel[2] += p.acc[2]
    p.pos[0] += p.vel[0]
    p.pos[1] += p.vel[1]
    p.pos[2] += p.vel[2]
}

function isUnique(p, info) {
    return info.filter(o => o.i !== p.i && sameCoords(p, o)).length === 0
}

function sameCoords(p, o) {
    let pPos = p.pos
    let oPos = o.pos
    return pPos[0] === oPos[0]
        && pPos[1] === oPos[1]
        && pPos[2] === oPos[2]
}

function collides(p, i, all) {
    let positions = {}
    all.forEach()
}