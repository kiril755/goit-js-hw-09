import Notiflix from 'notiflix';
const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function startCreatePromises(e) {
  e.preventDefault();

  let step = Number(e.currentTarget.step.value);
  let delay = Number(e.currentTarget.delay.value);
  let amount = Number(e.currentTarget.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(succes => {
        Notiflix.Notify.success(succes);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
      });
    delay += step;
  }
}
form.addEventListener('submit', startCreatePromises);
