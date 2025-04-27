
function closeModalESC(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalESC);
}

function openModal(popup) {
  popup.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closeModalESC);
}

function closeByOverlayClick(evt, popup) {
  if (evt.target === popup) {
    closeModal(popup);
  }
}

export { closeModalESC, closeModal, openModal, closeByOverlayClick };
