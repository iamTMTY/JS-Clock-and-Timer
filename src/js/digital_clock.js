import { analog } from "./analog_clock.js";
import { checkType, digitalText } from '../main.js';
import { formatTime } from './timer_controls.js';


export let digital = document.querySelector(".digital")
let hours = document.querySelector(".hours")
let minutes = document.querySelector(".minutes")
let seconds = document.querySelector(".seconds")


export function digitalStart() {

    let startDate = new Date

        hours.innerText = formatTime(startDate.getHours());

        minutes.innerText = formatTime(startDate.getMinutes());
    
        seconds.innerText = formatTime(startDate.getSeconds());

    setTimeout(digitalStart, 1000)
}


export function digitalClock() {
            
    document.querySelector(".underline-digital").style.width = "100%"
    document.querySelector(".underline-analog").style.width = "0"
    digital.style.left = "80px"
    analog.style.left = "800px"
    checkType()
    digitalText.removeEventListener('click', digitalClock)
}