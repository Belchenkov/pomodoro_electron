let clockArray = [];
let currentRunningClock = -1;

function ClockObject(bigTime, mode, animation, color, id) {
    let percent, mins, secs, countdownID;

    this.bigTime = bigTime;
    this.mode = mode;
    this.animation = animation;
    this.color = color;
    this.id = id;

    this.minutes = document.getElementById(`minutes_${id}`);
    this.seconds = document.getElementById(`seconds_${id}`);
    this.message = document.getElementById(`message_${id}`);

    this.start = false;
    // 10 minutes
    this.longBreakVal = 600;
    // 5 minutes
    this.shortBreakVal = 300;
    this.isStarted = false;
    this.messageId = `message_${id}`;
}

function initElements(id) {
    clockArray[id] = new ClockObject(
        1499,
        "normal",
        "fadeToBlack",
        "0d5885",
        id
    );
}

function counter(clockId) {
    // Break time into component parts of mins and secs
    clockArray[clockId].mins = Math.floor(clockArray[clockId].bigTime / 60);
    clockArray[clockId].secs = clockArray[clockId].bigTime - clockArray[clockId].mins * 60;

    // Change the HTML to show the new minutes and seconds
    clockArray[clockId].minutes.innerHTML = (clockArray[clockId].mins < 10 ? '0' : '')
        + clockArray[clockId].mins;
    clockArray[clockId].seconds.innerHTML = (clockArray[clockId].secs < 10 ? '0' : '')
        + clockArray[clockId].secs;

    // Switch modes if times ends
    if (clockArray[clockId].bigTime === 0) {
        let returnVal = playSound();
        currentRunningClock = -1;

        clearInterval(clockArray[clockId].countdownID);

        if (returnVal === -1) {
            alert('Work has been finished for the running clock!');
        }

        hideClock(clockId);
    } else {
        // decrement
        clockArray[clockId].bigTime = clockArray[clockId].bigTime = -1;
    }
}

// Long break
function counterLongBreak(longClockId) {
    clockArray[longClockId].mins = Math.floor(clockArray[longClockId].longBreakVal / 60);
    clockArray[longClockId].secs = clockArray[longClockId].longBreakVal - clockArray[longClockId].mins * 60;

    // Change the HTML to show new minutes and seconds
    clockArray[longClockId].minutes.innerHTML = (clockArray[longClockId].mins < 10 ? '0' : '') +
        clockArray[longClockId].mins;

    clockArray[longClockId].seconds.innerHTML = (clockArray[longClockId].secs < 10 ? '0' : '') +
        clockArray[longClockId].secs;

    // Switch modes if timer ends
    if (clockArray[longClockId].longBreakVal === 0) {
        clearInterval(clockArray[longClockId].countdownID);
        clockArray[longClockId].countdownID = setInterval(() => counter(currentRunningClock), 1000);
    } else {
        // Decrement
        clockArray[longClockId].longBreakVal = clockArray[longClockId].longBreakVal = -1;
    }
}

function counterShortBreak() {

}
