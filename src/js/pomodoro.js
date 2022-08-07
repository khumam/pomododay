const pomodoroTime = 25;
const pomodoroShortRest = 5;
const pomodoroLongRest = 25;
const finish = 0;
const step = [pomodoroTime, pomodoroShortRest, pomodoroTime, pomodoroShortRest, pomodoroTime, pomodoroShortRest, pomodoroTime, pomodoroLongRest, finish]
let currentStep = 0
let counter = 59;
let start = false;
let startSound;
let alarm;

function setup() {
  sketchWidth = document.getElementById("pomo").offsetWidth;
  sketchHeight = document.getElementById("pomo").offsetHeight;
  var canvas = createCanvas(sketchWidth, sketchHeight);
  canvas.parent("pomo");
  canvas.mouseClicked(startOrPause);
  frameRate(1);
  rectMode(CENTER);
  soundFormats("mp3", "ogg");
  startSound = loadSound("/src/sound/start.mp3");
  alarm = loadSound("/src/sound/alarm.mp3");
}

function draw() {
  clear()
  background("#D9622B");
  if (start) {
    if (counter == 0) {
      step[currentStep]--;
      counter = 59
      currentStep++;
      alarm.play();
      start = false;
    }
    fill('#ffffff');
    textSize(100)
    textAlign(CENTER, CENTER)
    text(`${step[currentStep] < 10 ? '0' + step[currentStep] : step[currentStep]}:${counter < 10 ? '0' + counter : counter}`, width / 2, height / 2);
    textSize(16);
    if (currentStep % 2 != 0) {
      text(`Current step : ${currentStep + 1} (rest)`, width / 2, 180);
    } else {
      text(`Current step : ${currentStep + 1} (start)`, width / 2, 180);
    }
    counter--;
  } else {
    fill('#ffffff');
    textAlign(CENTER, CENTER);
    textSize(20)
    text('Click to start', width / 2, height / 2);
  }
}

function startOrPause() {
  startSound.play();
  start = !start;
}