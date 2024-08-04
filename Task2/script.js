let timer;
let startTime;
let elapsedTime = 0;
let running = false;

function startPause() {
  if(running){
    clearInterval(timer);
    running = false;
    document.querySelector('.startPause');
      running = false;
      document.querySelector('.startPause').innerHTML = 'Resume';      
    } else {
      startTime = Date.now() - elapsedTime;
      timer = setInterval(updateDisplay, 10);
      running = true;
      document.querySelector('.startPause').innerHTML = 'Pause';
  }
}

function reset(){
  clearInterval(timer);
  elapsedTime = 0;
  document.querySelector('.startPause').innerHTML = 'Start';
  document.querySelector('#minutes').innerText = '00';
  document.querySelector('#seconds').innerText = '00';
  document.querySelector('#milliseconds').innerText = '000';
  document.querySelector('.js-lapList').innerHTML = '';

}

function lap() {
  if(running){
    let lapTime = elapsedTime;
    let lapMinutes = pad(Math.floor(lapTime / 60000));
    let lapSeconds = pad(Math.floor((lapTime % 60000) / 1000));
    let lapMilliseconds = pad(Math.floor((lapTime % 1000)));
    
    let lapItem = document.createElement("li");
    lapItem.innerHTML = `${lapMinutes}:${lapSeconds}:${lapMilliseconds}`;
    let lapList = document.querySelector('.js-lapList');
    
    //add new laptime
    lapList.appendChild(lapItem);
  }
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  let minutes = pad(Math.floor(elapsedTime / 60000));
  let seconds = pad(Math.floor((elapsedTime % 60000) / 1000));
  let milliseconds = pad(Math.floor((elapsedTime % 1000)));

  document.querySelector('#minutes').innerText = minutes;
  document.querySelector('#seconds').innerText = seconds;
  document.querySelector('#milliseconds').innerText = milliseconds;
}

function pad(num) {
  // Helper function to add leading zeros
  return num.toString().padStart(2, "0");
}


