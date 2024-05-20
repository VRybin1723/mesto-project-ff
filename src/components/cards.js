const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки
function createCard(cardData, callback, likeCallback, imageCallback) {
  const cardTemplate = document.querySelector("#card-template");
  const card = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);
  const img = card.querySelector("img");
  const title = card.querySelector("h2");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  img.src = cardData.link;
  img.alt = cardData.name;
  title.textContent = cardData.name;

  deleteButton.addEventListener("click", function () {
    callback(card);
  });

  likeButton.addEventListener("click", function () {
    likeCallback(likeButton);
  });

  img.addEventListener("click", function () {
    imageCallback(img);
  });

  return card;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// Функция обработки лайка
function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { initialCards, createCard, deleteCard, handleLike };
