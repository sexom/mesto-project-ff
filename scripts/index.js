// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const placeholder = 'images/placeholder.jpg';

function createCard(initialcard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  if (initialcard.link) {
    image.setAttribute('src', initialcard.link);
    image.setAttribute('alt', initialcard.name);
  } else {
    image.setAttribute('src', placeholder);
    image.setAttribute('alt', 'Без названия');
  }

  if (initialcard.name) {
    title.textContent = initialcard.name;
  } else {
    title.textContent = 'Без названия';
  }

  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  return cardElement;
}

const deleteCard = (card) => {
  if (card) {
    card.remove();
  }
};

initialCards.forEach(i => {
  if (i) {
    placesList.append(createCard(i, deleteCard));
  }
});

