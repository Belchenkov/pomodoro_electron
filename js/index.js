let clockArray = [];
const currentRunningClock = -1;

function ClockObject(bigTime, mode, animation, color, id) {
    let percent, mins, secs, countdownID;

    this.bigTime = bigTime;
    this.mode = mode;
    this.animation = animation;
    this.color = color;
    this.id = id;

    this.minutes = document.getElementById("`minutes_${id}`");
    this.seconds = document.getElementById("`seconds_${id}`");
    this.message = document.getElementById("`message_${id}`");

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
}

// Switch modes if times ends
