import '../styles/index.css';
import initialCards from './initialCards.js';
import cardData from '../components/card.js';
import logo from 'images/logo.svg';
import avatar from 'images/avatar.jpg';
import {
  closeModal,
  openModal,
  closeByOverlayClick,
} from '../components/modal.js';

const placesList = document.querySelector('.places__list');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');

const btnAddProfile = document.querySelector('.profile__add-button');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnClosePopupNewCard = popupNewCard.querySelector('.popup__close');
const btnClosePopupEdit = popupEditProfile.querySelector('.popup__close');
const btnClosePopupTypeImage = popupTypeImage.querySelector('.popup__close');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTitle = popupTypeImage.querySelector('.popup__caption');

const formNewPlace = document.forms['new-place'];
const inputNameNewPlace = formNewPlace.querySelector(
  '.popup__input_type_card-name'
);
const inputUrlNewPlace = formNewPlace.querySelector('.popup__input_type_url');

const formEditProfile = document.forms['edit-profile'];
const inputProfileName = formEditProfile.querySelector(
  '.popup__input_type_name'
);
const inputProfileDescription = formEditProfile.querySelector(
  '.popup__input_type_description'
);

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Установка обработчиков событий на кнопки
// открытий, закрытий (крестика), оверлея.

btnAddProfile.addEventListener('click', () => {
  openModal(popupNewCard);
});

btnEditProfile.addEventListener('click', () => {
  openModal(popupEditProfile);
});

btnClosePopupEdit.addEventListener('click', () => {
  closeModal(popupEditProfile);
});

btnClosePopupNewCard.addEventListener('click', () => {
  closeModal(popupNewCard);
});

btnClosePopupTypeImage.addEventListener('click', () => {
  closeModal(popupTypeImage);
});

popupNewCard.addEventListener('click', (evt) => {
  closeByOverlayClick(evt, popupNewCard);
});

popupEditProfile.addEventListener('click', (evt) => {
  closeByOverlayClick(evt, popupEditProfile);
});

popupTypeImage.addEventListener('click', (evt) => {
  closeByOverlayClick(evt, popupTypeImage);
});

// Установка один раз для каждой формы в глобальной области видимости.

formNewPlace.addEventListener('submit', function (evt) {
  submitAddCardForm(evt, inputNameNewPlace, inputUrlNewPlace);
});

formEditProfile.addEventListener('submit', function (evt) {
  submitEditProfileForm(
    evt,
    profileTitle,
    profileDescription,
    inputProfileName,
    inputProfileDescription
  );
});

fillFields(
  inputProfileName,
  inputProfileDescription,
  profileTitle,
  profileDescription
);

function popupAnimated() {
  document.querySelectorAll('.popup').forEach((i) => {
    i.classList.add('popup_is-animated');
  });
}

function spawnCards() {
  initialCards.forEach((item) => {
    if (item) {
      placesList.append(cardData(item, openCard));
    }
  });
}

function fillFields(name, job, title, description) {
  name.value = title.textContent;
  job.value = description.textContent;
}

function openCard(evt, cardElement) {
  if (
    cardElement &&
    !evt.target.classList.contains('card__delete-button') &&
    !evt.target.classList.contains('card__like-button')
  ) {
    openModal(popupTypeImage);
    const elementImage = cardElement.querySelector('.card__image').src;
    const elementText = cardElement.querySelector('.card__title').textContent;
    popupImage.src = elementImage;
    popupImage.alt = elementText;
    popupTitle.textContent = elementText;
  }
}

function submitEditProfileForm(
  evt,
  profileName,
  profileDescription,
  inputProfileName,
  inputProfileDescription
) {
  evt.preventDefault();
  if (profileName && profileDescription) {
    profileName.textContent = inputProfileName.value;
    profileDescription.textContent = inputProfileDescription.value;
  } else {
    console.error('Элементы карточки не найдены!');
  }
  closeModal(popupEditProfile);
}

function submitAddCardForm(evt, inputNameNewPlace, inputUrlNewPlace) {
  evt.preventDefault();
  const formCurrentTarget = evt.currentTarget;
  const enteredName = inputNameNewPlace.value;
  const enteredUrlNewPlace = inputUrlNewPlace.value;
  const popupClosestForm = formCurrentTarget.closest('.popup');

  if (popupClosestForm === popupNewCard) {
    if (!enteredName.trim() || !enteredUrlNewPlace.trim()) {
      return 0;
    } else {
      const newObject = {
        name: enteredName,
        link: enteredUrlNewPlace,
      };
      // initialCards.unshift(newObject);
      placesList.innerHTML = '';
      placesList.append(cardData(newObject, openCard));
      spawnCards();
    }

    formCurrentTarget.reset();
    closeModal(popupNewCard);
  }
}

spawnCards();

popupAnimated();

export { openCard };
