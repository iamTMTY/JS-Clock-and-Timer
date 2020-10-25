import { digital } from "./digital_clock.js";
import { checkType, analogText } from '../main.js';


export let analog = document.querySelector(".analog")
let hourHand = document.querySelector(".hour-hand")
let minuteHand = document.querySelector(".minute-hand")
let secondHand = document.querySelector(".second-hand")



export function analogStart() {

    let startDate = new Date;

    secondHand.style.transform = `rotate(${startDate.getSeconds()*6}deg)`
    minuteHand.style.transform = `rotate(${startDate.getMinutes()*6}deg)`
    if(startDate.getHours() < 12) {
        if(startDate.getMinutes() == 0) {
            hourHand.style.transform = `rotate(${startDate.getHours()*30}deg)`
        } else { 
            hourHand.style.transform = `rotate(${(startDate.getHours()*30)+((startDate.getMinutes()/12)*6)}deg)`
        }    
    } else {
        if(startDate.getMinutes() == 0) {
            hourHand.style.transform = `rotate(${(startDate.getHours()-12)*30}deg)`
        } else {
            hourHand.style.transform = `rotate(${((startDate.getHours()-12)*30)+((startDate.getMinutes()/12)*6)}deg)`
        }
    }

    setTimeout(analogStart, 1000)

}


export function analogClock() {
            
    document.querySelector(".underline-analog").style.width = "100%"
    document.querySelector(".underline-digital").style.width = "0"
    digital.style.left = "-400px"
    analog.style.left = "75px"
    checkType()
    analogText.removeEventListener('click', analogClock)
}