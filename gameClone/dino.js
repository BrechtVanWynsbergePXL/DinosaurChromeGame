import {getCustomProperty, incrementCustomProperty, setCustomProperty} from "./updateCustomProperty.js";

const dinoElement = document.querySelector("[data-dino]")
const JUMP_SPEED = .45
const GRAVITY = .0015
const DINO_FROM_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVel

export function setDinoLose() {
    dinoElement.src = "imgs/dino-lose.png"
}

export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVel = 0
    setCustomProperty(dinoElement, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRects() {
    return dinoElement.getBoundingClientRect()
}

function handleRun(delta, speedsScale) {
    if (isJumping) {
        dinoElement.src = `imgs/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FROM_COUNT
        dinoElement.src = `imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }

    currentFrameTime += delta * speedsScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElement, "--bottom", yVel * delta)

    if (getCustomProperty(dinoElement, "--bottom") <= 0) {
        setCustomProperty(dinoElement, "--bottom", 0)
        isJumping = false
    }

    yVel -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    yVel = JUMP_SPEED
    isJumping = true
}