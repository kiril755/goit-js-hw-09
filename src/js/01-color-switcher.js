const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let changeColorInterval = null;

stopButton.setAttribute('disabled', 'true');

const startChangeColor = e => {
  changeColorInterval = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  startButton.setAttribute('disabled', 'true');
  stopButton.removeAttribute('disabled');
};

const stopChangeColor = e => {
  clearInterval(changeColorInterval);
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', 'true');
};

startButton.addEventListener('click', startChangeColor);
stopButton.addEventListener('click', stopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
