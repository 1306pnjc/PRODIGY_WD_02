let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapCount = 0;

const progressRing = document.getElementById('progress-ring');
const RING_CIRCUMFERENCE = 729; // 2π × 116

function startPause() {
  const btn = document.getElementById('startPauseBtn');

  if (running) {
    clearInterval(timer);
    running = false;
    btn.textContent = 'Resume';
    btn.classList.add('paused');
    document.body.classList.remove('running');
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    running = true;
    btn.textContent = 'Pause';
    btn.classList.remove('paused');
    document.body.classList.add('running');
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  elapsedTime = 0;
  lapCount = 0;

  const btn = document.getElementById('startPauseBtn');
  btn.textContent = 'Start';
  btn.classList.remove('paused');
  document.body.classList.remove('running');

  document.getElementById('minutes').textContent = '00';
  document.getElementById('seconds').textContent = '00';
  document.getElementById('milliseconds').textContent = '000';
  document.getElementById('lapCount').textContent = '—';
  document.querySelector('.js-lapList').innerHTML = '';

  if (progressRing) {
    progressRing.style.strokeDashoffset = RING_CIRCUMFERENCE;
  }
}

function lap() {
  if (!running) return;

  lapCount++;
  const lapTime = elapsedTime;
  const lapMinutes = pad(Math.floor(lapTime / 60000));
  const lapSeconds = pad(Math.floor((lapTime % 60000) / 1000));
  const lapMs = pad3(Math.floor(lapTime % 1000));

  const lapList = document.querySelector('.js-lapList');
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="lap-n">Lap ${String(lapCount).padStart(2, '0')}</span>
    <span class="lap-time">${lapMinutes}:${lapSeconds}<small>.${lapMs}</small></span>
  `;

  // prepend so newest is on top
  lapList.insertBefore(li, lapList.firstChild);

  document.getElementById('lapCount').textContent = lapCount;
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;

  const minutes     = pad(Math.floor(elapsedTime / 60000));
  const seconds     = pad(Math.floor((elapsedTime % 60000) / 1000));
  const milliseconds = pad3(Math.floor(elapsedTime % 1000));

  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('milliseconds').textContent = milliseconds;

  // Animate progress ring: 1 full rotation = 60 seconds
  if (progressRing) {
    const secondsTotal = (elapsedTime % 60000) / 1000;
    const progress = secondsTotal / 60;
    const offset = RING_CIRCUMFERENCE * (1 - progress);
    progressRing.style.strokeDashoffset = offset;
  }
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function pad3(num) {
  return num.toString().padStart(3, '0');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); startPause(); }
  if (e.code === 'KeyL')  lap();
  if (e.code === 'KeyR')  reset();
});
