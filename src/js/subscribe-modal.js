import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  closeModalBtn: document.querySelector('.close-subscribe-btn'),
  backdrop: document.querySelector('.subscribe-backdrop'),
  modal: document.querySelector('.subscribe-backdrop'),
  body: document.body,
  form: document.querySelector('.subscribe-modal-form'),
};

refs.closeModalBtn.addEventListener('click', closeModal);

setTimeout(() => {
  const wasModalOpened = sessionStorage.getItem('wasModalOpened');

  if (wasModalOpened) {
    return;
  }

  refs.modal.classList.remove('hidden');
  refs.body.classList.add('no-scroll');

  sessionStorage.setItem('wasModalOpened', !wasModalOpened);
}, 2000);

window.addEventListener('click', e => {
  if (e.target === refs.backdrop) {
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !refs.modal.classList.contains('hidden')) {
    closeModal();
  }
});

function closeModal() {
  refs.modal.classList.add('hidden');
  refs.body.classList.remove('no-scroll');

  refs.form.reset();
}

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const { email } = event.currentTarget.elements;

  const user = {
    email: email.value,
  };

  sendSubscription(user)
    .then(response => {
      closeModal();
      Report.success('You are subscribed now!', response.data.message, 'Okay');
    })
    .catch(error => {
      if (error.response.status === 409) {
        Notify.failure('User with such email already exist');
      } else {
        Notify.failure(error.response.data.message);
        closeModal();
      }
    });
}

function emailValidator(ev) {
  console.log(ev.currentTarget);
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (!EMAIL_REGEXP.test(ev.currentTarget.value)) {
    ev.currentTarget.style.borderColor = '#bd7a7ae5';
    return false;
  } else {
    ev.currentTarget.style.borderColor = '#acdb9de5';
    return true;
  }
}

function sendSubscription(obj) {
  return axios.post('/subscription', obj);
}
