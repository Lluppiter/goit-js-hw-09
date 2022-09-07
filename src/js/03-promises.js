import Notiflix from 'notiflix';
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay }); // Fulfill
      } else {
        reject({ position: position, delay: delay }); // Reject
      }
    }, delay);
  });
}
const form = document.querySelector('form');
const amount = document.querySelector('input[name="amount"]');
const firstDelay = document.querySelector('input[name="delay"]');
const secondDelay = document.querySelector('input[name="step"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  let delay = parseInt(firstDelay.value);
  for (let index = 1; index <= amount.value; index++) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += parseInt(secondDelay.value);
  }
});
