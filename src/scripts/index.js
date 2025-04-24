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
    let popupImage = popupTypeImage.querySelector('.popup__image');
    let popupTitle = popupTypeImage.querySelector('.popup__caption');
    let elementImage = cardElement.querySelector('.card__image').src;
    let elementText = cardElement.querySelector('.card__title').textContent;
    popupImage.src = elementImage;
    popupTitle.textContent = elementText;
    document.addEventListener('keydown', closeModalESC);
  }
}

export default function handleFormSubmit(
  evt,
  element1,
  element2,
  input1,
  input2
) {
  evt.preventDefault();
  const form = evt.currentTarget;
  const value1 = input1.value;
  const value2 = input2.value;
  let popup = form.closest('.popup');

  if (popup === popupNewCard) {
    if (!value1.trim() || !value2.trim()) {
      return 0;
    } else {
      const newObject = {
        name: value1,
        link: value2,
      };
      initialCards.unshift(newObject);
      placesList.innerHTML = '';
      spawnCards();
    }

    form.reset();
  }

  if (element1 && element2) {
    element1.textContent = input1.value;
    element2.textContent = input2.value;
  } else {
    console.error('Элементы карточки не найдены!');
  }
  popup.classList.remove('popup_is-opened');
}

spawnCards();

popupAnimated();

document.addEventListener('click', function (evt) {
  let popup = evt.target.closest('.popup');
  const popupEditProfile = document.querySelector('.popup_type_edit');
  const popupCardImage = document.querySelector('.popup_type_image');

  // open popup edit

  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(popupEditProfile);
  }

  // open popup new card

  if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupNewCard);
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
