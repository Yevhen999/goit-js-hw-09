const refs = {
  onBody: document.querySelector('body'),
  onBtnStart: document.querySelector('[data-start]'),
  onBtnStop: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.onBtnStop.setAttribute('disabled', false);

refs.onBtnStart.addEventListener('click', handleStart);
refs.onBtnStop.addEventListener('click', handleStop);

function handleStart(evt) {
  refs.onBtnStart.setAttribute('disabled', false);
  refs.onBtnStop.toggleAttribute('disabled');
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.onBody.style.backgroundColor = color;
  }, 1000);
}

function handleStop(evt) {
  refs.onBtnStart.toggleAttribute('disabled');
  refs.onBtnStop.toggleAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
