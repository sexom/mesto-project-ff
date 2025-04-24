import handleFormSubmit from '../scripts/index.js';

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

  if (popup.classList.contains('popup_type_edit')) {
    const formEditProfile = document.forms['edit-profile'];

    const inputProfileName = formEditProfile.querySelector(
      '.popup__input_type_name'
    );
    const inputProfileDescription = formEditProfile.querySelector(
      '.popup__input_type_description'
    );

    let profileTitle = document.querySelector('.profile__title');
    let profileDescription = document.querySelector('.profile__description');

    function fillFields(name, job, title, description) {
      name.value = title.textContent;
      job.value = description.textContent;
    }

    document.addEventListener('keydown', closeModalESC);

    fillFields(
      inputProfileName,
      inputProfileDescription,
      profileTitle,
      profileDescription
    );

    formEditProfile.addEventListener('submit', function (evt) {
      handleFormSubmit(
        evt,
        profileTitle,
        profileDescription,
        inputProfileName,
        inputProfileDescription
      );
    });
  }

  if (popup.classList.contains('popup_type_new-card')) {
    document.addEventListener('keydown', closeModalESC);
    const formNewPlace = document.forms['new-place'];
    const inputNameNewPlace = formNewPlace.querySelector(
      '.popup__input_type_card-name'
    );
    const inputUrlNewPlace = formNewPlace.querySelector(
      '.popup__input_type_url'
    );
    const cardImageTemplate = document.querySelector('.card__image');
    const cardTitleTemplate = document.querySelector('.card__title');

    formNewPlace.removeEventListener('submit', handleFormSubmit);
    formNewPlace.addEventListener('submit', function (evt) {
      handleFormSubmit(
        evt,
        cardTitleTemplate,
        cardImageTemplate,
        inputNameNewPlace,
        inputUrlNewPlace
      );
    });
  }
}

// function openCard(evt, cardElement) {
//   if (
//     cardElement &&
//     !evt.target.classList.contains('card__delete-button') &&
//     !evt.target.classList.contains('card__like-button')
//   ) {
//     const popupTypeImage = document.querySelector('.popup_type_image');
//     popupTypeImage.classList.toggle('popup_is-opened');
//     let popupImage = popupTypeImage.querySelector('.popup__image');
//     let popupTitle = popupTypeImage.querySelector('.popup__caption');
//     let elementImage = cardElement.querySelector('.card__image').src;
//     let elementText = cardElement.querySelector('.card__title').textContent;
//     popupImage.src = elementImage;
//     popupTitle.textContent = elementText;
//     document.addEventListener('keydown', closeModalESC);
//   }
// }

export { closeModalESC, closeModal, openModal };
