import { timer, clock } from "../main.js";
import { incrementTime, formatTime } from "./timer_controls.js";



export const hoursElement = document.querySelector(".t-num-h")
export const minutesElement = document.querySelector(".t-num-m")
export const secondsElement = document.querySelector(".t-num-s")

export let timerMemory = {
    state: ""
}
const start = document.querySelector("#start")
const arrowUp = document.querySelectorAll(".arrow-up")
const arrowDown = document.querySelectorAll(".arrow-down")
const stopT = document.querySelector(".stop")
const info = document.querySelector(".info")
const timerNumbers = document.querySelector(".timer-numbers")
const stopOverlay = document.querySelector(".stop-overlay")
let timerEndCount = -1
let timerEndInterval;
let timerCountInterval

const div = document.createElement('div')
div.className = "error"


export function timerDefault() {

    document.querySelector(".underline-timer").style.width = "100%"
    document.querySelector(".underline-clock").style.width = "0"

    timer.style.top = "105px"
    clock.style.bottom = "-400px"

    if (timerMemory.state === "") {

        timerNumbers.addEventListener("mousedown", incrementTime)
        start.addEventListener('click', startTimer, {once: true})
    }

}

export function startTimer() {

    const hours = parseInt(hoursElement.innerText)
    const minutes = parseInt(minutesElement.innerText)
    const seconds = parseInt(secondsElement.innerText)


    if(seconds === 0 && minutes == 0 && hours === 0) {
        
        div.innerText = "Please set a time"
        const timerNumbers = document.querySelector(".timer-numbers")
        timer.insertBefore(div, timerNumbers)
        setTimeout(() => div.remove(), 4000)
        info.innerText = ""

        start.addEventListener('click', startTimer, {once: true})

    } else {
        
        arrowDown.forEach(a => a.style.bottom = "-40px")
        arrowUp.forEach(a => a.style.top = "-40px")
        stopOverlay.style.opacity = "0"
        stopT.style.cursor = "pointer"

        info.innerText = "Timer Running"
        start.className = 'pause'
        timerMemory.state = "running"
        

        start.addEventListener('click', pauseTimer, {once: true})
        stopT.addEventListener('click', stopTimer, {once: true})
        runTimer()
    }
}


function runTimer() {

    let hours = parseInt(hoursElement.innerText)
    let minutes = parseInt(minutesElement.innerText)
    let seconds = parseInt(secondsElement.innerText)
    
    if(timerMemory.state == "pause") {
        clearTimeout(timerCountInterval)
        console.log("cleared");
        // return;        
    }else if(timerMemory.state == "stopped"){
        info.innerText = "Timer Stopped"
        setTimeout(() => info.innerText = "", 2000)
        return;
    } else if (seconds === 0 && minutes === 0 && hours !== 0) {
        
        secondsElement.innerText = 59
        minutesElement.innerText = 59
        hoursElement.innerText = formatTime(--hours)
        
        timerCountInterval = setTimeout(runTimer, 1000)

    } else if(seconds === 0 && minutes !== 0) {
        secondsElement.innerText = 59
        minutesElement.innerText = formatTime(--minutes)

        timerCountInterval = setTimeout(runTimer, 1000)
        
    } else if(seconds > 0) {
        secondsElement.innerText = formatTime(--seconds)

        timerCountInterval = setTimeout(runTimer, 1000)

    } else if(timerMemory.state === "running" && hours === 0 && seconds === 0 && minutes === 0) {
        
        info.innerText = `Timer ended ${timerEndCount}s ago
        Click anywhere to reset`
        info.style.fontSize = "18px"
        info.style.textAlign = "center"
        stopTimer()
        timerEndCounter()
        document.addEventListener('click', resetTimer, {once: true})
    }
}

export function resumeTimer() {
    
    info.innerText = "Timer Running"
    start.className = 'pause'
    timerMemory.state = "running"
    start.addEventListener('click', pauseTimer, {once: true})

    timerCountInterval = setTimeout(runTimer, 1000)

}

export function pauseTimer() {
    console.log("paused");
    info.innerText = "Timer Paused"
    start.className = 'start'
    timerMemory.state = "pause"
    start.addEventListener('click', resumeTimer, {once: true})

}

export function stopTimer() {

    timerMemory.state = "stopped"
    hoursElement.innerText = "00"
    minutesElement.innerText = "00"
    secondsElement.innerText = "00"

    arrowDown.forEach(a => a.style.bottom = "0px")
    arrowUp.forEach(a => a.style.top = "0px")
    stopOverlay.style.opacity = "50%"
    stopT.style.cursor = "context-menu"

    start.className = 'start'
    

    stopT.removeEventListener('click', stopTimer)
    start.removeEventListener('click', pauseTimer)
    start.removeEventListener('click', resumeTimer)
    start.addEventListener('click', startTimer)
}

function timerEndCounter() {
    timerEndCount++
    info.innerText = `Timer ended ${timerEndCount}s ago
    Click anywhere to reset`;
    timerEndInterval = setTimeout(timerEndCounter, 1000) ;
}

function resetTimer() {
    clearTimeout(timerEndInterval);
    info.innerText = "";
    info.style.fontSize = "23px"
    timerEndCount = 0;
}