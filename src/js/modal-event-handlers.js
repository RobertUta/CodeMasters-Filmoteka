// modal-event-handlers.js
import { openModal, closeModal } from './modal.js';

export function attachModalEventHandlers() {
  const modalTriggerButtons = document.querySelectorAll('[data-modal-target]');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal');

  modalTriggerButtons.forEach(elem => {
    elem.addEventListener('click', event =>
      openModal(event.currentTarget.getAttribute('data-modal-target'))
    );
  });

  modalCloseButtons.forEach(elem => {
    elem.addEventListener('click', event => closeModal());
  });

  modals.forEach(elem => {
    elem.addEventListener('click', event => {
      if (event.currentTarget === event.target) closeModal();
    });
  });

  // Maybe also close with "Esc"...
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('.modal.modal-show')) {
      closeModal();
    }
  });
}
