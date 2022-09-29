import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', event => {
  event.preventDefault();
  let amount = 0;
  let timeDelay = Number(delayRef.value);
  let step = Number(stepRef.value);
  let time = timeDelay - step;
  for (let i = 0; i < Number(amountRef.value); i += 1) {
    amount += 1;
    time += step;
    createPromise(amount, time)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        reject({ position, delay });

        // Reject
      }
    }, delay);
  });
}
