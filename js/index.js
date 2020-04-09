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

// Short break
function counterShortBreak(shortClockId) {
    clockArray[shortClockId].mins = Math.floor(clockArray[shortClockId].shortBreakVal / 60);
    clockArray[shortClockId].secs = clockArray[shortClockId].shortBreakVal - clockArray[shortClockId].mins * 60;

    // Change the HTML to show new minutes and seconds
    clockArray[shortClockId].minutes.innerHTML = (clockArray[shortClockId].mins < 10 ? '0' : '') +
        clockArray[shortClockId].mins;

    clockArray[shortClockId].seconds.innerHTML = (clockArray[shortClockId].secs < 10 ? '0' : '') +
        clockArray[shortClockId].secs;

    // Switch modes if timer ends
    if (clockArray[shortClockId].shortBreakVal === 0) {
        clearInterval(clockArray[shortClockId].countdownID);
        clockArray[shortClockId].countdownID = setInterval(() => counter(currentRunningClock), 1000);
    } else {
        // Decrement
        clockArray[shortClockId].shortBreakVal = clockArray[shortClockId].shortBreakVal = -1;
    }
}

// Actions
function startTimer(idString) {
    // extra the integer value from the id of the clock div
    let clockId = idString.replace(/^\D+/g, '');

    // it means the clock is already in running state
    if (currentRunningClock === clockId) {
        alert('The clock is already running. Please click reset if you want to start again of click' +
            ' restart if you want to restart the previous counter.');
    }

    if (currentRunningClock === -1) {
        clockArray[clockId].messageId.innerHTML = 'Clock is running';
        clockArray[clockId].isStarted = true;
        currentRunningClock = clockId;

        clockArray[clockId].countdownID = setInterval(() => counter(clockId), 1000);
        clockArray[clockId].message = 'Slow and steady wins all the time';
    }

    if (currentRunningClock !== clockId && currentRunningClock !== -1) {
        alert('Please stop the already running clock to start this one.');
    }
}

function restartTimer(idString) {

}
