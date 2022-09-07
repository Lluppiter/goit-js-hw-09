import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const calendar = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
startButton.setAttribute('disabled', '');

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
function addLeadingZero(day, hour, minute, second) {
  day.textContent = day.textContent.padStart(2, '0');
  hour.textContent = hour.textContent.padStart(2, '0');
  minute.textContent = minute.textContent.padStart(2, '0');
  second.textContent = second.textContent.padStart(2, '0');
}
function changeStandardTime(day, hour, minute, second) {
  day.textContent = convertMs(differenceDates).days;
  hour.textContent = convertMs(differenceDates).hours;
  minute.textContent = convertMs(differenceDates).minutes;
  second.textContent = convertMs(differenceDates).seconds;
}
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
      startButton.removeAttribute('disabled', '');
      // changeStandardTime(days, hours, minutes, seconds);
      // addLeadingZero(days, hours, minutes, seconds);
    }
  },
};
flatpickr(calendar, options);

startButton.addEventListener('click', event => {
  countdown = setInterval(() => {
    differenceDates -= 1000;
    changeStandardTime(days, hours, minutes, seconds);
    addLeadingZero(days, hours, minutes, seconds);
  }, 1000);
});
