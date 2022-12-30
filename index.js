var h = document.getElementById("hour");
var m = document.getElementById("minute");
var s = document.getElementById("sec");
var startbutton = document.getElementById("start");
var stoptime = true;
var startTimer = null;

function start() {
    console.log("chaltay");

    if (stoptime == true) {
        stoptime = false;
        function startInterval() {
            startTimer = setInterval(function () {
                timerss();
            }, 1000);
        }
        startInterval();
    }

}

function reset() {
    stoptime = true;
    h.value = 0;
    m.value = 0;
    s.value = 0;
    //stop the timer after pressing "reset"
    stopInterval()
}

function timerss() {
    if (stoptime == false) {
        if (h.value == 0 && m.value == 0 && s.value == 0) {
            h.value = 0;
            m.value = 0;
            s.value = 0;
        } else if (s.value != 0) {
            s.value--;
        } else if (m.value != 0 && s.value == 0) {
            s.value = 59;
            m.value--;
        } else if (h.value != 0 && m.value == 0) {
            m.value = 60;
            h.value--;
        }
        return;
    }
}
function stopInterval() {
    clearInterval(startTimer);
}

function stop() {

    if (stoptime == false) {
        console.log("aahe")
        stoptime = true;
    }
}


const playButton = document.getElementsByClassName("start")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName('lap-clear-button')[0];
const downloadButton = document.getElementsByClassName('download-button')[0];
const hour = document.getElementsByClassName("hrs")[0];
const minute = document.getElementsByClassName("mins")[0];
const second = document.getElementsByClassName("secs")[0];
const msecond = document.getElementsByClassName("msecs")[0];
const laps = document.getElementsByClassName("laps")[0];
const lapitems = document.getElementsByClassName("lap-item")[0];


let hrCounter = 0;
let hr = 0;
let minCounter = 0;
let min;
let secCounter = 0;
let sec;
let centiCounter = 0;
let centiSec;
let lapitem = 0;
let isPlay = false;
let isReset = false;

const toggleButton = () => {

    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");

}
const toggleButtons = () => {

    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    clearInterval(hr);
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);
}

const play = () => {
    toggleButton();
    if (!isPlay && !isReset) {
        playButton.innerHTML = "Pause";
        hr = setInterval(() => {
            if (hrCounter === 24) {
                hrCounter = 0;
            }
            hour.innerHTML = ++minCounter;
        }, 60 * 60 * 1000);
        min = setInterval(() => {
            if (minCounter === 60) {
                minCounter = 0;
            }
            minute.innerHTML = ++minCounter;
        }, 60 * 1000);
        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = ++secCounter;
        }, 1000);
        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            msecond.innerHTML = ++centiCounter;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = 'Start';
        clearInterval(hr);
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
    }
    if (!isPlay && !isReset) {
        toggleButtons();
    }

}

const resets = () => {
    isReset = true;
    hrCounter = 0;
    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;
    play();
    toggleButtons();
    second.innerHTML = '00';
    msecond.innerHTML = '00';
    minute.innerHTML = '00';
    hour.innerHTML = '00';

}



const lap = () => {
    const ul = document.getElementsByClassName("laps")[0];
    var li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerHTML = `\n#${++lapitem}`;
    timeStamp.innerHTML = `  ${(hrCounter)}:${(minCounter)}:${secCounter}:${centiCounter}\n`;
    li.append(number, timeStamp);
    ul.append(li);



    ul.setAttribute("class", "laps");

    console.log(ul.textContent);
    /* window.dnd = li.textContent; */

    window.dnd = ul.textContent;

    clearButton.classList.remove("hidden");
    downloadButton.classList.remove("hidden");


}
const clear = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
    lapitem = 0;
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", resets);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clear);

const download = () => {

    const data = `${window.dnd}`;

    const blob = new Blob([data], { type: "application/txt" });

    const href = URL.createObjectURL(blob);

    const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: "laps.txt",
    });
    document.body.appendChild(a)

    a.click();
    URL.revokeObjectURL(href);
    a.remove();
}


