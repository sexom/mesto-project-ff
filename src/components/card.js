import { InitialCards } from '../scripts/initialCards.js';
// import { placesList } from '../scripts/index.js';
import { openCard } from './modal.js';
import placeholder from 'images/placeholder.jpg';

import { placesList, cardTemplate, plug } from '../scripts/index.js';
// console.log('cards.js:', placesList);

// тест

// import {cardTemplate} from '../../scripts/index.js';
// import { placesList } from '../../scripts/index.js';
// import { placesList, cardTemplate } from './constants.js';

// console.log(placesList);
// console.log(cardTemplate);

// const placesList = document.querySelector('.places__list');

// export {placesList}

// const cardTemplate = document.querySelector('#card-template').content;

function createCard(InitialCard, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  if (InitialCard.link) {
    image.setAttribute('src', InitialCard.link);
    image.setAttribute('alt', InitialCard.name);
  } else {
    image.setAttribute('src', placeholder);
    image.setAttribute('alt', plug);
  }

  if (InitialCard.name) {
    title.textContent = InitialCard.name;
  } else {
    title.textContent = plug;
  }

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', function () {
    likeCard(cardElement);
  });

  cardElement.addEventListener('click', function (evt) {
    openModal(evt, cardElement);
  });

  return cardElement;
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
  InitialCards.forEach((i) => {
    if (i) {
      placesList.append(createCard(i, deleteCard, likeCard, openCard));
    }
  });
}

// spawnCards();

export { createCard, deleteCard, likeCard, spawnCards };
