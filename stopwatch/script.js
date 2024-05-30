// Variables
let startTime = 0;
let elapsedTime = 0;
let running = false;
let lapNumber = 1;
let taskCompleted = false;
let intervalID;

// Elements
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const centisecondsElement = document.getElementById('centiseconds');
const lapList = document.getElementById('lap-list');
const btnStart = document.getElementById('btn-start');
const btnLap = document.getElementById('btn-lap');
const btnRestart = document.getElementById('btn-restart');

// Functions
function formatTime(time) {
  const minutes = Math.floor(time / 6000).toString().padStart(2, '0');
  const seconds = Math.floor((time % 6000) / 100).toString().padStart(2, '0');
  const centiseconds = (time % 100).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(Math.floor(elapsedTime / 10));
  minutesElement.textContent = formattedTime.slice(0, 2);
  secondsElement.textContent = formattedTime.slice(3, 5);
  centisecondsElement.textContent = formattedTime.slice(6);
}

function startTimer() {
  running = true;
  startTime = Date.now() - elapsedTime;
  intervalID = setInterval(updateTimer, 10);
  btnStart.textContent = 'Stop';
}

function stopTimer() {
  // Stop interval and set running to false
  clearInterval(intervalID);
  running = false;
  btnStart.textContent = 'Start';
}

function toggleTimer() {
  if (running) {
    stopTimer();
  } else {
    startTimer();
  }
}

function restartTimer() {
  stopTimer();
  elapsedTime = 0;
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  centisecondsElement.textContent = '00';
  lapNumber = 1;
  lapList.innerHTML = '';
  taskCompleted = false;
  btnLap.disabled = false;
}
// lap list shower
function addLap() {
  if (!running) {
    return;
  }
  const currentElapsedTime = elapsedTime; // Store the current elapsedTime
  const lapTime = formatTime(Math.floor(currentElapsedTime / 10)); // Use the stored elapsedTime for lap time
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapNumber} : ${lapTime}`;
  lapList.appendChild(lapItem);
  lapNumber++;
}

// Event listeners
btnStart.addEventListener('click', toggleTimer);
btnLap.addEventListener('click', addLap);
btnRestart.addEventListener('click', restartTimer);

document.addEventListener('keypress', function (event) {
  if (event.code === 'Space') {
    toggleTimer();
  }
  // Key L to Lap timer
  if (event.code === 'KeyL') {
    addLap();
  }
  // Key R to restart timer
  if (event.code === 'KeyR') {
    restartTimer();
  }
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeBackgroundColor() {
  const backgroundElement = document.getElementById('background');
  const newColor = getRandomColor();
  backgroundElement.style.backgroundColor = newColor;
}

setInterval(changeBackgroundColor, 1000);