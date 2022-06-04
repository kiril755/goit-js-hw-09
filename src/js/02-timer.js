import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('[type="text"]');
const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startButton.setAttribute('disabled', 'true');
const date = new Date();
// const dateNow = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] > date) {
      startButton.removeAttribute('disabled');
    } else {
      startButton.setAttribute('disabled', 'true');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    return selectedDates[0];
  },
};

const calendar = flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// получить значение из календаря calendar.selectedDates[0]

// const interval = setInterval(() => {
//   console.log(calendar.selectedDates[0]);
// }, 1000);

function pad(value) {
  return String(value).padStart(2, '0');
}

let interval = null;

function setTime(e) {
  interval = setInterval(() => {
    const dateNow = new Date();
    const restTime = calendar.selectedDates[0] - dateNow;
    const { days, hours, minutes, seconds } = convertMs(restTime);

    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;

    startButton.setAttribute('disabled', 'true');
    console.log(restTime);
    // console.log(calendar.selectedDates[0]);
    if (restTime < 1000) {
      clearInterval(interval);
    }
  }, 1000);
}
startButton.addEventListener('click', setTime);
// setTime();
// console.log(setTime);
