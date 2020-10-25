import { timerDefault } from './js/timer.js';
import { analogClock, analogStart } from './js/analog_clock.js';
import { digitalClock, digitalStart } from './js/digital_clock.js';


export let clock = document.querySelector(".clock")
export let digitalText = document.querySelector(".digital-text")
export let analogText = document.querySelector(".analog-text")
export let timer = document.querySelector(".timer")
export let timerText = document.querySelector(".timer-text")
let clockText = document.querySelector(".clock-text")
let checkDigital = true
let checkClock = true

document.addEventListener('DOMContentLoaded', clockTimer)

export function clockTimer() {
    if(checkClock) {
        checkClock = false
        timerText.addEventListener('click', clockTimer, {once: true})
        checkType()   
    } else {
        checkClock = true
        clockText.addEventListener('click', clockTimer, {once: true})
        timerDefault()
    }
}

export function checkType() {

    document.querySelector(".underline-timer").style.width = "0"
    document.querySelector(".underline-clock").style.width = "100%"

    timer.style.top = "-400px"
    clock.style.bottom = "0"

    if(checkDigital) {
        checkDigital = false
        analogText.addEventListener('click', analogClock, {once: true})
        digitalStart()
    } else {
        checkDigital = true
        digitalText.addEventListener('click', digitalClock, {once: true})
        analogStart()
    }
}






