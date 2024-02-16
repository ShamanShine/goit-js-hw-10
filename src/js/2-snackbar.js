import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  // Ожидаем полной загрузки документа перед началом манипуляций с DOM
  const form = document.querySelector('.form');
  // Добавляем слушатель события submit на форму
  form.addEventListener('submit', function (event) {
    // Предотвращаем стандартное поведение формы (отправку данных и перезагрузку страницы)
    event.preventDefault();

    // Получаем значение задержки в миллисекундах из поля ввода
    const delayValue = parseInt(
      this.querySelector('input[name="delay"]').value,
      10
    );

    // Получаем выбранный статус (fulfilled или rejected) из радиокнопок
    const stateValue = this.querySelector('input[name="state"]:checked').value;

    // Создаем новый промис
    const promise = new Promise((resolve, reject) => {
      // Имитируем асинхронную задачу с использованием setTimeout
      setTimeout(() => {
        // Вызываем resolve или reject после указанной задержки
        if (stateValue === 'fulfilled') {
          resolve(delayValue);
        } else {
          reject(delayValue);
        }
      }, delayValue);
    });

    // Обрабатываем результаты промиса
    promise.then(
      delay => {
        // Если промис выполнился успешно, выводим сообщение об успехе
        iziToast.success({
          title: 'Fulfilled promise',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topCenter',
        });
      },
      delay => {
        // Если промис был отклонен, выводим сообщение об отклонении
        iziToast.error({
          title: 'Rejected promise',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topCenter',
        });
      }
    );
  });
});
