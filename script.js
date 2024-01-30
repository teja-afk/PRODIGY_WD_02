// elements
const display = document.querySelector('.display');
const startButton = document.querySelector('.start');
const lapButton = document.querySelector('.lap');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const laps = document.querySelector('.laps');

// variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

// function
function timeToString(time) {
    //convert time to hours, minutes, seconds, milliseconds
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let diffInMs = (diffInSec - ss) * 100;    
    let ms = Math.floor(diffInMs);

    // format the time with leading zeros
    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    //return the formatted time
    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime(){
        elapsedTime = Date.now() - startTime;
        display.textContent = timeToString(elapsedTime);
    }, 10);

    // enable and disable the button
    startButton.disabled = true;
    lapButton.disabled = false;
    stopButton.disabled = false;
    resetButton.disabled = true;
}

function lap(){
    // increment the lap count
    lapCount++;

    // create a new lap element
    let lap = document.createElement('li');
    lap.classList.add('lap');
    lap.innerHTML = `<span class = "lap-number">Lap ${lapCount}</span>
    <span class = "lap-time">${timeToString(elapsedTime)}</span>`;

    //apend the lap element to the laps list
    laps.appendChild(lap);    
}

function stop(){
    //clear time interval
    clearInterval(timerInterval);

    //enable and disable the buttons
    startButton.disabled = false;
    lapButton.disabled = true;
    stopButton.disabled = true;
    resetButton.disabled = false;
}

function reset(){

    //reset the elapsed time and the display
    elapsedTime = 0;
    display.textContent = '00:00:00';

    //reset the lap count and the laps list
    lapCount = 0;
    laps.innerHTML = '';

    //enable and disable the buttons
    startButton.disabled = false;
    lapButton.disabled = true;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

// Add the event listeners
startButton.addEventListener("click",start);
lapButton.addEventListener("click",lap);
stopButton.addEventListener("click",stop);
resetButton.addEventListener("click",reset);
