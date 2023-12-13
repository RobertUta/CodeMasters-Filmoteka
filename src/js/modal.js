document.addEventListener('DOMContentLoaded', function () {
  const modalTriggerButtons = document.querySelectorAll('[data-modal-target]');
  const modals = document.querySelectorAll('.modal');
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

  modalTriggerButtons.forEach(elem => {
    elem.addEventListener('click', event =>
      openModal(event.currentTarget.getAttribute('data-modal-target'))
    );
  });

  modalCloseButtons.forEach(elem => {
    elem.addEventListener('click', event =>
      closeModal(event.currentTarget.getAttribute('data-modal-close'))
    );
  });

  modals.forEach(elem => {
    elem.addEventListener('click', event => {
      if (event.currentTarget === event.target)
        closeModal(event.currentTarget.id);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('.modal.modal-show')) {
      closeModal(document.querySelector('.modal.modal-show').id);
    }
  });

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    modal.classList.add('modal-show');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('modal-show');
    modal.style.display = 'none';
  }
});
