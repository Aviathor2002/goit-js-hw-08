import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const email = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');

const Feedback_key = 'feedback-form-state';

form.addEventListener('input', throttle(onLockalInput, 500));

let formData = JSON.parse(localStorage.getItem(Feedback_key)) || {};

onLocalStorage();

form.addEventListener('submit', onSubmitClick);

function onLockalInput(e) {
  const targetName = e.target.name;

  formData[targetName] = e.target.value;

  localStorage.setItem(Feedback_key, JSON.stringify(formData));
}

function onLocalStorage(e) {
  const currentData = JSON.parse(localStorage.getItem(Feedback_key));

  if (currentData) {
    email.value = currentData.email || '';
    message.value = currentData.message || '';
  }
}

function onSubmitClick(e) {
  e.preventDefault();

  if (email.value === '' || message.value === '') {
    return;
  }
  console.log(formData);
  // console.log({ email: email.value, message: message.value });

  e.currentTarget.reset();
  localStorage.removeItem(Feedback_key);
}
