
export function formatTime(time) {

    if(time < 10) {
        return `0${time}`
    }

    return time
}

export function incrementTime(e) {

    // inrements if less than 59
    e.target.classList.contains("arrow-up") ?
    e.target.nextElementSibling.innerText === "59" ?
    e.target.nextElementSibling.innerText = "00" :
    e.target.nextElementSibling.innerText = formatTime(parseInt(e.target.nextElementSibling.innerText) + 1 ) : 

    // decrements if greater than 0
    e.target.classList.contains("arrow-down") ?
    e.target.previousElementSibling.innerText === "00" ?
    e.target.previousElementSibling.innerText = "59":
    e.target.previousElementSibling.innerText = formatTime(parseInt(e.target.previousElementSibling.innerText) - 1) : 
    false

}

