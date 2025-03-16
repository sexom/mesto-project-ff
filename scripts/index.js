// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

function createCard(initialcard, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  
  for (let i = 0; i < initialcard.length; i++) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', initialcard[i].link); 
    cardElement.querySelector('.card__title').textContent = initialcard[i].name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
      deleteCard(evt);
    });
  
    placesList.append(cardElement);
  }
  
}

const deleteCard = (evt) => {
  const card = evt.target.closest('.card');
  if (card) {
    card.remove();
  }
};

createCard(initialCards, deleteCard);