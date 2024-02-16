import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Функция для преобразования времени из миллисекунд в дни, часы, минуты и секунды
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

// Функция для добавления ведущего нуля, если значение меньше 10
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Инициализация flatpickr для элемента с id 'datetime-picker'
const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    // Обработчик события при закрытии календаря
    const userSelectedDate = selectedDates[0];
    const startButton = document.querySelector('[data-start]');

    // Проверка, выбрана ли дата в будущем
    if (userSelectedDate < new Date()) {
      // Вывод сообщения об ошибке и блокировка кнопки "Start"
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      startButton.disabled = true;
    } else {
      // Разблокировка кнопки "Start"
      startButton.disabled = false;
    }
  },
});

// Обработчик события для кнопки "Start"
document.querySelector('[data-start]').addEventListener('click', () => {
  const userSelectedDate = datetimePicker.selectedDates[0];
  const startButton = document.querySelector('[data-start]');

  // Проверка, выбрана ли дата в будущем
  if (userSelectedDate < new Date()) {
    // Вывод сообщения об ошибке и завершение функции
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topCenter',
    });
    return;
  }

  // Блокировка кнопки "Start"
  startButton.disabled = true;

  // Установка интервала для обновления таймера каждую секунду
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    // Проверка, достигнута ли конечная дата
    if (timeDifference <= 0) {
      // Остановка интервала, обновление интерфейса и вывод сообщения об успешном завершении
      clearInterval(intervalId);
      updateTimeDisplay(convertMs(0));
      iziToast.success({
        title: 'Success',
        message: 'Countdown completed!',
        position: 'topCenter',
      });
      return;
    }

    // Обновление интерфейса таймера с оставшимся временем
    updateTimeDisplay(convertMs(timeDifference));
  }, 1000);
});

// Функция для обновления интерфейса таймера
function updateTimeDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
