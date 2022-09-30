// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

let numberSelectedDates = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    numberSelectedDates = selectedDates[0].getTime();

    if (numberSelectedDates < Date.now()) {
      alert('Please choose a date in the future');
      startBtnRef.setAttribute('disabled', false);
    } else {
      startBtnRef.toggleAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

const startBtnRef = document.querySelector('[data-start]');
startBtnRef.setAttribute('disabled', false);
startBtnRef.addEventListener('click', handleBtn);

const timer = {
  intervalId: null,
  refs: {
    daysRefs: document.querySelector('[data-days]'),
    hoursRefs: document.querySelector('[data-hours]'),
    minutesRefs: document.querySelector('[data-minutes]'),
    secondsRefs: document.querySelector('[data-seconds]'),
  },
  start() {
    this.intervalId = setInterval(() => {
      const startTime = numberSelectedDates - Date.now();
      if (startTime < 1000) {
        clearInterval(intervalId);
      }
      const timeComponents = convertMs(startTime);
      const { days, hours, minutes, seconds } = this.refs;
      this.refs.daysRefs.textContent = addLeadingZero(timeComponents.days);
      this.refs.hoursRefs.textContent = addLeadingZero(timeComponents.hours);
      this.refs.minutesRefs.textContent = addLeadingZero(
        timeComponents.minutes
      );
      this.refs.secondsRefs.textContent = addLeadingZero(
        timeComponents.seconds
      );
      if (timeComponents < 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function handleBtn() {
  startBtnRef.setAttribute('disabled', false);
  timer.start();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
