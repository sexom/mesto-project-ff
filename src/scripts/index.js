// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


import '../styles/index.css';
import InitialCards from './cards.js';
import placeholder from 'images/placeholder.jpg';
import logo from 'images/logo.svg';
import avatar from 'images/avatar.jpg';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


const editBtn = document.querySelector('profile__edit-button');

const popup = document.querySelectorAll('.popup');

function createCard(InitialCards, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  if (InitialCards.link) {
    image.setAttribute('src', InitialCards.link);
    image.setAttribute('alt', InitialCards.name);
  } else {
    image.setAttribute('src', placeholder);
    image.setAttribute('alt', 'Без названия');
  }

  if (InitialCards.name) {
    title.textContent = InitialCards.name;
  } else {
    title.textContent = 'Без названия';
  }

  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', function() {
    likeCard(cardElement);
  });

  cardElement.addEventListener('click', function(evt) {
    openCard(evt, cardElement);
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
}

function spawnCards () {
  InitialCards.forEach(i => {
    if (i) {
      placesList.append(createCard(i, deleteCard, likeCard, openCard));
    }
  });
}

function openCard (evt, cardElement) {
  if (cardElement && 
   !evt.target.classList.contains('card__delete-button') &&
   !evt.target.classList.contains('card__like-button'))
   {
    const popupTypeImage = document.querySelector('.popup_type_image');
    let popupImage = popupTypeImage.querySelector('.popup__image');
    let popupTitle = popupTypeImage.querySelector('.popup__caption');
    let actualImage = cardElement.querySelector('.card__image').src;
    let actualText = cardElement.querySelector('.card__title').textContent;
    popupTypeImage.classList.toggle('popup_is-opened');
    popupImage.src = actualImage;
    popupTitle.textContent = actualText;
    document.addEventListener('keydown', escape);
  }
}

spawnCards();

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escape);
}


function escape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function popupAnimated () {
  document.querySelectorAll('.popup').forEach(i => {
    i.classList.add('popup_is-animated');
  });
}

popupAnimated();



document.addEventListener('click', function(evt) {
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
  const cardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
  const cardUrlInput = formNewCard.querySelector('.popup__input_type_url');

  let cardUrlImage = document.querySelector('.card__image');
  let cardTitle = document.querySelector('.card__title');
  console.log(popup);

  function handleFormSubmit(evt, element1, element2, input1, input2) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const popup = form.closest('.popup');
    console.log(popup);

    if (popup === popupNewCard) { 
      let newObject = {
        name: input1.value,
        link: input2.value
      }
      placesList.innerHTML = '';
      console.log(newObject);
      InitialCards.unshift(newObject);
      spawnCards();
     }
    element1.textContent = input1.value;
    element2.textContent = input2.value;
    console.log(popup);
    popup.classList.remove('popup_is-opened');
  }

  // if (popups) {
  //   popups.classList.push('popup_is-animated');
  // }
  
  // open popup edit
  
  if (evt.target.classList.contains('profile__edit-button')) {
      popupEdit.classList.toggle('popup_is-opened');
      fillFields(nameInput, jobInput, profileTitle, profileDescription);
      document.addEventListener('keydown', escape);
      formEdit.addEventListener('submit', function(evt) {
        handleFormSubmit
        (
          evt,
          profileTitle,
          profileDescription,
          nameInput,
          jobInput
        )
      });
    }
  
  // open popup new card

   if (evt.target.classList.contains('profile__add-button')) {
     popupNewCard.classList.toggle('popup_is-opened');
     document.addEventListener('keydown', escape);
     formNewCard.addEventListener('submit', function(evt) {
      handleFormSubmit (
        evt,
        cardTitle,
        cardUrlImage,
        cardNameInput,
        cardUrlInput
      )
     })
   }

  // close popup
  
  if (evt.target.classList.contains('popup__close') 
    || evt.target === popupEdit
    || evt.target === popupNewCard 
    || evt.target === popupTypeImage) {
    popup.classList.toggle('popup_is-opened');

    closePopup(popup);
  }
});

 function fillFields (name, job, title, description) {
   name.value = title.textContent;
   job.value = description.textContent;
 }