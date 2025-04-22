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

function openModal(evt, cardElement) {
  if (
    cardElement &&
    !evt.target.classList.contains('card__delete-button') &&
    !evt.target.classList.contains('card__like-button')
  ) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    let popupImage = popupTypeImage.querySelector('.popup__image');
    let popupTitle = popupTypeImage.querySelector('.popup__caption');
    let elementImage = cardElement.querySelector('.card__image').src;
    let elementText = cardElement.querySelector('.card__title').textContent;
    popupTypeImage.classList.toggle('popup_is-opened');
    popupImage.src = elementImage;
    popupTitle.textContent = elementText;
    document.addEventListener('keydown', closeModalESC);
  }
}

export {
  closeModalESC as escape,
  openModal as openCard,
  closeModal as closePopup,
};
