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
  likeCard,
} from "./components/api.js";

// DOM узлы
const places = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
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
const profileForm = modalEdit.querySelector(".popup__form");
const avatarForm = modalAvatar.querySelector(".popup__form");
const newPlaseForm = modalNewCard.querySelector(".popup__form");
const modalButtonAdd = document.querySelector(".profile__add-button");
const modalButtonEdit = document.querySelector(".profile__edit-button");

// Функция обработки лайка
function handleLike(likeButton, cardId, isLiked, likeCountElement) {
  likeCard(cardId, isLiked).then((updatedCard) => {
    const updatedLikes = updatedCard.likes.length;
    likeButton.classList.toggle("card__like-button_is-active", !isLiked);
    likeCountElement.textContent = updatedLikes;
  });
}

// Открытие и закрытие модального окна

// Закрытие окон по крестику и оверлею
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
function openModalEdit(
  modalEdit,
  profileTitle,
  profileDescription,
  profileName,
  descriptionInput
) {
  profileName.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
}

modalButtonEdit.addEventListener("click", () => {
  clearValidation(modalEdit, validationConfig);
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
modalButtonAdd.addEventListener("click", () => {
  openModal(modalNewCard);
  clearValidation(
    newPlaseForm,
    validationConfig,
    true
  );
});

// Модальное окно Image
function openImageModal(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(modalImage);
}

// Модальное окно Аватара
profileImage.addEventListener("click", () => {
  openModal(modalAvatar);
  clearValidation(
    avatarForm,
    validationConfig,
    true
  );
});

// Редактирование профиля
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
    })
    .catch((err) => {
      console.log("Ошибка при добавлении новой карточки:", err);
    })
    .finally(() => setButtonState(form, false, "Сохранить"));
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Добавление карточки



// Обработчик события для добавления новой карточки
function handleNewPlaceSubmit(evt) {
  evt.preventDefault();

  const placeName = newPlaseForm.elements["place-name"].value;
  const placeLink = newPlaseForm.elements["link"].value;
  const form = evt.target;
  setButtonState(form, true, "Сохранение...");

  uploadNewCard(placeName, placeLink)
    .then((cardData) => {
      places.prepend(
        createCard(
          cardData,
          deleteCard,
          handleLike,
          openImageModal,
          cardData.owner._id
        )
      );
      closeModal(modalNewCard);
      newPlaseForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка при добавлении новой карточки:", err);
    })
    .finally(() => setButtonState(form, false, "Сохранить"));
}

newPlaseForm.addEventListener("submit", handleNewPlaceSubmit);

// Вызов функции проверки валидации

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
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
      createCard(cardData, deleteCard, handleLike, openImageModal, userId)
    );
  });
}

// Обработчик отправки нового аватара
function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();

  setButtonState(evt.target, true, "Сохранение...");
  updateAvatar(modalAvatar.querySelector('input[name="link"]').value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(modalAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => setButtonState(evt.target, false, "Сохранить"));
}

avatarForm.addEventListener("submit", handleUpdateAvatarSubmit);
