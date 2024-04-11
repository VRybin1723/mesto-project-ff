// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const places = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData,callback) {
  const card = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  
  const img = card.querySelector('img');
  const title = card.querySelector('h2');
  const deleteButton = card.querySelector('.card__delete-button');

  img.src = cardData.link;
  img.alt = cardData.name;
  title.textContent = cardData.name;

  deleteButton.addEventListener('click', function () {
      callback(card);
  });
    
  return card;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) {
    places.append(createCard(cardData, deleteCard));
});