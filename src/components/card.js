import placeholder from '../images/placeholder.jpg';

export default function cardData(InitialCard, openCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const plug = 'Без названия';
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
};

export { deleteCard, likeCard };
