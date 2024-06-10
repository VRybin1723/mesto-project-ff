import { openModal, closeModal, closeByEscape } from "./modal.js";
import { apiDeleteCard } from "./api.js";

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
function createCard(
  cardData,
  callback,
  likeCallback,
  imageCallback,
  userId,
  ownerIds
) {
  const cardTemplate = document.querySelector("#card-template");
  const card = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);
  const img = card.querySelector("img");
  const title = card.querySelector("h2");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeCount = card.querySelector(".card__like-count");
  const modalDelete = document.querySelector(".popup_type_delete");
  const deleteForm = modalDelete.querySelector(".popup__form");

  img.src = cardData.link;
  img.alt = cardData.name;
  title.textContent = cardData.name;
  likeCount.textContent = cardData.likes ? cardData.likes.length : 0;

  if (cardData.likes.some(element => element._id === userId)) {
    card.querySelector('.card__like-button').classList.add("card__like-button_is-active");
  }

  if (userId === cardData.owner._id) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => {
    openModal(modalDelete);
    deleteForm.onsubmit = (event) => {
      event.preventDefault();
      apiDeleteCard(cardData._id)
        .then(() => {
          callback(card);
          closeModal(modalDelete);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  });

  likeButton.addEventListener("click", function () {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    likeCallback(likeButton, cardData._id, isLiked, likeCount);
  });

  img.addEventListener("click", function () {
    imageCallback(cardData['name'], cardData['link']);
    console.log('Было')
  });

  return card;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

export { initialCards, createCard, deleteCard };
