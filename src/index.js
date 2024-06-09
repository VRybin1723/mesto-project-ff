import "./pages/index.css";
import { initialCards, createCard, deleteCard } from "./components/cards.js";
import { openModal, closeModal, closeByEscape } from "./components/modal.js";
import {
  isValid,
  showInputError,
  hideInputError,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  clearValidation,
  enableValidation,
} from "./components/validation.js";
import {
  getUser,
  getCards,
  updateUser,
  uploadNewCard,
  updateAvatar,
} from "./components/api.js";

// DOM узлы
const places = document.querySelector(".places__list");
const Modal = document.querySelector(".popup");
const modalEdit = document.querySelector(".popup_type_edit");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");
const modalAvatar = document.querySelector(".popup_type_avatar");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileName = modalEdit.querySelector(".popup__input_type_name");
const descriptionInput = modalEdit.querySelector(
  ".popup__input_type_description"
);
const popupImage = modalImage.querySelector(".popup__image");
const popupCaption = modalImage.querySelector(".popup__caption");
const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__input");
const formError = form.querySelector(`.${formInput.id}-error`);

// Функция обработки лайка
function handleLike(likeButton, cardId, isLiked, likeCountElement) {
  const method = isLiked ? "DELETE" : "PUT";
  const url = `https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${cardId}`;
  fetch(url, {
    method: method,
    headers: {
      authorization: "8026ba24-3947-401b-ab48-c209fe9bf574",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сетевая ошибка: " + response.status);
      }
      return response.json();
    })
    .then((updatedCard) => {
      const updatedLikes = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likeCountElement.textContent = updatedLikes;
    });
}

// Открытие и закрытие модального окна

// Закрытие окон по крестику и оверлею
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

// Функция для изменения состояния кнопки Сохранить
function setButtonState(form, isLoading, text) {
  const button = form.querySelector(".popup__button");
  button.textContent = text;
  button.disabled = isLoading;
}

// Модальное окно Edit
const modalButtonEdit = document.querySelector(".profile__edit-button");

function openModalEdit(
  modalEdit,
  profileTitle,
  profileDescription,
  profileName,
  descriptionInput
) {
  profileName.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formElement, validationConfig);
}

modalButtonEdit.addEventListener("click", () => {
  openModal(modalEdit);
  openModalEdit(
    modalEdit,
    profileTitle,
    profileDescription,
    profileName,
    descriptionInput
  );
});

// Модальное окно NewCard
const modalButtonAdd = document.querySelector(".profile__add-button");

modalButtonAdd.addEventListener("click", () => {
  openModal(modalNewCard);
  clearValidation(modalNewCard.querySelector(".popup__form"), validationConfig, true);
});

// Модальное окно Image
function openImageModal(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(modalImage)
}

// Модальное окно Аватара
const avatarPopup = document.querySelector(".popup_type_avatar");

profileImage.addEventListener("click", () => {
  openModal(avatarPopup);
  clearValidation(avatarPopup.querySelector(".popup__form"), validationConfig, true);
});

// Редактирование профиля
const formElement = modalEdit.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = profileName.value;
  const jobValue = descriptionInput.value;
  const form = evt.target;
  setButtonState(form, true, "Сохранение...");
  updateUser(nameValue, jobValue)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(modalEdit, closeByEscape);
      setButtonState(form, false, "Сохранить");
    })
    .catch((err) => {
      console.log("Ошибка при обновлении профиля:", err);
      setButtonState(form, false, "Сохранить"); 
    });
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// Добавление карточки
const newPlace = document.forms["new-place"];

// Обработчик события для добавления новой карточки
function handleNewPlaceSubmit(evt) {
  evt.preventDefault();

  const placeName = newPlace.elements["place-name"].value;
  const placeLink = newPlace.elements["link"].value;

  const form = evt.target;
  setButtonState(form, true, "Сохранение...");

  uploadNewCard(placeName, placeLink)
    .then((cardData) => {
      places.prepend(createCard(cardData, deleteCard, handleLike, openImageModal, cardData.owner._id));
      closeModal(modalNewCard);
      newPlace.reset();
    })
    .catch((err) => {
      console.log("Ошибка при добавлении новой карточки:", err);
    });
}

newPlace.addEventListener("submit", handleNewPlaceSubmit);

// Вызов функции проверки валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);

// Вызов Promise
Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    const ownerIds = cards.map((card) => card.owner._id);
    displayCards(cards, userData._id, ownerIds);
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;  
  })
  .catch((err) => {
    console.error("Ошибка при выполнении Promise.all:", err);
  });

// Функция отображения карточек
function displayCards(cards, userId) {
  cards.forEach(function (cardData) {
    places.append(
      createCard(
        cardData,
        deleteCard,
        handleLike,
        openImageModal,
        userId
      )
    );
  });
}

// Обработчик отправки нового аватара
function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  const newAvatarUrl = modalAvatar.querySelector('input[name="link"]').value ;
  
  const form = evt.target;
  setButtonState(form, true, "Сохранение...");
  updateAvatar(newAvatarUrl) 
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.error("Ошибка при обновлении аватара:", err);
  });
    closeModal(modalAvatar);
  } 

modalAvatar.addEventListener("submit", handleUpdateAvatarSubmit);
