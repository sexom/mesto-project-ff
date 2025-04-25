import '../styles/index.css';
import initialCards from './initialCards.js';

import cardData from '../components/card.js';
import logo from 'images/logo.svg';
import avatar from 'images/avatar.jpg';

import { closeModalESC, closeModal, openModal } from '../components/modal.js';

const placesList = document.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');

function popupAnimated() {
  document.querySelectorAll('.popup').forEach((i) => {
    i.classList.add('popup_is-animated');
  });
}
const deleteCard = (card) => {
  if (card) {
    card.remove();
  }
};

const likeCard = (card) => {
  if (card) {
    const likeButton = card.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active');
  }
};

function spawnCards() {
  initialCards.forEach((item) => {
    if (item) {
      placesList.append(cardData(item, deleteCard, likeCard, openCard));
    }
  });
}

function openCard(evt, cardElement) {
  if (
    cardElement &&
    !evt.target.classList.contains('card__delete-button') &&
    !evt.target.classList.contains('card__like-button')
  ) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    popupTypeImage.classList.toggle('popup_is-opened');
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupTitle = popupTypeImage.querySelector('.popup__caption');
    const elementImage = cardElement.querySelector('.card__image').src;
    const elementText = cardElement.querySelector('.card__title').textContent;
    popupImage.src = elementImage;
    popupTitle.textContent = elementText;
    document.addEventListener('keydown', closeModalESC);
  }
}

function handleFormSubmit(
  evt,
  titleOfCardOrProfile,
  descriptionOrCardImage,
  inputName,
  inputDescriptionOrUrl
) {
  evt.preventDefault();
  const formCurrentTarget = evt.currentTarget;
  const valueName = inputName.value;
  const valueOfDescrtionOrUrl = inputDescriptionOrUrl.value;
  const popupClosestForm = formCurrentTarget.closest('.popup');

  if (popupClosestForm === popupNewCard) {
    if (!valueName.trim() || !valueOfDescrtionOrUrl.trim()) {
      return 0;
    } else {
      const newObject = {
        name: valueName,
        link: valueOfDescrtionOrUrl,
      };
      initialCards.unshift(newObject);
      placesList.innerHTML = '';
      spawnCards();
    }

    formCurrentTarget.reset();
  }

  if (titleOfCardOrProfile && descriptionOrCardImage) {
    titleOfCardOrProfile.textContent = inputName.value;
    descriptionOrCardImage.textContent = inputDescriptionOrUrl.value;
  } else {
    console.error('Элементы карточки не найдены!');
  }
  popupClosestForm.classList.remove('popup_is-opened');
}

spawnCards();

popupAnimated();

document.addEventListener('click', function (evt) {
  const popup = evt.target.closest('.popup');
  const popupEditProfile = document.querySelector('.popup_type_edit');
  const popupCardImage = document.querySelector('.popup_type_image');

  // open popup edit

  // if (evt.target.classList.contains('profile__edit-button')) {
  //   openModal(popupEditProfile);
  // }

  
  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(popupEditProfile);

    const formEditProfile = document.forms['edit-profile'];

    const inputProfileName = formEditProfile.querySelector(
      '.popup__input_type_name'
    );
    const inputProfileDescription = formEditProfile.querySelector(
      '.popup__input_type_description'
    );

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    function fillFields(name, job, title, description) {
      name.value = title.textContent;
      job.value = description.textContent;
    }

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

  // open popup new card

  if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupNewCard);

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

  // close popup

  if (
    evt.target.classList.contains('popup__close') ||
    evt.target === popupEditProfile ||
    evt.target === popupNewCard ||
    evt.target === popupCardImage
  ) {
    document.removeEventListener('keydown', closeModalESC);
    closeModal(popup);
  }
});

export { openCard };
