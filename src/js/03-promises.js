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
form.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { amount, delay, step },
  } = event.currentTarget;
  let firstDelay = parseInt(delay.value);
  for (let index = 1; index <= amount.value; index++) {
    createPromise(index, firstDelay)
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
    firstDelay += parseInt(step.value);
  }
});
