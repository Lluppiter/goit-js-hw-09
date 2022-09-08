import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const calendar = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
startButton.setAttribute('disabled', '');
const numbers = document.querySelectorAll('.value');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(numbers) {
  for (let number of numbers) {
    number.textContent = number.textContent.padStart(2, '0');
  }
}
function changeStandardTime(differenceDates) {
  const deltaDate = convertMs(differenceDates);
  for (key in deltaDate) {
    document.querySelector(`span[data-${key}]`).textContent = deltaDate[key];
  }
}
let differenceDates;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    differenceDates = selectedDates[0] - options.defaultDate;
    if (differenceDates < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};
flatpickr(calendar, options);

let countdown;
startButton.addEventListener('click', event => {
  countdown = setInterval(() => {
    if (differenceDates <= 1000) {
      Notiflix.Notify.success('Countdown finished');
      clearInterval(countdown);
    } else {
      startButton.setAttribute('disabled', '');
      differenceDates -= 1000;
      changeStandardTime(differenceDates);
      addLeadingZero(numbers);
    }
  }, 1000);
});
