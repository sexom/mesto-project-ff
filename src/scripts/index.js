export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
export const plug = 'Без названия';

import placeholder from 'images/placeholder.jpg';
import '../styles/index.css';
import InitialCards from './initialCards.js';

import logo from 'images/logo.svg';
import avatar from 'images/avatar.jpg';

import { spawnCards } from '../components/card.js';
import { closeModalESC, closeModal } from '../components/modal.js';

function popupAnimated() {
  document.querySelectorAll('.popup').forEach((i) => {
    i.classList.add('popup_is-animated');
  });
}

spawnCards();

popupAnimated();

document.addEventListener('click', function (evt) {
  let popup = evt.target.closest('.popup');

  const popupEdit = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');
  const popupTypeImage = document.querySelector('.popup_type_image');

  const formEdit = document.forms['edit-profile'];
  const nameInput = formEdit.querySelector('.popup__input_type_name');
  const jobInput = formEdit.querySelector('.popup__input_type_description');

  let profileTitle = document.querySelector('.profile__title');
  let profileDescription = document.querySelector('.profile__description');

  const formNewCard = document.forms['new-place'];
  const cardNameInput = formNewCard.querySelector(
    '.popup__input_type_card-name'
  );
  const cardUrlInput = formNewCard.querySelector('.popup__input_type_url');

  const cardUrlImage = document.querySelector('.card__image');
  const cardTitle = document.querySelector('.card__title');

  function handleFormSubmit(evt, element1, element2, input1, input2) {
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
        InitialCards.unshift(newObject);
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

  // open popup edit

  if (evt.target.classList.contains('profile__edit-button')) {
    popupEdit.classList.toggle('popup_is-opened');
    fillFields(nameInput, jobInput, profileTitle, profileDescription);
    document.addEventListener('keydown', closeModalESC);
    formEdit.addEventListener('submit', function (evt) {
      handleFormSubmit(
        evt,
        profileTitle,
        profileDescription,
        nameInput,
        jobInput
      );
    });
  }

  // open popup new card

  if (evt.target.classList.contains('profile__add-button')) {
    popupNewCard.classList.toggle('popup_is-opened');
    document.addEventListener('keydown', closeModalESC);
    formNewCard.removeEventListener('submit', handleFormSubmit);
    formNewCard.addEventListener('submit', function (evt) {
      handleFormSubmit(
        evt,
        cardTitle,
        cardUrlImage,
        cardNameInput,
        cardUrlInput
      );
    });
  }

  // close popup

  if (
    evt.target.classList.contains('popup__close') ||
    evt.target === popupEdit ||
    evt.target === popupNewCard ||
    evt.target === popupTypeImage
  ) {
    document.removeEventListener('keydown', closeModalESC);
    closeModal(popup);
  }
});



function fillFields(name, job, title, description) {
  name.value = title.textContent;
  job.value = description.textContent;
}
 